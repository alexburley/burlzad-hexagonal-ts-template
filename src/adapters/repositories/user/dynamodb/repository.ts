import { PaginationOptions, UserRepository } from '..'
import { User } from '../../../../domain/entities/user/user'
import { Email } from '../../../../domain/models/email'
import { ApplicationContext } from '../../../../lib/app-ctx/app-ctx'

import {
  ServiceDynamoDBClient,
  cursorToStartKey,
  lastEvaluatedKeyToCursor,
} from '../../../../lib/clients/dynamodb/dynamodb'
import { UserNotFoundError } from '../errors'
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

class UserDynamoDBRepository implements UserRepository {
  schema
  pk_skIndex

  constructor(deps: UserDynamoDBRepositoryDeps) {
    this.schema = deps.ddbSchema
    this.pk_skIndex = deps.pk_skIndex
  }

  async getById(id: string) {
    const { Item } = await this.schema.get({ id, sk: 'USER#' })

    if (!Item || Item.deletedAt) {
      throw new UserNotFoundError(id)
    }

    return new User({
      id: Item.id,
      email: new Email(Item.email),
      name: Item.name,
      createdAt: new Date(Item.created),
      modifiedAt: new Date(Item.modified),
    })
  }

  async list(opts: PaginationOptions = {}) {
    const { limit = 10, cursor: nextToken } = opts
    const { Items = [], LastEvaluatedKey } = await this.schema.query('USER#', {
      index: this.pk_skIndex,
      filters: [{ attr: 'deletedAt', exists: false }],
      startKey: cursorToStartKey(nextToken),
      limit,
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

    return { collection, cursor: lastEvaluatedKeyToCursor(LastEvaluatedKey) }
  }

  async delete(id: string) {
    await this.schema.update(
      {
        id,
        deletedAt: new Date().toISOString(),
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
