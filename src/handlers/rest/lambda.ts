import fastify from "fastify";
import { startServer } from "./fastify";
const awsLambdaFastify = require("@fastify/aws-lambda");

export const handler = awsLambdaFastify(startServer());
