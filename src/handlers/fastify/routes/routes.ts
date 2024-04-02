import { ServiceFastifyInstance } from '../api'
import { CreateUserRoute } from './v1/users/post'
import { GetUserRoute } from './v1/users/{userId}/get'

export const Routes = async (fastify: ServiceFastifyInstance) =>
  fastify.register(GetUserRoute).register(CreateUserRoute)
