import { Server, IncomingMessage, ServerResponse } from "http";
import { ApplicationContext } from "../utils/types";
import fastify from "fastify";

// declare module "fastify" {
//   export interface FastifyInstance<
//     HttpServer = Server,
//     HttpRequest = IncomingMessage,
//     HttpResponse = ServerResponse
//   > {
//     appCtx: ApplicationContext;
//   }
// }
