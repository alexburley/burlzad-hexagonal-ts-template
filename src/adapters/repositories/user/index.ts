import { User } from '../../../domain/entities/user/user'

export type UserRepository = {
  getById(id: string): Promise<User>
  list(): Promise<{ collection: User[] }>
  delete(id: string): Promise<void>
  persist(user: User): Promise<void>
}
