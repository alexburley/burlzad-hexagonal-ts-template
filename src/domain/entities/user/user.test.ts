import { DeletedUserDummy, UserDummy } from '../test/dummy'

test('Contract test (Active User)', () => {
  expect(UserDummy().serialize()).toEqual({
    createdAt: '2000-01-01T00:00:00.000Z',
    email: 'john@mail.com',
    id: expect.stringContaining('user_'),
    name: 'John Doe',
    modifiedAt: '2000-01-01T00:00:00.000Z',
    deletedAt: null,
    status: 'ACTIVE',
  })
})

test('Contract test (Deleted User)', () => {
  expect(DeletedUserDummy().serialize()).toEqual({
    createdAt: '2000-01-01T00:00:00.000Z',
    deletedAt: '2000-01-01T00:00:00.000Z',
    email: 'john@mail.com',
    id: expect.stringContaining('user_'),
    modifiedAt: '2000-01-01T00:00:00.000Z',
    name: 'John Doe',
    status: 'DELETED',
  })
})
