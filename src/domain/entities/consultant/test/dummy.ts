import { Email } from '../../../values/email'
import { Consultant, ConsultantProps, ConsultantStatus } from '../consultant'

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
    application: {
      name: 'John Doe',
      email: new Email('john@mail.com'),
    },
    ...partial,
  })
}
