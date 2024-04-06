import { UserRepository } from '../../../../adapters/repositories/user'
import { ApplicationContext } from '../../../../lib/app-ctx/app-ctx'
import { UserRepositoryFactory } from '../../../../adapters/repositories/user/factory'

export class DeleteUserCommandFactory {
  instance(ctx: ApplicationContext) {
    return new DeleteUserCommand(ctx, {
      users: new UserRepositoryFactory().instance(ctx),
    })
  }
}

export type DeleteUserCommandDeps = {
  users: UserRepository
}

export class DeleteUserCommand {
  users

  constructor(ctx: ApplicationContext, deps: DeleteUserCommandDeps) {
    this.users = deps.users
  }

  async execute(id: string) {
    const user = await this.users.getById(id)
    await this.users.persist(user.delete())
    return user
  }
}
