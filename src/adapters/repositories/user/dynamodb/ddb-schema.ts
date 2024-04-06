import { Entity } from 'dynamodb-toolbox'
import { ServiceTable } from '../../../../lib/clients/dynamodb/dynamodb'

export const UserSchemaFactory = (table: ServiceTable) =>
  new Entity({
    name: 'UserV0',
    attributes: {
      id: { partitionKey: true },
      sk: { default: 'USER#', hidden: true, sortKey: true },
      email: { type: 'string', required: true },
      name: { type: 'string', required: true },
      status: { type: 'string', required: true },
      deletedAt: { type: 'string' },
    },
    table,
  } as const)

export type UserSchemaDDB = ReturnType<typeof UserSchemaFactory>
