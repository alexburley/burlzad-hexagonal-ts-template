import { Type as T } from '@sinclair/typebox'
import { ServiceFastifyInstance } from '../../../../api'
import { CreateConsultantApplicationCommandFactory } from '../../../../../../domain/use-cases/commands/create-consultant-application/command'
import { Email } from '../../../../../../domain/values/email'
import {
  ConsultantDTO,
  ConsultantTypeSchema,
} from '../../../../../../domain/entities/consultant/consultant'

export type CreateConsultantApplicationResponse = {
  result: ConsultantDTO
}

export const CreateConsultantApplicationRoute = async (
  fastify: ServiceFastifyInstance,
) =>
  fastify.put(
    '/v1/consultants/apply',
    {
      schema: {
        body: T.Object({
          name: T.String(),
          email: T.String({ format: 'email' }),
          occupation: T.String(),
          linkedinUrl: T.String({ format: 'url' }),
        }),
        response: {
          200: T.Object({ result: ConsultantTypeSchema }),
        },
      },
    },
    async (request): Promise<CreateConsultantApplicationResponse> => {
      const command = new CreateConsultantApplicationCommandFactory().instance(
        fastify.appCtx,
      )

      const consultant = await command.execute({
        name: request.body.name,
        email: new Email(request.body.email),
      })

      return {
        result: consultant.serialize(),
      }
    },
  )
