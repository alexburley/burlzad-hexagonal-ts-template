import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { GenericContainer, StartedTestContainer } from 'testcontainers'
import { ApplicationContext } from '../lib/app-ctx/app-ctx'
import { wait } from '../lib/promises/promises'
import { ConfigurationFactory } from '../lib/configuration/configuration'
import pino from 'pino'

/**
 * This is intended to be called from test files
 * @returns An {@link IntegrationEnvironmentContext} containing config and observability tools
 */
export const TestAppCtx = (): ApplicationContext => {
  const config = new ConfigurationFactory().instance()

  return {
    config,
    logger: pino(),
  }
}

/**
 * This class is responsible for spinning up the necessary resources to run
 * integration tests
 */
class TestEnvironmentManager {
  /** Testcontainer */
  private localstack: StartedTestContainer | null = null

  /**
   * Spins up a testcontainers docker environment and provisions it
   * with the necessary resources to run the integration tests. It also will start
   * any mock servers that we need to simulate external services.
   *
   * This is intended to be called from the jest globalSetup script
   * @see https://jestjs.io/docs/en/configuration#globalsetup-string
   *
   */
  async provisionDynamoDB() {
    this.localstack = await this._startLocalStack()
    await this._provisionDynamoDB(TestAppCtx())
  }

  /**
   * Shuts down any mock servers and the docker environment
   *
   * This is intended to be called from the jest globalTeardown script
   * @see https://jestjs.io/docs/en/configuration#globalteardown-string
   *
   */
  async down() {
    if (this.localstack) await this.localstack.stop({ timeout: 3000 })
  }

  private async _startLocalStack(): Promise<StartedTestContainer> {
    console.info('Starting docker...')

    try {
      const container = await new GenericContainer('localstack/localstack')
        .withName('localstack-test-1')
        .withCommand(['sleep', 'infinity'])
        .withExposedPorts({
          container: 4566,
          host: 4580,
        })
        .withEnvironment({
          DEBUG: '1',
        })
        .withReuse()
        .start()

      return container
    } catch (err) {
      console.error('Error starting docker container', err)
      throw err
    }
  }

  private async _provisionDynamoDB(appCtx: ApplicationContext): Promise<void> {
    const dynamo = new DynamoDB({
      region: appCtx.config.aws.region,
      endpoint: appCtx.config.aws.ddb.endpoint,
    })

    const tableName = appCtx.config.aws.ddb.identityTableName
    console.info(`Creating dynamodb table: ${tableName}...`)

    await dynamo.createTable({
      TableName: tableName,
      AttributeDefinitions: [
        {
          AttributeName: 'PK',
          AttributeType: 'S',
        },
        {
          AttributeName: 'SK',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        { AttributeName: 'PK', KeyType: 'HASH' },
        {
          AttributeName: 'SK',
          KeyType: 'RANGE',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    })

    const gsi1 = appCtx.config.aws.ddb.gsi1SK_PK

    console.info(`Updating dynamodb index: ${gsi1}...`)
    await dynamo.updateTable({
      TableName: tableName,
      AttributeDefinitions: [
        {
          AttributeName: 'SK',
          AttributeType: 'S',
        },
        {
          AttributeName: 'PK',
          AttributeType: 'S',
        },
      ],
      GlobalSecondaryIndexUpdates: [
        {
          Create: {
            IndexName: appCtx.config.aws.ddb.gsi1SK_PK,
            KeySchema: [
              {
                AttributeName: 'SK',
                KeyType: 'HASH',
              },
              {
                AttributeName: 'PK',
                KeyType: 'RANGE',
              },
            ],
            Projection: { ProjectionType: 'ALL' },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5,
            },
          },
        },
      ],
    })
    // Wait for index to be updated
    await wait(500)
  }
}

let manager: TestEnvironmentManager

export const TestEnvironment = () => {
  if (!manager) manager = new TestEnvironmentManager()
  return manager
}
