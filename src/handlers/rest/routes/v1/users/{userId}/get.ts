import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { GetUserByIdQuery } from "domain/use-cases/queries/get-user-by-id-command";

export const handler = async (event: APIGatewayProxyEventV2, ctx: Context) => {
  const { userId } = event.pathParameters;
  const user = await new GetUserByIdQuery().execute(userId);
  return {
    statusCode: 200,
    body: user.serialize(),
  };
};
