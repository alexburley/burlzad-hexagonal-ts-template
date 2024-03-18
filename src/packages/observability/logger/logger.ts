import pino, { BaseLogger } from "pino";

export const LoggerFactory = () => pino();
export type Logger = BaseLogger
