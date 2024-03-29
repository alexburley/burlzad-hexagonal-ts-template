import { UserRepository } from '..'
import { User } from '../../../../domain/entities/user/user'
import { Email } from '../../../../domain/models/email'
import { ApplicationContext } from '../../../../lib/app-ctx/app-ctx'

import { ServiceDynamoDBClient } from '../../../../lib/clients/dynamodb/dynamodb'
import { UserSchemaFactory, UserSchemaDDB } from './ddb-schema'

export class UserDynamoDBRepositoryFactory {
  instance(ctx: ApplicationContext) {
    const { identityTable } = new ServiceDynamoDBClient(ctx)
    return new UserDynamoDBRepository({
      ddbSchema: UserSchemaFactory(identityTable),
      pk_skIndex: ctx.config.aws.ddb.gsi1SK_PK,
    })
  }
}

export type UserDynamoDBRepositoryDeps = {
  ddbSchema: UserSchemaDDB
  pk_skIndex: string
}

export class UserDynamoDBRepository implements UserRepository {
  schema
  pk_skIndex

  constructor(deps: UserDynamoDBRepositoryDeps) {
    this.schema = deps.ddbSchema
    this.pk_skIndex = deps.pk_skIndex
  }

  async getById(id: string) {
    const { Item } = await this.schema.get({ id, sk: 'USER#' })

    if (!Item || Item?.deletedAt) {
      throw new Error('User not found')
    }

    return new User({
      id: Item.id,
      email: new Email(Item.email),
      name: Item.name,
      createdAt: new Date(Item.created),
      modifiedAt: new Date(Item.modified),
    })
  }

  async list() {
    const { Items = [] } = await this.schema.query({
      index: this.pk_skIndex,
      sk: 'USER#',
      filters: [{ attr: 'deletedAt', eq: undefined }],
    })

    const collection = Items.map(i => {
      return new User({
        id: i.id,
        email: new Email(i.email),
        name: i.name,
        createdAt: new Date(i.created),
        modifiedAt: new Date(i.modified),
      })
    })

    return { collection }
  }

  async delete(id: string) {
    await this.schema.update(
      {
        id,
      },
      {
        conditions: { attr: 'id', exists: true },
      },
    )
  }

  async persist(user: User) {
    await this.schema.put({
      id: user.id,
      email: user.email.value,
      name: user.name,
      created: user.createdAt.toISOString(),
      modified: user.modifiedAt.toISOString(),
    })
  }
}
