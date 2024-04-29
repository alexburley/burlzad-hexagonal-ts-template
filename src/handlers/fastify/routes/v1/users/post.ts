import { Type as T } from '@sinclair/typebox'
import {
  UserDTO,
  UserTypeSchema,
} from '../../../../../domain/entities/user/user'
import { Email } from '../../../../../domain/values/email'
import { CreateUserCommandFactory } from '../../../../../domain/use-cases/commands/create-user/command'
import { ServiceFastifyInstance } from '../../../api'

export type CreateUserResponse = {
  result: UserDTO
}

export const CreateUserRoute = async (fastify: ServiceFastifyInstance) =>
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
    async (request): Promise<CreateUserResponse> => {
      const command = new CreateUserCommandFactory().instance(fastify.appCtx)
      const user = await command.execute({
        name: request.body.name,
        email: new Email(request.body.email),
      })

      return {
        result: user.serialize(),
      }
    },
  )
