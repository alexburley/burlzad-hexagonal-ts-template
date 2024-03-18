import {
  InMemoryUserRepository,
  UserRepository,
} from "adapters/repositories/users/repository";
import { ApplicationContext } from "utils/types";

export class GetUserByIdQuery {
  users: UserRepository;
  logger;

  constructor(ctx: ApplicationContext) {
    this.logger = ctx.logger;
    this.users = new InMemoryUserRepository();
  }

  async execute(id: string) {
    this.logger.info({ id }, "Getting user by id");
    const user = await this.users.getById(id);
    this.logger.info({ user: user.serialize() }, "User found");
    return user;
  }
}
