import { Type as T } from '@sinclair/typebox'
import { UserTypeSchema } from 'domain/entities/user/user'
import { Email } from 'domain/models/email'
import { CreateUserCommandFactory } from 'domain/use-cases/commands/create-user-command'
import { ServiceFastifyInstance } from 'handlers/fastify/server'

export const CreateUserRoute = (fastify: ServiceFastifyInstance) => {
  fastify.post(
    '/v1/users',
    {
      schema: {
        body: T.Object({
          name: T.String(),
          email: T.String({ format: 'email' }),
        }),
        response: {
          200: {
            result: UserTypeSchema,
          },
        },
      },
    },
    async request => {
      const command = new CreateUserCommandFactory().instance(fastify.appCtx)
      const user = await command.execute({
        name: request.body.name,
        email: new Email(request.body.email),
      })

      return {
        statusCode: 200,
        body: {
          result: user.serialize(),
        },
      }
    },
  )
}
