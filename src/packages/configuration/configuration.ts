export type ServiceConfiguration = {
  serviceName: string;
};

export const ConfigurationFactory = () => ({
  serviceName: "user-management-service",
});
