import { PendingConsultantDummy } from './test/dummy'

test('Contract test (Pending Consultant)', () => {
  expect(PendingConsultantDummy().serialize()).toEqual({
    application: { email: 'john@mail.com', name: 'John Doe' },
    createdAt: '2000-01-01T00:00:00.000Z',
    id: 'consultant_6kLp1qXvLGtReXyo1PhJtg',
    linkedinUrl: 'https://linkedin.com/johndoe',
    modifiedAt: '2000-01-01T00:00:00.000Z',
    occupation: 'CEO',
    status: 'PENDING',
  })
})
