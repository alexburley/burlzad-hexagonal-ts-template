import { mock } from 'jest-mock-extended'
import { CreateConsultantApplicationCommand } from './command'
import { ConsultantRepository } from '../../../../adapters/repositories/consultant'
import {
  ConsultantApplicationDummy,
  PendingConsultantDummy,
} from '../../../entities/consultant/test/dummy'

const repository = mock<ConsultantRepository>()
const command = new CreateConsultantApplicationCommand({
  consultants: repository,
})

test('should create a user', async () => {
  const result = await command.execute(ConsultantApplicationDummy())

  expect(repository.persist).toHaveBeenCalledWith(result)
  expect(result).toEqual(
    PendingConsultantDummy({ id: expect.stringContaining('consultant_') }),
  )
})
