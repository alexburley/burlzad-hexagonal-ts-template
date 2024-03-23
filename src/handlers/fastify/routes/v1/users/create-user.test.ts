import t from 'tap'
import { APIFactory } from '../../../server'

t.test('should create a user', async t => {
  const server = APIFactory()
  t.teardown(() => server.close())

  const response = await server.inject({
    method: 'POST',
    url: '/v1/users',
    body: {
      name: 'John Doe',
      email: 'john@mail.com',
    },
  })

  t.equal(response.statusCode, 200)
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
  t.type(response.json().result.id, 'string')
  t.equal(response.json().result.name, 'John Doe')
  t.equal(response.json().result.email, 'john@mail.com')
  t.type(response.json().result.createdAt, 'string')
  t.type(response.json().result.updatedAt, 'string')
})
