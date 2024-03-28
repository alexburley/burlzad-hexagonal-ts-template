import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { UserRepository } from '..'
import { User } from '../../../../domain/entities/user/user'
import { Email } from '../../../../domain/models/email'
import { ApplicationContext } from '../../../../lib/app-ctx/app-ctx'

import { UserSchemaDDB, UserSchemaFactory } from './ddb-schema'

export class UserDynamoDBRepositoryFactory {
  instance(ctx: ApplicationContext) {
    return new UserDynamoDBRepository({
      ddbSchema: UserSchemaFactory(
        ctx.config.aws.ddb.identityTableName,
        new DynamoDB({ region: ctx.config.aws.region }),
      ),
    })
  }
}

export type UserDynamoDBRepositoryDeps = {
  ddbSchema: UserSchemaDDB
}

export class UserDynamoDBRepository implements UserRepository {
  schema

  constructor(deps: UserDynamoDBRepositoryDeps) {
    this.schema = deps.ddbSchema
  }

  async getById(id: string) {
    const { data } = await this.schema
      .get({ id, sk: 'USER#' })
      .where(({ _deleted }, { exists }) => `${exists(_deleted)}}`)
      .go()

    if (!data) {
      throw new Error('User not found')
    }

    return new User({
      id: data.id,
      email: new Email(data.email),
      name: data.name,
      createdAt: new Date(data._ct),
      modifiedAt: new Date(data._md),
    })
  }

  async list() {
    const { data } = await this.schema.query.collection({ sk: 'USER#' }).go()
    const collection = data.map(record => {
      return new User({
        id: record.id,
        email: new Email(record.email),
        name: record.name,
        createdAt: new Date(record._ct),
        modifiedAt: new Date(record._md),
      })
    })
    return { collection }
  }

  async delete(id: string) {
    await this.schema
      .patch({
        id,
        sk: 'USER#',
      })
      .add({
        _deleted: new Date().toISOString(),
      })
      .go()
  }

  async persist(user: User) {
    await this.schema
      .upsert({
        id: user.id,
        email: user.email.value,
        name: user.name,
        _ct: user.createdAt.toISOString(),
        _md: user.modifiedAt.toISOString(),
      })
      .go()
  }
}
