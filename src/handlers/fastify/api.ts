import fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { FastifyApplicationContext } from './plugins/application-context'
import { Routes } from './routes/routes'

export type ServiceFastifyInstance = ReturnType<
  typeof BaseFastifyInstanceFactory
>

export const BaseFastifyInstanceFactory = () => {
  return fastify().withTypeProvider<TypeBoxTypeProvider>()
}

export const APIFactory = () => {
  const app = BaseFastifyInstanceFactory()
    .register(FastifyApplicationContext)
    .register(Routes)

  return app
}
