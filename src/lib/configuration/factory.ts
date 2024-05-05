import merge from 'lodash.merge'
import { ServiceConfiguration } from './configuration'
import { DeepPartial, DeepReadonly as DeepReadOnly } from '../types'
import { flattenObject } from '../collections'

type EnvVars = Record<string, string | undefined>

export type EnvironmentResolvers = {
  default: (source: EnvVars) => ServiceConfiguration
  local: (source: EnvVars) => DeepPartial<ServiceConfiguration>
  test: (source: EnvVars) => DeepPartial<ServiceConfiguration>
  preview: (source: EnvVars) => DeepPartial<ServiceConfiguration>
  prod: (source: EnvVars) => DeepPartial<ServiceConfiguration>
}

export class ConfigurationFactory {
  private config: ServiceConfiguration | null = null
  private resolvers: EnvironmentResolvers

  constructor(resolvers: EnvironmentResolvers) {
    this.resolvers = resolvers
  }

  instance(): ServiceConfiguration {
    if (this.config) {
      return this.config
    }

    const resolver = this._getResolver()
    const defaults = this.resolvers.default(process.env)
    const configuration = merge(defaults, resolver(process.env))
    this.validateConfig(configuration)
    this.config = Object.freeze(configuration)
    return this.config
  }

  private validateConfig(configuration: DeepReadOnly<ServiceConfiguration>) {
    const flatConfig = flattenObject(configuration)
    let missingValues = ''
    Object.keys(flatConfig).forEach(key => {
      if (flatConfig[key] === undefined) {
        const str = missingValues ? `, ${key}` : key
        missingValues += str
      }
    })

    if (missingValues) {
      throw new Error(`Configuration is missing values: ${missingValues}`)
    }
  }

  private _getResolver() {
    const resolver =
      this.resolvers[process.env.NODE_ENV as keyof EnvironmentResolvers]
    if (!resolver) {
      throw new Error(
        `No resolver found for the current environment: ${process.env.NODE_ENV}`,
      )
    }

    return resolver
  }
}
