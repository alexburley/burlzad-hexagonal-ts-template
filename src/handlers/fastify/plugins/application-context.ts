import fp from 'fastify-plugin'
import { ConfigurationFactory } from 'packages/configuration/configuration'
import { ApplicationContext } from 'packages/app-ctx/app-ctx'

export const FastifyApplicationContext = fp((fastify, opts, done) => {
  const configuration = new ConfigurationFactory()
  const appCtx: ApplicationContext = {
    config: configuration.instance(),
    logger: fastify.log.child({}),
  }
  fastify.decorate('appCtx', appCtx)

  done()
})
