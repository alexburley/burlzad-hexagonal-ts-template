import { IntegrationEnvironment } from './integration-test-manager'

const teardown = async () => {
  await IntegrationEnvironment().down()
}

export default teardown
