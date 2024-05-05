import { Static, Type as T } from '@sinclair/typebox'
import shortUUID from 'short-uuid'
import { Email } from '../../values/email'
import { Nullable } from '../../../lib/json-schema'

export const ConsultantStatus = {
  Pending: 'PENDING',
} as const

export type ConsultantStatus =
  (typeof ConsultantStatus)[keyof typeof ConsultantStatus]

export const ConsultantTypeSchema = T.Object({
  id: T.String(),
  userId: Nullable(T.String()),
  occupation: T.String(),
  linkedinUrl: Nullable(T.String({ format: 'url' })),
  application: Nullable(
    T.Object({
      name: T.String(),
      email: T.String({ format: 'email' }),
    }),
  ),
  status: T.Union(
    Object.values(ConsultantStatus).map(status => T.Literal(status)),
  ),
  createdAt: T.String({ format: 'date-time' }),
  modifiedAt: T.String({ format: 'date-time' }),
})

export type ConsultantApplication = {
  name: string
  email: Email
}

export type ConsultantDTO = Static<typeof ConsultantTypeSchema>

export type ConsultantProps = {
  id?: string
  userId?: string
  occupation: string
  linkedInUrl?: string
  application?: ConsultantApplication
  status?: ConsultantStatus
  createdAt?: Date
  modifiedAt?: Date
}

export class Consultant {
  readonly id: string
  readonly createdAt: Date
  readonly userId?: string
  status: ConsultantStatus
  occupation: string
  linkedInUrl?: string
  application?: ConsultantApplication
  modifiedAt: Date
  deletedAt?: Date

  constructor(props: ConsultantProps) {
    this.id = props.id ?? `consultant_${shortUUID.generate()}`
    this.userId = props.userId
    this.occupation = props.occupation
    this.application = props.application
    this.linkedInUrl = props.linkedInUrl
    this.status = props.status ?? ConsultantStatus.Pending
    this.createdAt = props.createdAt ?? new Date()
    this.modifiedAt = props.modifiedAt ?? new Date()
  }

  serialize(): ConsultantDTO {
    const application = this.application
      ? { name: this.application.name, email: this.application.email.value }
      : null

    return {
      id: this.id,
      userId: this.userId ?? null,
      application,
      status: this.status,
      occupation: this.occupation,
      linkedinUrl: this.linkedInUrl ?? null,
      createdAt: this.createdAt.toISOString(),
      modifiedAt: this.modifiedAt.toISOString(),
    }
  }
}
