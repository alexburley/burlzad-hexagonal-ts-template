import { Type as T } from '@sinclair/typebox'
import { UserTypeSchema } from '../../../../../../domain/entities/user/user'
import { ServiceFastifyInstance } from '../../../../api'
import { UserRepositoryFactory } from '../../../../../../adapters/repositories/user/factory'

export const GetUserRoute = async (fastify: ServiceFastifyInstance) =>
  fastify.get(
    '/v1/users/:userId',
    {
      schema: {
        params: T.Object({
          userId: T.String(),
        }),
        response: {
          200: {
            result: UserTypeSchema,
          },
        },
      },
    },
    async request => {
      const repository = new UserRepositoryFactory().instance(fastify.appCtx)
      const user = await repository.getById(request.params.userId)

      return {
        result: user.serialize(),
      }
    },
  )
