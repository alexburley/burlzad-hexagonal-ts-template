import { UserDummy } from '../test/dummy'

test('Contract test', () => {
  expect(UserDummy().serialize()).toEqual({
    createdAt: '2000-01-01T00:00:00.000Z',
    email: 'john@mail.com',
    id: 'user_1',
    name: 'John Doe',
    modifiedAt: '2000-01-01T00:00:00.000Z',
  })
})
