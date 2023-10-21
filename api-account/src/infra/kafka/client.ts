import { Kafka, KafkaConfig } from "kafkajs";

import { env } from "~/config/env";

const config: KafkaConfig = {
  clientId: "account-tasks",
  brokers: env.kafkaBrokers,
};

export const kafka = new Kafka(config);
