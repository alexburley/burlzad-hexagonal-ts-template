import { Type as T } from '@sinclair/typebox'
import { UserTypeSchema } from '../../../../../../domain/entities/user/user'
import { GetUserByIdQueryFactory } from '../../../../../../domain/use-cases/queries/get-user-by-id/query'
import { ServiceFastifyInstance } from '../../../../api'

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
      const query = new GetUserByIdQueryFactory().instance(fastify.appCtx)
      const user = await query.execute(request.params.userId)

      return {
        result: user.serialize(),
      }
    },
  )
