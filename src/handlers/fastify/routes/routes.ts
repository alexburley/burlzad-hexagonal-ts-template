import { ServiceFastifyInstance } from '../api'
import { ListUsersRoute } from './v1/users/list'
import { CreateUserRoute } from './v1/users/post'
import { GetUserRoute } from './v1/users/{userId}/get'

export const Routes = async (fastify: ServiceFastifyInstance) =>
  fastify
    .register(GetUserRoute)
    .register(CreateUserRoute)
    .register(ListUsersRoute)
