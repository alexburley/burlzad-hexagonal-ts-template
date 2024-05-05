import { ApplicationContext } from '../../../lib/app-ctx/app-ctx'
import { ServiceDynamoDBClient } from '../../../lib/clients/dynamodb/dynamodb'
import { ConsultantSchemaFactory } from './dynamodb/ddb-schema'
import { ConsultantDynamoDBRepository } from './dynamodb/repository'

export class ConsultantRepositoryFactory {
  instance(ctx: ApplicationContext) {
    return this.dynamodb(ctx)
  }

  dynamodb(ctx: ApplicationContext) {
    const { identityTable } = new ServiceDynamoDBClient(ctx)
    return new ConsultantDynamoDBRepository({
      ddbSchema: ConsultantSchemaFactory(identityTable),
      sk_pkIndex: ctx.config.aws.ddb.gsi1SK_PK,
    })
  }
}
