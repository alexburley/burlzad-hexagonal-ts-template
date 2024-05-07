import { Email } from '../../domain/values/email'

export type EmailValue = {
  subject: string
  body: string
}

export type EmailClientAdapter = {
  send: (to: Email, content: EmailValue) => Promise<void>
}
