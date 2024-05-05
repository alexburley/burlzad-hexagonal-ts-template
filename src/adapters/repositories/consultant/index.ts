import { Consultant } from '../../../domain/entities/consultant/consultant'

export type PaginationOptions = {
  limit?: number
  cursor?: string
}

export type ConsultantRepository = {
  getById(id: string): Promise<Consultant>
  list(): Promise<{ collection: Consultant[]; cursor?: string }>
  persist(Consultant: Consultant): Promise<void>
}
