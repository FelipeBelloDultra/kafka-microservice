import { kafka } from "./client";

export async function startProducer() {
  const produce = kafka.producer();
  await produce.connect();
  await produce.send({
    topic: "email.welcome",
    messages: [
      {
        value: Buffer.from(JSON.stringify({ email: "foo@example.com" })),
      },
    ],
  });
  await produce.disconnect();
}

startProducer();
