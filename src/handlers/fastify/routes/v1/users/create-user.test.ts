import test from 'node:test'
import expect from 'expect'
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

  expect(response.statusCode).toBe(200)
  expect(response.json().result).toEqual({
    id: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    name: 'John Doe',
    email: 'john@mail.com',
  })
})
