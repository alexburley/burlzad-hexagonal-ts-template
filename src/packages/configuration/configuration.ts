export type ServiceConfiguration = {
  serviceName: string
}

export class ConfigurationFactory {
  private config?: ServiceConfiguration

  instance() {
    if (this.config) {
      return this.config
    }

    return {
      serviceName: 'development-service',
    }
  }
}
