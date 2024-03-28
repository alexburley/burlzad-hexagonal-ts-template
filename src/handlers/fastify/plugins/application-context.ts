import fp from 'fastify-plugin'
import { ConfigurationFactory } from '../../../lib/configuration/configuration'
import { ApplicationContext } from '../../../lib/app-ctx/app-ctx'

export const FastifyApplicationContext = fp((fastify, opts, done) => {
  const configuration = new ConfigurationFactory()
  const appCtx: ApplicationContext = {
    config: configuration.instance(),
    logger: fastify.log.child({}),
  }
  fastify.decorate('appCtx', appCtx)

  done()
})
