import { PendingConsultantDummy } from './test/dummy'

test('Contract test (Pending Consultant)', () => {
  expect(PendingConsultantDummy().serialize()).toEqual({
    application: {
      description: 'Greatest CEO',
      email: 'john@mail.com',
      linkedinUrl: 'https://linkedin.com/johndoe',
      name: 'John Doe',
      occupation: 'CEO',
    },
    createdAt: '2000-01-01T00:00:00.000Z',
    id: expect.stringContaining('consultant_'),
    modifiedAt: '2000-01-01T00:00:00.000Z',
    status: 'PENDING',
  })
})
