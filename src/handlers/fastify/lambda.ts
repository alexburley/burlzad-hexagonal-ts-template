import { APIFactory } from './api'
import awsLambdaFastify from '@fastify/aws-lambda'

export const handler = awsLambdaFastify(APIFactory())
