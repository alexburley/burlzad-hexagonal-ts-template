import { mock } from 'jest-mock-extended'
import { TestAppCtx } from '../../../../test/test-manager'
import { UpdateUserCommand } from './command'
import { UserRepository } from '../../../../adapters/repositories/user'
import { UserDummy } from '../../../entities/user/test/dummy'

const repository = mock<UserRepository>()
const command = new UpdateUserCommand(TestAppCtx(), {
  users: repository,
})

test('should update a user', async () => {
  const user = UserDummy({ modifiedAt: new Date(1) })

  repository.getById.mockResolvedValue(user)

  await command.execute(user.id, { name: 'Jon Snow' })

  expect(repository.persist).toHaveBeenCalledWith(
    UserDummy({
      ...user,
      modifiedAt: new Date(),
      name: 'Jon Snow',
    }),
  )
})

test('should update a user with no input', async () => {
  const user = UserDummy({ modifiedAt: new Date(1) })
  repository.getById.mockResolvedValue(user)

  await command.execute(user.id, {})

  expect(repository.persist).toHaveBeenCalledWith(
    UserDummy({
      ...user,
      modifiedAt: new Date(),
    }),
  )
})
