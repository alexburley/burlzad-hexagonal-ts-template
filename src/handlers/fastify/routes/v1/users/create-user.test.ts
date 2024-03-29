import { APIFactory } from '../../../server'
import { FastifyInstance } from 'fastify'
import { mock } from 'jest-mock-extended'
import {
  CreateUserCommand,
  CreateUserCommandFactory,
} from '../../../../../domain/use-cases/commands/create-user-command'
import { UserDummy } from '../../../../../domain/entities/test/dummy'
import { Email } from '../../../../../domain/models/email'

let server: FastifyInstance

const command = mock<CreateUserCommand>()
jest
  .spyOn(CreateUserCommandFactory.prototype, 'instance')
  .mockReturnValue(command)

beforeAll(async () => {
  server = APIFactory()
  await server.ready()
})

afterAll(() => {
  server.close()
})

test('should create a user', async () => {
  command.execute.mockResolvedValue(UserDummy())
  const response = await server.inject({
    method: 'POST',
    url: '/v1/users',
    body: {
      name: 'John Doe',
      email: 'john@mail.com',
    },
  })
  expect(command.execute).toHaveBeenCalledWith({
    name: 'John Doe',
    email: new Email('john@mail.com'),
  })
  expect(response.statusCode).toBe(200)
  expect(response.json()).toEqual({ result: UserDummy().serialize() })
})
