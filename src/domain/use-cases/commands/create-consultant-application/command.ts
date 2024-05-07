import { ApplicationContext } from '../../../../lib/app-ctx/app-ctx'
import { ConsultantApplication } from '../../../entities/consultant/consultant-application'
import { Consultant } from '../../../entities/consultant/consultant'
import { ConsultantRepository } from '../../../../adapters/repositories/consultant'
import { ConsultantRepositoryFactory } from '../../../../adapters/repositories/consultant/factory'

export class CreateConsultantApplicationCommandFactory {
  instance(ctx: ApplicationContext) {
    return new CreateConsultantApplicationCommand({
      consultants: new ConsultantRepositoryFactory().instance(ctx),
    })
  }
}

export type CreateConsultantApplicationCommandDeps = {
  consultants: ConsultantRepository
}

export class CreateConsultantApplicationCommand {
  consultants

  constructor(deps: CreateConsultantApplicationCommandDeps) {
    this.consultants = deps.consultants
  }

  async execute(application: ConsultantApplication) {
    const consultant = Consultant.fromApplication(application)
    await this.consultants.persist(consultant)
    return consultant
  }
}
