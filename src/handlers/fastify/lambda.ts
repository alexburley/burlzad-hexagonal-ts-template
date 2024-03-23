import { APIFactory } from './server'
import awsLambdaFastify from '@fastify/aws-lambda'

export const handler = awsLambdaFastify(APIFactory())
