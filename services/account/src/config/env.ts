export const env = {
  kafkaBrokers: process.env.KAFKA_BROKERS?.split(",") || [
    "host.docker.internal:9094",
  ],
  serverPort: process.env.SERVER_PORT || "3000",
};
