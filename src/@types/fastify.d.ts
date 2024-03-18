import fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { ApplicationContext } from "../packages/app-ctx/app-ctx";

declare module "fastify" {
  interface FastifyInstance {
    appCtx: ApplicationContext;
  }
}
