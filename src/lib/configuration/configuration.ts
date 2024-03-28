export type ServiceConfiguration = {
  core: {
    serviceName: string
  }
  aws: {
    region: string
    ddb: {
      identityTableName: string
    }
  }
}

export class ConfigurationFactory {
  private config?: ServiceConfiguration

  instance(): ServiceConfiguration {
    if (this.config) {
      return this.config
    }

    return {
      core: {
        serviceName: 'default-service-name',
      },
      aws: {
        region: 'eu-west-1',
        ddb: {
          identityTableName: 'default-identity-table-name',
        },
      },
    }
  }
}
