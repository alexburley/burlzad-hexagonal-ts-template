import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { GetUserByIdQuery } from "domain/use-cases/queries/get-user-by-id-command";
import { GetUserRoute } from "./routes/v1/users/{userId}/get";
import { CreateUserRoute } from "./routes/v1/users/post";

export type ServiceFastifyInstance = ReturnType<
  typeof BaseFastifyInstanceFactory
>;

export const BaseFastifyInstanceFactory = () => {
  return fastify().withTypeProvider<TypeBoxTypeProvider>();
};

export const startServer = () => {
  const app = BaseFastifyInstanceFactory()
    .register(GetUserRoute)
    .register(CreateUserRoute);

  return app;
};

if (require.main === module) {
  // called directly i.e. "node app"
  startServer().listen({ port: 3000 }, (err) => {
    if (err) console.error(err);
    console.log("server listening on 3000");
  });
} else {
  // required as a module => executed on aws lambda
  module.exports = startServer;
}
