import { mock } from 'jest-mock-extended'
import { TestAppCtx } from '../../../../test/test-manager'
import { UserRepository } from '../../../../adapters/repositories/user'
import { UserDummy } from '../../../entities/test/dummy'
import { GetUserByIdQuery } from './query'

const repository = mock<UserRepository>()
const query = new GetUserByIdQuery(TestAppCtx(), {
  users: repository,
})

test('should create a user', async () => {
  repository.getById.mockResolvedValue(UserDummy())

  const result = await query.execute('someUserId')

  expect(repository.getById).toHaveBeenCalledWith('someUserId')
  expect(result).toEqual(UserDummy())
})
