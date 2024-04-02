import { TestEnvironment } from './test-manager'

const teardown = async () => {
  await TestEnvironment().down()
}

export default teardown
