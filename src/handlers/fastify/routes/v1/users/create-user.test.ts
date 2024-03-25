import test from 'node:test'
import assert from 'node:assert'
import { APIFactory } from '../../../server'
import { FastifyInstance } from 'fastify'

let server: FastifyInstance

test.before(() => {
  server = APIFactory()
})

test.after(() => {
  server.close()
})

test('should create a user', async () => {
  const response = await server.inject({
    method: 'POST',
    url: '/v1/users',
    body: {
      name: 'John Doe',
      email: 'john@mail.com',
    },
  })

  assert.equal(response.statusCode, 200)
  assert.equal(
    response.headers['content-type'],
    'application/json; charset=utf-8',
  )
  assert.equal(typeof response.json().result.id, 'string')
  assert.equal(typeof response.json().result.createdAt, 'string')
  assert.equal(typeof response.json().result.updatedAt, 'string')
  assert.equal(response.json().result.name, 'John Doe')
  assert.equal(response.json().result.email, 'john@mail.com')
})
