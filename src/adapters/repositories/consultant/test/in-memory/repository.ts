import { ConsultantRepository } from '../..'
import { Consultant } from '../../../../../domain/entities/consultant/consultant'

export class InMemoryConsultantRepository implements ConsultantRepository {
  private Consultants: Consultant[] = []

  async getById(id: string) {
    return this.Consultants.find(Consultant => Consultant.id === id)!
  }

  async list() {
    return { collection: this.Consultants }
  }

  async delete(id: string) {
    this.Consultants = this.Consultants.filter(
      Consultant => Consultant.id !== id,
    )
  }

  async persist(Consultant: Consultant) {
    this.Consultants.push(Consultant)
  }
}
