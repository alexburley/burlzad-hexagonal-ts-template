import { Email } from '../../../values/email'
import { Consultant, ConsultantProps, ConsultantStatus } from '../consultant'
import { ConsultantApplication } from '../consultant-application'

export const ConsultantApplicationDummy = () =>
  new ConsultantApplication({
    name: 'John Doe',
    email: new Email('john@mail.com'),
    occupation: 'CEO',
    description: 'Greatest CEO',
    linkedInUrl: 'https://linkedin.com/johndoe',
  })

const BaseProps = () => ({
  occupation: 'CEO',
  linkedInUrl: 'https://linkedin.com/johndoe',
  createdAt: new Date(),
  modifiedAt: new Date(),
})

export const PendingConsultantDummy = (
  partial: Partial<ConsultantProps> = {},
): Consultant => {
  return new Consultant({
    ...BaseProps(),
    status: ConsultantStatus.Pending,
    application: ConsultantApplicationDummy().serialize(),
    ...partial,
  })
}
