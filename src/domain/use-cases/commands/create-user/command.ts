import { UserRepository } from '../../../../adapters/repositories/user'
import { User } from '../../../entities/user/user'
import { Email } from '../../../values/email'
import { ApplicationContext } from '../../../../lib/app-ctx/app-ctx'
import { UserRepositoryFactory } from '../../../../adapters/repositories/user/factory'

export class CreateUserCommandFactory {
  instance(ctx: ApplicationContext) {
    return new CreateUserCommand(ctx, {
      users: new UserRepositoryFactory().instance(ctx),
    })
  }
}

export type CreateUserCommandDeps = {
  users: UserRepository
}

export class CreateUserCommand {
  users

  constructor(ctx: ApplicationContext, deps: CreateUserCommandDeps) {
    this.users = deps.users
  }

  async execute(input: { name: string; email: Email }) {
    const user = new User({ name: input.name, email: input.email })
    await this.users.persist(user)
    return user
  }
}
