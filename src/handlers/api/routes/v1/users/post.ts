import { CreateUserCommand } from "domain/use-cases/commands/create-user-command";

export const CreateUserRoute = () => {
  return async (event, ctx) => {
    const command = new CreateUserCommand();
    const input = JSON.parse(event.body);
    const user = await command.execute({
      name: input.name,
      email: input.email,
    });

    return {
      statusCode: 200,
      body: {
        result: user.serialize(),
      },
    };
  };
};

export const createUser = CreateUserRoute();
