import { Static, Type as T } from '@sinclair/typebox'
import shortUUID from 'short-uuid'
import {
  ConsultantApplicationTypeSchema,
  ConsultantApplicationDTO,
  ConsultantApplication,
} from './consultant-application'
import { Nullable } from '../../../lib/json-schema'

export const ConsultantStatus = {
  Pending: 'PENDING',
} as const

export type ConsultantStatus =
  (typeof ConsultantStatus)[keyof typeof ConsultantStatus]

export const ConsultantTypeSchema = T.Object({
  id: T.String(),
  status: T.Union(
    Object.values(ConsultantStatus).map(status => T.Literal(status)),
  ),
  application: Nullable(ConsultantApplicationTypeSchema),
  createdAt: T.String({ format: 'date-time' }),
  modifiedAt: T.String({ format: 'date-time' }),
})

export type ConsultantDTO = Static<typeof ConsultantTypeSchema>

export type ConsultantProps = {
  id?: string
  versionId?: string
  application?: ConsultantApplicationDTO
  status: ConsultantStatus
  createdAt?: Date
  modifiedAt?: Date
}

export class Consultant {
  readonly id: string
  readonly versionId: string
  readonly createdAt: Date
  readonly userId?: string
  status: ConsultantStatus
  application?: ConsultantApplicationDTO
  modifiedAt: Date
  deletedAt?: Date

  constructor(props: ConsultantProps) {
    this.id = props.id ?? `consultant_${shortUUID.generate()}`
    this.versionId = props.versionId ?? shortUUID.generate()
    this.application = props.application
    this.status = props.status
    this.createdAt = props.createdAt ?? new Date()
    this.modifiedAt = props.modifiedAt ?? new Date()
  }

  static fromApplication(application: ConsultantApplication): Consultant {
    return new Consultant({
      application: application.serialize(),
      status: ConsultantStatus.Pending,
    })
  }

  serialize(): ConsultantDTO {
    return {
      id: this.id,
      application: this.application ?? null,
      status: this.status,
      createdAt: this.createdAt.toISOString(),
      modifiedAt: this.modifiedAt.toISOString(),
    }
  }
}
