import { Type as T } from '@sinclair/typebox'
import { ServiceFastifyInstance } from '../../../../api'
import { UpdateUserCommandFactory } from '../../../../../../domain/use-cases/commands/update-user/command'
import { UserTypeSchema } from '../../../../../../domain/entities/user/user'

export const UpdateUserRoute = async (fastify: ServiceFastifyInstance) =>
  fastify.patch(
    '/v1/users/:userId',
    {
      schema: {
        params: T.Object({
          userId: T.String(),
        }),
        body: T.Object({
          name: T.String(),
        }),
        response: {
          200: {
            result: UserTypeSchema,
          },
        },
      },
    },
    async request => {
      const cmd = new UpdateUserCommandFactory().instance(fastify.appCtx)
      const user = await cmd.execute(request.params.userId, request.body)
      return {
        result: user.serialize(),
      }
    },
  )
