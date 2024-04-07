import { UserRepository } from '../../../../adapters/repositories/user'
import { ApplicationContext } from '../../../../lib/app-ctx/app-ctx'
import { UserRepositoryFactory } from '../../../../adapters/repositories/user/factory'

export class UpdateUserCommandFactory {
  instance(ctx: ApplicationContext) {
    return new UpdateUserCommand(ctx, {
      users: new UserRepositoryFactory().instance(ctx),
    })
  }
}

export type UpdateUserCommandDeps = {
  users: UserRepository
}

export class UpdateUserCommand {
  users

  constructor(ctx: ApplicationContext, deps: UpdateUserCommandDeps) {
    this.users = deps.users
  }

  async execute(id: string, input: Partial<{ name: string }>) {
    const user = await this.users.getById(id)
    await this.users.persist(user.update(input))
    return user
  }
}
