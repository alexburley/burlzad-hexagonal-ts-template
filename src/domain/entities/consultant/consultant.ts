import { Static, Type as T } from '@sinclair/typebox'
import {
  ConsultantApplicationTypeSchema,
  ConsultantApplicationDTO,
  ConsultantApplication,
} from './consultant-application'
import { Nullable } from '../../../lib/json-schema'
import { AggregateRoot, EntityProps } from '@burlzad/ddd'

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

export type ConsultantProps = EntityProps<{
  application?: ConsultantApplicationDTO
  status: ConsultantStatus
}>

export class Consultant extends AggregateRoot<ConsultantProps> {
  status
  application

  constructor(props: ConsultantProps) {
    super({ ...props, idPrefix: 'consultant' })
    this.application = props.application
    this.status = props.status
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
