import { User } from '../../../../../domain/entities/user/user'
import { UserRepository } from '../..'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async getById(id: string) {
    return this.users.find(user => user.id === id)!
  }

  async list() {
    return { collection: this.users }
  }

  async delete(id: string) {
    this.users = this.users.filter(user => user.id !== id)
  }

  async persist(user: User) {
    this.users.push(user)
  }
}
