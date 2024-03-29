import fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { GetUserRoute } from './routes/v1/users/{userId}/get'
import { CreateUserRoute } from './routes/v1/users/post'
import { FastifyApplicationContext } from './plugins/application-context'

export type ServiceFastifyInstance = ReturnType<
  typeof BaseFastifyInstanceFactory
>

export const BaseFastifyInstanceFactory = () => {
  return fastify().withTypeProvider<TypeBoxTypeProvider>()
}

export const APIFactory = () => {
  const app = BaseFastifyInstanceFactory()
    .register(FastifyApplicationContext)
    .register(GetUserRoute)
    .register(CreateUserRoute)

  return app
}
