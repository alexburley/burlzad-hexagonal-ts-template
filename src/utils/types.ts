import { ServiceConfiguration } from "packages/configuration/configuration";
import { Logger } from "packages/observability/logger/logger";

export type ApplicationContext = {
  logger: Logger;
  config: ServiceConfiguration;
};
