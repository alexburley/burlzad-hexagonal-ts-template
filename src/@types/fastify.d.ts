import { ApplicationContext } from '../lib/app-ctx/app-ctx'

declare module 'fastify' {
  interface FastifyInstance {
    appCtx: ApplicationContext
  }
}
