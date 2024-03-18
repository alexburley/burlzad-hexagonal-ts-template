import { GetUserByIdQuery } from "domain/use-cases/queries/get-user-by-id-command";

const handler = async (event, ctx) => {
  const { userId } = event.pathParameters;
  const user = await new GetUserByIdQuery().execute(userId);
  return {
    statusCode: 200,
    body: user.serialize(),
  };
};
