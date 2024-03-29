import { UserDummy } from '../../../../domain/entities/test/dummy'
import { TestAppCtx } from '../../../../test/integration-test-manager'
import { UserDynamoDBRepositoryFactory } from './repository'

const appCtx = TestAppCtx()

const repository = new UserDynamoDBRepositoryFactory().instance(appCtx)

test('getById() should return a user', async () => {
  const user = UserDummy()
  await repository.persist(user)

  const result = await repository.getById(user.id)

  expect(result).toEqual(user)
})
