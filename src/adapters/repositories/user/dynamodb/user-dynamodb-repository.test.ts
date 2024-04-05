import { UserDummy } from '../../../../domain/entities/test/dummy'
import { User } from '../../../../domain/entities/user/user'
import { TestAppCtx } from '../../../../test/test-manager'
import { UserNotFoundError } from '../errors'
import { UserDynamoDBRepositoryFactory } from './repository'

const appCtx = TestAppCtx()
const repository = new UserDynamoDBRepositoryFactory().instance(appCtx)

test('list() should return an empty collection', async () => {
  jest.spyOn(repository.schema, 'query').mockResolvedValue({ $metadata: {} })

  const result = await repository.list()

  expect(result).toEqual({ collection: [] })
})

test('getById() should return a user', async () => {
  const user = UserDummy()
  await repository.persist(user)

  const result = await repository.getById(user.id)

  expect(result).toEqual(user)
})

test('getById() should throw an error when user not found', async () => {
  const user = UserDummy({ id: 'someNonExistentUser' })

  const result = await repository.getById(user.id).catch(err => err)

  expect(result).toBeInstanceOf(UserNotFoundError)
  expect(result.message).toEqual('User with id: someNonExistentUser not found')
})

test('list() should list users', async () => {
  const user = UserDummy()
  await repository.persist(user)

  const result = await repository.list()

  expect(result).toEqual({ collection: expect.arrayContaining([user]) })
})

test('list() should paginate', async () => {
  await repository.persist(UserDummy({ id: 'firstUser' }))
  await repository.persist(UserDummy({ id: 'secondUser' }))

  const { collection: firstCollection, cursor: firstCursor } =
    await repository.list({
      limit: 1,
    })
  const { collection: finalCollection, cursor: finalCursor } =
    await repository.list({
      cursor: firstCursor,
    })

  const firstUser = firstCollection[0] as User

  expect(finalCollection).not.toEqual(expect.arrayContaining([firstUser]))
  expect(finalCursor).toBeUndefined()
})

test('delete() should delete a user and exclude from the collection', async () => {
  const user = UserDummy({ id: 'someDeletedUser' })

  await repository.persist(user)
  await repository.delete(user.id)

  const result = await repository.list()

  expect(result).toEqual({ collection: expect.not.arrayContaining([user]) })
})

test('delete() should delete the user and throw if the user is requested', async () => {
  const user = UserDummy({ id: 'someDeletedUser' })

  await repository.persist(user)
  await repository.delete(user.id)

  const result = await repository.getById(user.id).catch(err => err)

  expect(result).toBeInstanceOf(UserNotFoundError)
})
