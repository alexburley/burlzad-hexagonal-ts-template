import { Email } from '../../../../../../domain/models/email'
import { CreateUserCommandFactory } from '../../../../../../domain/use-cases/commands/create-user/command'
import { TestAppCtx } from '../../../../../../test/test-manager'
import { testServer } from '../../../../../../test/setup-after-env'

const createUser = new CreateUserCommandFactory().instance(TestAppCtx())

test('should delete a user', async () => {
  const user = await createUser.execute({
    name: 'John Smith',
    email: new Email('john@mail.com'),
  })

  const response = await testServer.inject({
    method: 'DELETE',
    url: `/v1/users/${user.id}`,
  })

  expect({
    status: response.statusCode,
    json: response.json(),
  }).toEqual({
    status: 200,
    json: {},
  })
})
