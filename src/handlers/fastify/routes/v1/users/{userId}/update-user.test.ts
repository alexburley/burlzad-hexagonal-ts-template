import { Email } from '../../../../../../domain/values/email'
import { CreateUserCommandFactory } from '../../../../../../domain/use-cases/commands/create-user/command'
import { TestAppCtx } from '../../../../../../test/test-manager'
import { testServer } from '../../../../../../test/setup-after-env'

const createUser = new CreateUserCommandFactory().instance(TestAppCtx())

test('should update a user', async () => {
  const user = await createUser.execute({
    name: 'John Smith',
    email: new Email('john@mail.com'),
  })

  const response = await testServer.inject({
    method: 'PATCH',
    url: `/v1/users/${user.id}`,
    body: {
      name: 'Jon Snow',
    },
  })

  expect({
    status: response.statusCode,
    json: response.json(),
  }).toEqual({
    status: 200,
    json: {
      result: expect.objectContaining({
        name: 'Jon Snow',
      }),
    },
  })
})
