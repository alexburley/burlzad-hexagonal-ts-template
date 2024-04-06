import { Type as T } from '@sinclair/typebox'
import { UserTypeSchema } from '../../../../../domain/entities/user/user'
import { ServiceFastifyInstance } from '../../../api'
import { UserRepositoryFactory } from '../../../../../adapters/repositories/user/factory'

export const ListUsersRoute = async (fastify: ServiceFastifyInstance) =>
  fastify.get(
    '/v1/users',
    {
      schema: {
        querystring: T.Object({
          limit: T.Optional(T.Number()),
          cursor: T.Optional(T.String()),
        }),
        response: {
          200: {
            result: T.Array(UserTypeSchema),
            cursor: T.String(),
          },
        },
      },
    },
    async request => {
      const repository = new UserRepositoryFactory().instance(fastify.appCtx)

      const { collection: users, cursor } = await repository.list({
        limit: request.query.limit,
        cursor: request.query.cursor,
      })

      return {
        result: users.map(u => u.serialize()),
        cursor,
      }
    },
  )
