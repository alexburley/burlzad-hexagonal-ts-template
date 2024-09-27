import { ApplicationContext } from '../../../../lib/app-ctx/app-ctx'
import { ConsultantApplication } from '../../../entities/consultant/consultant-application'
import { Consultant } from '../../../entities/consultant/consultant'
import { ConsultantRepository } from '../../../../adapters/repositories/consultant'
import { ConsultantRepositoryFactory } from '../../../../adapters/repositories/consultant/factory'
import { EmailClientAdapter } from '../../../../adapters/email-client'
import { EmailClientFactory } from '../../../../adapters/email-client/factory'
import { RetryConcurrencyConflict } from '../../../../adapters/repositories/errors'

export class CreateConsultantApplicationCommandFactory {
  instance(ctx: ApplicationContext) {
    return new CreateConsultantApplicationCommand({
      consultants: new ConsultantRepositoryFactory().instance(ctx),
      emails: new EmailClientFactory().instance(ctx),
    })
  }
}

export type CreateConsultantApplicationCommandDeps = {
  consultants: ConsultantRepository
  emails: EmailClientAdapter
}

export class CreateConsultantApplicationCommand {
  consultants
  emails

  constructor(deps: CreateConsultantApplicationCommandDeps) {
    this.consultants = deps.consultants
    this.emails = deps.emails
  }

  @RetryConcurrencyConflict
  async execute(application: ConsultantApplication) {
    const { collection: consultants } = await this.consultants.list()

    if (
      consultants.find(c => c.application?.email === application.email.value)
    ) {
      throw new Error('Application already exists')
    }

    const consultant = Consultant.fromApplication(application)
    await this.consultants.persist(consultant)
    await this.emails.send(application.email, {
      subject: 'Application Received',
      body: 'Your application has been received',
    })
    return consultant
  }
}
