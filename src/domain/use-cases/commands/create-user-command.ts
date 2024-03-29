import { UserRepository } from '../../../adapters/repositories/user'
import { InMemoryUserRepository } from '../../../adapters/repositories/user/test/in-memory/repository'
import { User } from '../../../domain/entities/user/user'
import { Email } from '../../../domain/models/email'
import { ApplicationContext } from '../../../lib/app-ctx/app-ctx'

export class CreateUserCommandFactory {
  instance(ctx: ApplicationContext) {
    return new CreateUserCommand(ctx, { users: new InMemoryUserRepository() })
  }
}

export type CreateUserCommandDeps = {
  users: UserRepository
}

export class CreateUserCommand {
  users: UserRepository
  logger

  constructor(ctx: ApplicationContext, deps: CreateUserCommandDeps) {
    this.logger = ctx.logger
    this.users = deps.users
  }

  async execute(input: { name: string; email: Email }) {
    this.logger.info({ input }, 'Creating user')

    const user = new User({ name: input.name, email: input.email })
    await this.users.persist(user)

    this.logger.info({ user: user.serialize() }, 'User created')
    return user
  }
}
