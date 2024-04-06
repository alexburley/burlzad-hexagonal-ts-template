import { Email } from '../../../../../domain/models/email'
import { CreateUserCommandFactory } from '../../../../../domain/use-cases/commands/create-user/command'
import { testServer } from '../../../../../test/setup-after-env'
import { TestAppCtx } from '../../../../../test/test-manager'

const createUser = new CreateUserCommandFactory().instance(TestAppCtx())

test('should retrieve a collection of users', async () => {
  await createUser.execute({
    name: 'John Smith',
    email: new Email('john@mail.com'),
  })

  const { statusCode, json } = await testServer.inject({
    method: 'GET',
    url: `/v1/users`,
    query: {
      limit: '1',
    },
  })

  expect({
    statusCode,
    json: json(),
  }).toEqual({
    statusCode: 200,
    json: {
      cursor: expect.any(String),
      result: expect.arrayContaining([
        expect.objectContaining({
          id: expect.stringContaining('user_'),
        }),
      ]),
    },
  })
})
