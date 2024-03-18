import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export type FastifyService = ReturnType<typeof startServer>;

export const startServer = () => {
  const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

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
