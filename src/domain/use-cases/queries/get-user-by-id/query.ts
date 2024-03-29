import { UserRepository } from '../../../../adapters/repositories/user'
import { UserDynamoDBRepositoryFactory } from '../../../../adapters/repositories/user/dynamodb/repository'
import { ApplicationContext } from '../../../../lib/app-ctx/app-ctx'

export class GetUserByIdQueryFactory {
  instance(ctx: ApplicationContext) {
    return new GetUserByIdQuery(ctx, {
      users: new UserDynamoDBRepositoryFactory().instance(ctx),
    })
  }
}

export type CreateUserCommandDeps = {
  users: UserRepository
}

export class GetUserByIdQuery {
  users

  constructor(ctx: ApplicationContext, deps: CreateUserCommandDeps) {
    this.users = deps.users
  }

  async execute(id: string) {
    const user = await this.users.getById(id)
    return user
  }
}
