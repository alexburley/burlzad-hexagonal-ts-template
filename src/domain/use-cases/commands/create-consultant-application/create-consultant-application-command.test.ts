import { mock } from 'jest-mock-extended'
import { TestAppCtx } from '../../../../test/test-manager'
import { CreateUserCommand } from './command'
import { UserRepository } from '../../../../adapters/repositories/user'
import { Email } from '../../../values/email'
import { UserDummy } from '../../../entities/user/test/dummy'

const repository = mock<UserRepository>()
const command = new CreateUserCommand(TestAppCtx(), {
  users: repository,
})

test('should create a user', async () => {
  const result = await command.execute({
    name: 'John Doe',
    email: new Email('john@mail.com'),
  })

  expect(repository.persist).toHaveBeenCalledWith(result)
  expect(result).toEqual(UserDummy({ id: expect.stringContaining('user_') }))
})
