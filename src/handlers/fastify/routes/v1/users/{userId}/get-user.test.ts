import { Email } from '../../../../../../domain/models/email'
import { CreateUserCommandFactory } from '../../../../../../domain/use-cases/commands/create-user/command'
import { TestAppCtx } from '../../../../../../test/test-manager'
import { testServer } from '../../../../../../test/setup-after-env'

const createUser = new CreateUserCommandFactory().instance(TestAppCtx())

test('should retrieve a user', async () => {
  const user = await createUser.execute({
    name: 'John Smith',
    email: new Email('john@mail.com'),
  })

  const response = await testServer.inject({
    method: 'GET',
    url: `/v1/users/${user.id}`,
  })

  expect(response.statusCode).toBe(200)
  expect(response.json()).toEqual({
    result: {
      id: expect.stringContaining('user_'),
      name: 'John Smith',
      email: 'john@mail.com',
      createdAt: '2000-01-01T00:00:00.000Z',
      modifiedAt: '2000-01-01T00:00:00.000Z',
    },
  })
})
