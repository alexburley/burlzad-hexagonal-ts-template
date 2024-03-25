# Node.js TypeScript Hexagonal Architecture Template

This repository provides a template for setting up a Node.js project with TypeScript, following the Hexagonal Architecture (also known as Ports and Adapters) design pattern.

It features the following:

- A `fastify` server on an AWS lambdalith
- Unit testing with `node:test`
- Integration testing with `testcontainers`
- Logging with `pino`
- `aws-cdk` for deploying the lambdalith to AWS
- GitHub actions workflow for CI/CD
