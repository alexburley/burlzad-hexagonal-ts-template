import { Entity } from 'dynamodb-toolbox'
import { ServiceTable } from '../../../../lib/clients/dynamodb/dynamodb'

export const DDB_CONSULTANT_SK = 'CONSULTANT#'

export const ConsultantSchemaFactory = (table: ServiceTable) =>
  new Entity({
    name: 'ConsultantV0',
    attributes: {
      id: { partitionKey: true },
      sk: { default: 'CONSULTANT#', hidden: true, sortKey: true },
      status: { type: 'string', required: true },
      occupation: { type: 'string', required: true },
      linkedInUrl: { type: 'string' },
      application: { type: 'map' },
    },
    table,
  } as const)

export type ConsultantSchemaDDB = ReturnType<typeof ConsultantSchemaFactory>
