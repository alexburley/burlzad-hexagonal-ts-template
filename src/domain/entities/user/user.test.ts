import { UserDummy } from '../test/dummy'

test('Contract test', () => {
  expect(UserDummy().serialize()).toEqual({
    createdAt: '1970-01-01T00:00:00.001Z',
    email: 'john@mail.com',
    id: 'user_1',
    name: 'John Doe',
    modifiedAt: '1970-01-01T00:00:00.001Z',
  })
})
