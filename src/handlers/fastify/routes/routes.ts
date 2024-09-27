import { ServiceFastifyInstance } from '../api'
import { CreateConsultantApplicationRoute } from './v1/consultants/applications/put'
import { ListUsersRoute } from './v1/users/list'
import { CreateUserRoute } from './v1/users/post'
import { DeleteUserRoute } from './v1/users/{userId}/delete'
import { GetUserRoute } from './v1/users/{userId}/get'
import { UpdateUserRoute } from './v1/users/{userId}/patch'

export const Routes = async (fastify: ServiceFastifyInstance) =>
  fastify
    .register(GetUserRoute)
    .register(CreateUserRoute)
    .register(ListUsersRoute)
    .register(DeleteUserRoute)
    .register(UpdateUserRoute)
    .register(CreateConsultantApplicationRoute)
