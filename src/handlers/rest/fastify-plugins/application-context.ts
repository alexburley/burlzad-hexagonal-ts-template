import fp from "fastify-plugin";
import { ConfigurationFactory } from "packages/configuration/configuration";
import { ApplicationContext } from "utils/types";

export const FastifyApplicationContext = fp((fastify, opts, done) => {
  const configuration = new ConfigurationFactory();
  const appCtx: ApplicationContext = {
    configuration: configuration.instance(),
    logger: fastify.log.child({}),
  };
  fastify.decorate("appCtx", appCtx);

  done();
});
