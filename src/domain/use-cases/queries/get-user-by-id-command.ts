import {
  InMemoryUserRepository,
  UserRepository,
} from '../../../adapters/repositories/users/repository'
import { ApplicationContext } from '../../../packages/app-ctx/app-ctx'

export class GetUserByIdQueryFactory {
  instance(ctx: ApplicationContext) {
    return new GetUserByIdQuery(ctx, { users: new InMemoryUserRepository() })
  }
}

export type CreateUserCommandDeps = {
  users: UserRepository
}

export class GetUserByIdQuery {
  users
  logger

  constructor(ctx: ApplicationContext, deps: CreateUserCommandDeps) {
    this.logger = ctx.logger
    this.users = deps.users
  }

  async execute(id: string) {
    this.logger.info({ id }, 'Getting user by id')
    const user = await this.users.getById(id)
    this.logger.info({ user: user.serialize() }, 'User found')
    return user
  }
}
