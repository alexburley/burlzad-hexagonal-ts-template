import shortUUID from 'short-uuid'
import { PaginationOptions, ConsultantRepository } from '..'
import {
  Consultant,
  ConsultantStatus,
} from '../../../../domain/entities/consultant/consultant'
import { ConsultantApplicationDTO } from '../../../../domain/entities/consultant/consultant-application'

import {
  cursorToStartKey,
  lastEvaluatedKeyToCursor,
} from '../../../../lib/clients/dynamodb/dynamodb'
import { ConsultantNotFoundError } from '../errors'
import { ConsultantSchemaDDB, DDB_CONSULTANT_SK } from './ddb-schema'
import { ConcurrencyCheckError } from '../../errors'

export type ConsultantDynamoDBRepositoryDeps = {
  ddbSchema: ConsultantSchemaDDB
  sk_pkIndex: string
}

const _ConsultantFromDynamoDB = (Item: {
  id: string
  application?: ConsultantApplicationDTO
  status: string
  versionId: string
  created: string
  modified: string
}) => {
  return new Consultant({
    id: Item.id,
    application: Item.application,
    status: Item.status as ConsultantStatus,
    versionId: Item.versionId,
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
    try {
      await this.schema.put(
        {
          id: consultant.id,
          application: consultant.application,
          status: consultant.status,
          created: consultant.createdAt.toISOString(),
          modified: consultant.modifiedAt.toISOString(),
          versionId: shortUUID.generate(),
        },
        {
          conditions: [
            {
              attr: 'versionId',
              eq: consultant.versionId,
            },
          ],
        },
      )
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((err as any).code === 'ConditionalCheckFailedException') {
        throw new ConcurrencyCheckError()
      }
      throw err
    }
  }
}
