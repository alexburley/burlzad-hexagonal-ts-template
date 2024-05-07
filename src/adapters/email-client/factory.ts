import { ApplicationContext } from '../../lib/app-ctx/app-ctx'
import { InMemoryEmailClientAdapter } from './in-memory'

export class EmailClientFactory {
  instance(ctx: ApplicationContext) {
    return this.inMemory(ctx)
  }

  inMemory(ctx: ApplicationContext) {
    return new InMemoryEmailClientAdapter(ctx)
  }
}
