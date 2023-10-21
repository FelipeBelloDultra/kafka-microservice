import { Kafka } from "kafkajs";

import { EventProvider } from "~/application/providers/event/event-provider";

import { env } from "~/config/env";

export class KafkaEventAdapter implements EventProvider {
  private readonly kafkaInstance: Kafka;

  constructor() {
    this.kafkaInstance = new Kafka({
      clientId: "account-tasks",
      brokers: env.kafkaBrokers,
    });
  }

  public async emit(topic: string, data: Buffer): Promise<void> {
    const produce = this.kafkaInstance.producer();
    await produce.connect();
    await produce.send({
      topic,
      messages: [
        {
          value: data,
        },
      ],
    });
    await produce.disconnect();
  }
}
