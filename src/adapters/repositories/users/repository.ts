import { User } from "domain/entities/user/user";

export type UserRepository = {
  getById(id: string): Promise<User>;
  list(): Promise<User[]>;
  delete(id: string): Promise<void>;
  persist(user: User): Promise<void>;
};

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async getById(id: string) {
    return this.users.find((user) => user.id === id)!;
  }

  async list() {
    return this.users;
  }

  async delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async persist(user: User) {
    this.users.push(user);
  }
}
