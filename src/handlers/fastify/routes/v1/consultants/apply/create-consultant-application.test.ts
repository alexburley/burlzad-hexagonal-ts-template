import { testServer } from '../../../../../../test/setup-after-env'

test('should create a pending consultant', async () => {
  const response = await testServer.inject({
    method: 'PUT',
    url: '/v1/consultants/apply',
    body: {
      name: 'John Doe',
      email: 'john@mail.com',
      occupation: 'CEO',
      description: 'Greatest CEO',
      linkedinUrl: 'https://linkedin.com/johndoe',
    },
  })

  expect(response.statusCode).toBe(200)
  expect(response.json()).toEqual({
    result: {
      id: expect.stringContaining('consultant_'),
      application: {
        name: 'John Doe',
        email: 'john@mail.com',
        occupation: 'CEO',
        description: 'Greatest CEO',
        linkedinUrl: 'https://linkedin.com/johndoe',
      },
      createdAt: '2000-01-01T00:00:00.000Z',
      modifiedAt: '2000-01-01T00:00:00.000Z',
      status: 'PENDING',
    },
  })
})
