import { UserRepository } from '../../../../adapters/repositories/user'
import { User } from '../../../entities/user/user'
import { Email } from '../../../values/email'
import { ApplicationContext } from '../../../../lib/app-ctx/app-ctx'
import { UserRepositoryFactory } from '../../../../adapters/repositories/user/factory'

export class CreateConsultantApplicationCommandFactory {
  instance(ctx: ApplicationContext) {
    return new CreateConsultantApplicationCommand(ctx, {
      users: new UserRepositoryFactory().instance(ctx),
    })
  }
}

export type CreateConsultantApplicationCommandDeps = {
  users: UserRepository
}

export class CreateConsultantApplicationCommand {
  users

  constructor(
    ctx: ApplicationContext,
    deps: CreateConsultantApplicationCommandDeps,
  ) {
    this.users = deps.users
  }

  async execute() {
    throw new Error('Not Implemented')
  }
}
