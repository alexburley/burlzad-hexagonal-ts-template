import { Type as T } from '@sinclair/typebox'
import { ServiceFastifyInstance } from '../../../../api'
import { DeleteUserCommandFactory } from '../../../../../../domain/use-cases/commands/delete-user/command'

export const DeleteUserRoute = async (fastify: ServiceFastifyInstance) =>
  fastify.delete(
    '/v1/users/:userId',
    {
      schema: {
        params: T.Object({
          userId: T.String(),
        }),
        response: {
          200: {},
        },
      },
    },
    async request => {
      const cmd = new DeleteUserCommandFactory().instance(fastify.appCtx)
      await cmd.execute(request.params.userId)
      return {}
    },
  )
