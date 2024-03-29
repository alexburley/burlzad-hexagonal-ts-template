import { testServer } from '../../../../../test/setup-after-env'

test('should create a user', async () => {
  const response = await testServer.inject({
    method: 'POST',
    url: '/v1/users',
    body: {
      name: 'John Doe',
      email: 'john@mail.com',
    },
  })

  expect(response.statusCode).toBe(200)
  expect(response.json()).toEqual({
    result: {
      id: expect.stringContaining('user_'),
      name: 'John Doe',
      email: 'john@mail.com',
      createdAt: '2000-01-01T00:00:00.000Z',
      modifiedAt: '2000-01-01T00:00:00.000Z',
    },
  })
})
