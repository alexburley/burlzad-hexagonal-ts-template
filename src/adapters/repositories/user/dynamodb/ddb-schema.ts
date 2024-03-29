import { DocumentClient, Entity } from 'electrodb'

export const UserSchemaFactory = (table: string, client: DocumentClient) =>
  new Entity(
    {
      model: {
        entity: 'user',
        version: '1',
        service: 'identity',
      },
      attributes: {
        id: {
          type: 'string',
          required: true,
        },
        sk: {
          type: 'string',
          default: 'USER#',
        },
        email: {
          type: 'string',
          required: true,
        },
        name: {
          type: 'string',
          required: true,
        },
        _ct: {
          type: 'string',
          required: true,
        },
        _md: {
          type: 'string',
          required: true,
        },
        _deleted: {
          type: 'string',
        },
      },
      indexes: {
        user: {
          pk: {
            field: 'PK',
            composite: ['id'],
          },
          sk: {
            field: 'SK',
            composite: ['sk'],
          },
        },
        collection: {
          index: 'gsi1-sk-pk',
          pk: {
            field: 'sk',
            composite: ['sk'],
          },
          sk: {
            field: 'id',
            composite: ['id'],
          },
        },
      },
    },
    { client, table },
  )

export type UserSchemaDDB = ReturnType<typeof UserSchemaFactory>
