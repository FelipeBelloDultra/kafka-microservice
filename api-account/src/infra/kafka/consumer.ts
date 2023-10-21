import { kafka } from "./client";

async function startConsumer() {
  const consumer = kafka.consumer({ groupId: "account-tasks-consumer" });

  await consumer.connect();
  await consumer.subscribe({
    topic: "email.welcome",
  });
  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      console.log(`[${topic}]: ${message.value?.toString()}`);
    },
  });
}

startConsumer();
