import { IntegrationEnvironment } from './integration-test-manager'

export const setup = async () => {
  await IntegrationEnvironment().up()
  process.env.INTEGRATION_ENVIRONMENT_READY = 'true'
}

export default setup
