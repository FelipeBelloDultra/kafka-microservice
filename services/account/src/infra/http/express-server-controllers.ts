import { Request, Response } from "express";

import { Server } from "./server";

import { EventProvider } from "~/application/providers/event/event-provider";
import { RepositoryFactory } from "~/application/factory/repository-factory";
import { CreateAccount } from "~/application/use-cases/create-account.use-case";

export class ExpressServerControllers {
  constructor(
    private readonly server: Server,
    private readonly repositoryFactory: RepositoryFactory,
    private readonly eventProvider: EventProvider
  ) {
    const createAccount = new CreateAccount(
      this.repositoryFactory,
      this.eventProvider
    );
    this.server.on(
      "post",
      "/api/accounts",
      async (req: Request, res: Response) => {
        const { email, password, name } = req.body;

        await createAccount.execute({ email, password, name });

        return res.status(201).send();
      }
    );
  }
}
