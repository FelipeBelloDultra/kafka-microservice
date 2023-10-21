import "dotenv/config";

import { env } from "~/config/env";

import { ExpressServerAdapter } from "~/infra/http/express-server-adapter";
import { ExpressServerControllers } from "./infra/http/express-server-controllers";
import { RepositoryFactoryDatabase } from "./infra/factory/repository-factory-database";
import { KafkaEventAdapter } from "./infra/event/kafka-event-adapter";

async function main() {
  const server = new ExpressServerAdapter();
  const repositoryFactory = new RepositoryFactoryDatabase();
  const kafkaAdpater = new KafkaEventAdapter();

  new ExpressServerControllers(server, repositoryFactory, kafkaAdpater);

  server.listen(env.serverPort);
}

main();
