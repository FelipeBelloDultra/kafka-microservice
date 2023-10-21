import "dotenv/config";

import { KafkaEventAdapter } from "./infra/event/kafka-event-adapter";
import { KafkaEventController } from "./infra/event/kafka-event-controller";

async function start() {
  const kafka = new KafkaEventAdapter();
  new KafkaEventController(kafka);
}

start();
