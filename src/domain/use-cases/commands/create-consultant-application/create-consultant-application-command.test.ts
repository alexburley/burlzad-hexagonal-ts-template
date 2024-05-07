import { mock } from 'jest-mock-extended'
import { CreateConsultantApplicationCommand } from './command'
import { ConsultantRepository } from '../../../../adapters/repositories/consultant'
import {
  ConsultantApplicationDummy,
  PendingConsultantDummy,
} from '../../../entities/consultant/test/dummy'
import { EmailClientAdapter } from '../../../../adapters/email-client'

const repository = mock<ConsultantRepository>()
const emails = mock<EmailClientAdapter>()

const command = new CreateConsultantApplicationCommand({
  consultants: repository,
  emails,
})

test('should create a user', async () => {
  const result = await command.execute(ConsultantApplicationDummy())

  expect(repository.persist).toHaveBeenCalledWith(result)
  expect(emails.send).toHaveBeenCalledWith(
    { value: 'john@mail.com' },
    {
      body: 'Your application has been received',
      subject: 'Application Received',
    },
  )
  expect(result).toEqual(
    PendingConsultantDummy({ id: expect.stringContaining('consultant_') }),
  )
})
