import { ConfigurationFactory } from './factory'

export type ServiceConfiguration = {
  core: {
    serviceName: string
  }
  aws: {
    region: string
    ddb: {
      identityTableName: string
      endpoint: string
      gsi1SK_PK: string
    }
  }
}

export const config = new ConfigurationFactory({
  default: () => ({
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
  test: () => ({}),
  staging: () => ({}),
  local: () => ({}),
  prod: () => ({}),
})
