import { User } from '../../../domain/entities/user/user'

export type PaginationOptions = {
  limit?: number
  cursor?: string
}

export type UserRepository = {
  getById(id: string): Promise<User>
  list(): Promise<{ collection: User[]; cursor?: string }>
  persist(user: User): Promise<void>
}
