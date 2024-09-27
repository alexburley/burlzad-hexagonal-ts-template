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
      versionId: { type: 'string', required: true },
      application: { type: 'map' },
    },
    table,
  } as const)

export type ConsultantSchemaDDB = ReturnType<typeof ConsultantSchemaFactory>
