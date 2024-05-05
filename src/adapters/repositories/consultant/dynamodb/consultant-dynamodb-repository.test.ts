import { Consultant } from '../../../../domain/entities/consultant/consultant'
import { PendingConsultantDummy } from '../../../../domain/entities/consultant/test/dummy'
import { TestAppCtx } from '../../../../test/test-manager'
import { ConsultantNotFoundError } from '../errors'
import { ConsultantRepositoryFactory } from '../factory'

const appCtx = TestAppCtx()
const repository = new ConsultantRepositoryFactory().dynamodb(appCtx)

test('list() should return an empty collection', async () => {
  jest.spyOn(repository.schema, 'query').mockResolvedValue({ $metadata: {} })

  const result = await repository.list()

  expect(result).toEqual({ collection: [] })
})

test('getById() should return a Consultant', async () => {
  const Consultant = PendingConsultantDummy()
  await repository.persist(Consultant)

  const result = await repository.getById(Consultant.id)

  expect(result).toEqual(Consultant)
})

test('getById() should throw an error when Consultant not found', async () => {
  const Consultant = PendingConsultantDummy({ id: 'someNonExistentConsultant' })

  const result = await repository.getById(Consultant.id).catch(err => err)

  expect(result).toBeInstanceOf(ConsultantNotFoundError)
  expect(result.message).toEqual(
    'Consultant with id: someNonExistentConsultant not found',
  )
})

test('list() should list Consultants', async () => {
  const consultant = PendingConsultantDummy()

  await Promise.all([repository.persist(consultant)])

  const result = await repository.list()

  expect(result).toEqual({
    collection: expect.arrayContaining([consultant]),
  })
})

test('list() should paginate', async () => {
  await Promise.all([
    repository.persist(PendingConsultantDummy({ id: 'firstConsultant' })),
    repository.persist(PendingConsultantDummy({ id: 'secondConsultant' })),
  ])

  const { collection: firstCollection, cursor: firstCursor } =
    await repository.list({
      limit: 1,
    })
  const { collection: finalCollection, cursor: finalCursor } =
    await repository.list({
      cursor: firstCursor,
    })

  const firstConsultant = firstCollection[0] as Consultant

  expect(finalCollection).not.toEqual(expect.arrayContaining([firstConsultant]))
  expect(finalCursor).toBeUndefined()
})
