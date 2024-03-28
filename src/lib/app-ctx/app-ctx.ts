import { ServiceConfiguration } from '../configuration/configuration'
import { Logger } from '../observability/logger/logger'

export type ApplicationContext = {
  logger: Logger
  config: ServiceConfiguration
}
