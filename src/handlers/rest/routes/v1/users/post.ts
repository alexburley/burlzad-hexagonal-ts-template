import { Type as T } from "@sinclair/typebox";
import { UserTypeSchema } from "domain/entities/user/user";
import { Email } from "domain/models/email";
import { CreateUserCommand, CreateUserCommandFactory } from "domain/use-cases/commands/create-user-command";
import { FastifyService } from "handlers/rest/fastify";

export const CreateUserRoute = (fastify: FastifyService) => {
  fastify.post(
    "/v1/users",
    {
      schema: {
        body: T.Object({
          name: T.String(),
          email: T.String({ format: "email" }),
        }),
        response: {
          200: {
            result: UserTypeSchema
          },
        },
      },
    },
    async (request, reply) => {
      const command = new CreateUserCommandFactory().instance()
      const user = await command.execute({
        name: request.body.name,
        email: new Email(request.body.email),
      });

      return {
        statusCode: 200,
        body: {
          result: user.serialize(),
        },
      };
    }
  );
};
