import { FastifyInstance } from 'fastify'
import mockdate from 'mockdate'
import { APIFactory } from '../handlers/fastify/api'

export let testServer: FastifyInstance

beforeAll(async () => {
  mockdate.set('2000-01-01T00:00:00Z')
  testServer = APIFactory()
  await testServer.ready()
})

afterAll(() => {
  testServer.close()
  mockdate.reset()
})

afterEach(() => {
  jest.restoreAllMocks()
})
