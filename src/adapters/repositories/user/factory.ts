import { ApplicationContext } from '../../../lib/app-ctx/app-ctx'
import { ServiceDynamoDBClient } from '../../../lib/clients/dynamodb/dynamodb'
import { UserSchemaFactory } from './dynamodb/ddb-schema'
import { UserDynamoDBRepository } from './dynamodb/repository'

export class UserRepositoryFactory {
  instance(ctx: ApplicationContext) {
    return this.dynamodb(ctx)
  }

  dynamodb(ctx: ApplicationContext) {
    const { identityTable } = new ServiceDynamoDBClient(ctx)
    return new UserDynamoDBRepository({
      ddbSchema: UserSchemaFactory(identityTable),
      pk_skIndex: ctx.config.aws.ddb.gsi1SK_PK,
    })
  }
}
