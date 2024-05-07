import { Static, Type as T } from '@sinclair/typebox'
import { Email } from '../../values/email'
import { Nullable } from '../../../lib/json-schema'

export const ConsultantApplicationTypeSchema = T.Object({
  name: T.String(),
  email: T.String({ format: 'email' }),
  occupation: T.String(),
  linkedinUrl: Nullable(T.String({ format: 'url' })),
  description: T.String(),
})

export type ConsultantApplicationDTO = Static<
  typeof ConsultantApplicationTypeSchema
>

export type ConsultantApplicationProps = {
  name: string
  email: Email
  occupation: string
  linkedInUrl?: string
  description: string
}

export class ConsultantApplication {
  readonly name: string
  readonly email: Email
  readonly occupation: string
  readonly description: string
  readonly linkedInUrl?: string

  constructor(props: ConsultantApplicationProps) {
    this.name = props.name
    this.email = props.email
    this.occupation = props.occupation
    this.description = props.description
    this.linkedInUrl = props.linkedInUrl
  }

  serialize(): ConsultantApplicationDTO {
    return {
      name: this.name,
      email: this.email.value,
      occupation: this.occupation,
      description: this.description,
      linkedinUrl: this.linkedInUrl ?? null,
    }
  }
}
