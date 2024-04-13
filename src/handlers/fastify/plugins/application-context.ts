import fp from 'fastify-plugin'
import { ApplicationContext } from '../../../lib/app-ctx/app-ctx'
import { config } from '../../../lib/configuration/configuration'

export const FastifyApplicationContext = fp((fastify, opts, done) => {
  const appCtx: ApplicationContext = {
    config: config.instance(),
    logger: fastify.log.child({}),
  }
  fastify.decorate('appCtx', appCtx)

  done()
})
