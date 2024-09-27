/* eslint-disable @typescript-eslint/no-explicit-any */
export class ConcurrencyCheckError extends Error {
  constructor() {
    super('Concurrency conflict detected, please retry')
    this.name = 'ConcurrencyCheckError'
  }
}


export function RetryConcurrencyConflict<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >,
) {
  const retries = 2
  async function retryableMethod(
    this: This,
    ...args: Args
  ): Promise<Awaited<Return>> {
    let attempts = 0
    while (attempts <= retries) {
      try {
        return await target.call(this, ...args)
      } catch (error: any) {
        if (
          error.message instanceof ConcurrencyCheckError &&
          attempts < retries
        ) {
          attempts++
          console.warn(
            `Retrying due to concurrency conflict (${attempts}/${retries})...`,
          )
        } else {
          throw error
        }
      }
    }
    throw new Error('Max retries reached without successful completion')
  }

  return retryableMethod
}
