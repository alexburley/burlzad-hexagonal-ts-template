import { mock } from 'jest-mock-extended'
import { TestAppCtx } from '../../../../test/test-manager'
import { DeleteUserCommand } from './command'
import { UserRepository } from '../../../../adapters/repositories/user'
import { UserDummy } from '../../../entities/user/test/dummy'
import { Email } from '../../../values/email'

const repository = mock<UserRepository>()
const command = new DeleteUserCommand(TestAppCtx(), {
  users: repository,
})

test('should create a user', async () => {
  const user = UserDummy({ modifiedAt: new Date(1) })
  repository.getById.mockResolvedValue(user)

  await command.execute(user.id)

  expect(repository.persist).toHaveBeenCalledWith(
    UserDummy({
      ...user,
      status: 'DELETED',
      modifiedAt: new Date(),
      deletedAt: new Date(),
      name: '**REDACTED**',
      email: new Email(`${user.id}@deleted.com`),
    }),
  )
})
