import { configure } from '@burlzad/config'

const resolvers = {
  DEFAULT: () => ({
    core: {
      serviceName: 'default-service-name',
    },
    aws: {
      region: 'eu-west-1',
      ddb: {
        identityTableName: 'default-identity-table-name',
        endpoint: 'http://localhost:4580',
        gsi1SK_PK: 'gsi1-sk-pk',
      },
    },
  }),
  local: () => ({}),
  test: () => ({}),
  preview: () => ({}),
  prod: () => ({}),
} as const

export const config = configure(resolvers)
export type ServiceConfiguration = typeof config
