import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { Table } from 'dynamodb-toolbox'
import { ApplicationContext } from '../../app-ctx/app-ctx'

export type ServiceTable = Table<string, 'PK', 'SK'>

export const lastEvaluatedKeyToCursor = (
  lastEvaluatedKey?: Record<string, string>,
) =>
  lastEvaluatedKey
    ? Buffer.from(JSON.stringify(lastEvaluatedKey), 'utf8').toString('base64')
    : undefined

export const cursorToStartKey = (cursor?: string) =>
  cursor
    ? JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'))
    : undefined

/**
 * A lightweight adapter for centralising dynamodb client and configuration.
 * This should rarely be used outside the healthcheck and we should instead be
 * using the repository patterns to work with our data.
 */
export class ServiceDynamoDBClient {
  identityTable: ServiceTable
  documentClient: DynamoDB

  constructor(appCtx: ApplicationContext) {
    this.documentClient = new DynamoDB({
      region: appCtx.config.aws.region,
      endpoint: appCtx.config.aws.ddb.endpoint,
    })
    this.identityTable = new Table({
      name: appCtx.config.aws.ddb.identityTableName,
      partitionKey: 'PK',
      sortKey: 'SK',
      DocumentClient: this.documentClient,
      indexes: {
        [appCtx.config.aws.ddb.gsi1SK_PK]: {
          partitionKey: 'SK',
          sortKey: 'PK',
        },
      },
    })
  }
}
