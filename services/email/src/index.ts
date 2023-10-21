import "dotenv/config";

import { KafkaEventAdapter } from "~/infra/event/kafka-event-adapter";
import { KafkaEventController } from "~/infra/event/kafka-event-controller";
import { NodemailerEmailAdapter } from "~/infra/email/nodemailer-email-adapter";

async function start() {
  const nodemailer = new NodemailerEmailAdapter();
  const kafka = new KafkaEventAdapter();
  new KafkaEventController(kafka, nodemailer);
}

start();
