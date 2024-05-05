export class ConsultantNotFoundError extends Error {
  constructor(id: string) {
    super(`Consultant with id: ${id} not found`)
    this.name = ConsultantNotFoundError.name
  }
}
