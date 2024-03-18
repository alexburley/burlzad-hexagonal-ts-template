import { startServer } from './server'
import awsLambdaFastify from '@fastify/aws-lambda'

export const handler = awsLambdaFastify(startServer())
