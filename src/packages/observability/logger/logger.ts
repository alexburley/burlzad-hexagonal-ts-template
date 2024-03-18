import pino from "pino";

export const LoggerFactory = () => pino();
export type Logger = ReturnType<typeof LoggerFactory>;
