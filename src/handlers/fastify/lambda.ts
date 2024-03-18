import fastify from "fastify";
import { startServer } from "./server";
const awsLambdaFastify = require("@fastify/aws-lambda");

export const handler = awsLambdaFastify(startServer());
