import { Kafka } from "kafkajs";

import {
  ConsumeDataType,
  EventProvider,
} from "~/application/providers/event/event-provider";

import { env } from "~/config/env";
import { UseCase } from "~/core/application/use-case";

export class KafkaEventAdapter implements EventProvider {
  private readonly kafkaInstance: Kafka;

  constructor() {
    this.kafkaInstance = new Kafka({
      clientId: "account-tasks",
      brokers: env.kafkaBrokers,
    });
  }

  public adpatHandler<T>(useCase: UseCase<T>, message: Buffer): Promise<void> {
    const data = JSON.parse(message.toString()) as T;

    return useCase.execute(data);
  }

  public async consume(topicsActions: ConsumeDataType): Promise<void> {
    const consumer = this.kafkaInstance.consumer({
      groupId: "api-email-consumer",
      allowAutoTopicCreation: true,
    });

    await consumer.connect();

    await Promise.all(
      Object.keys(topicsActions).map((topic) => {
        return consumer.subscribe({ topic, fromBeginning: true });
      })
    );

    await consumer.run({
      eachMessage: async ({ message, topic }) => {
        try {
          const handler = topicsActions[topic];

          if (!handler) {
            console.error(`Kafka topic not handled: ${topic}`);
          }

          handler(
            message.value ? message.value : Buffer.from(JSON.stringify({}))
          );
        } catch (error) {
          console.error(error);
        }
      },
    });
  }
}
