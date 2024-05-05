import { PaginationOptions, ConsultantRepository } from '..'
import {
  Consultant,
  ConsultantStatus,
} from '../../../../domain/entities/consultant/consultant'
import { Email } from '../../../../domain/values/email'

import {
  cursorToStartKey,
  lastEvaluatedKeyToCursor,
} from '../../../../lib/clients/dynamodb/dynamodb'
import { ConsultantNotFoundError } from '../errors'
import { ConsultantSchemaDDB, DDB_CONSULTANT_SK } from './ddb-schema'

export type ConsultantDynamoDBRepositoryDeps = {
  ddbSchema: ConsultantSchemaDDB
  sk_pkIndex: string
}

const _ConsultantFromDynamoDB = (Item: {
  id: string
  application?: {
    name: string
    email: string
  }
  linkedInUrl?: string
  occupation: string
  status: string
  created: string
  modified: string
}) => {
  return new Consultant({
    id: Item.id,
    application: Item.application
      ? {
          email: new Email(Item.application.email),
          name: Item.application.name,
        }
      : undefined,
    occupation: Item.occupation,
    status: Item.status as ConsultantStatus,
    linkedInUrl: Item.linkedInUrl,
    createdAt: new Date(Item.created),
    modifiedAt: new Date(Item.modified),
  })
}

export class ConsultantDynamoDBRepository implements ConsultantRepository {
  schema
  pk_skIndex

  constructor(deps: ConsultantDynamoDBRepositoryDeps) {
    this.schema = deps.ddbSchema
    this.pk_skIndex = deps.sk_pkIndex
  }

  async getById(id: string) {
    const { Item } = await this.schema.get({ id, sk: DDB_CONSULTANT_SK })

    if (!Item) {
      throw new ConsultantNotFoundError(id)
    }

    return _ConsultantFromDynamoDB(Item)
  }

  async list(opts: PaginationOptions = {}) {
    const { limit = 10, cursor: nextToken } = opts
    const { Items = [], LastEvaluatedKey } = await this.schema.query(
      DDB_CONSULTANT_SK,
      {
        index: this.pk_skIndex,
        startKey: cursorToStartKey(nextToken),
        limit,
      },
    )

    const collection = Items.map(_ConsultantFromDynamoDB)

    return { collection, cursor: lastEvaluatedKeyToCursor(LastEvaluatedKey) }
  }

  async persist(consultant: Consultant) {
    const application = consultant.application
      ? {
          application: {
            name: consultant.application.name,
            email: consultant.application.email.value,
          },
        }
      : {}

    await this.schema.put({
      id: consultant.id,
      occupation: consultant.occupation,
      linkedInUrl: consultant.linkedInUrl,
      ...application,
      status: consultant.status,
      created: consultant.createdAt.toISOString(),
      modified: consultant.modifiedAt.toISOString(),
    })
  }
}
