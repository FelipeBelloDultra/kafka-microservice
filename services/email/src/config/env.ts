export const env = {
  kafkaBrokers: process.env.KAFKA_BROKERS?.split(",") || [
    "host.docker.internal:9094",
  ],
  emailHost: process.env.EMAIL_HOST || "",
  emailPort: process.env.EMAIL_PORT || "",
  emailUsername: process.env.EMAIL_USERNAME || "",
  emailPassword: process.env.EMAIL_PASSWORD || "",
};
