import fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { ApplicationContext } from "../utils/types";

declare module "fastify" {
  interface FastifyInstance {
    appCtx: ApplicationContext;
  }
}
