import { Email } from '../../../domain/values/email'
import { ApplicationContext } from '../../../lib/app-ctx/app-ctx'
import { EmailClientAdapter, EmailValue } from '../../email-client'

export class InMemoryEmailClientAdapter implements EmailClientAdapter {
  logger

  constructor(appCtx: ApplicationContext) {
    this.logger = appCtx.logger
  }

  async send(to: Email, content: EmailValue) {
    this.logger.debug(
      `Sending email to ${to.value} with content: ${content.subject} - ${content.body}`,
    )
  }
}