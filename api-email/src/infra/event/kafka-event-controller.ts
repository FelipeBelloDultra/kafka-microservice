import { EmailProvider } from "~/application/providers/email/email-provider";
import { EventProvider } from "~/application/providers/event/event-provider";
import { NewAccountCreated } from "~/application/use-cases/new-account-created.use-case";

export class KafkaEventController {
  constructor(
    private readonly eventProvider: EventProvider,
    private readonly emailProvider: EmailProvider
  ) {
    const newAccountCreated = new NewAccountCreated(this.emailProvider);

    const mapping = {
      "new.account.created": async (data: Buffer) => {
        return this.eventProvider.adpatHandler(newAccountCreated, data);
      },
    };

    this.eventProvider.consume(mapping);
  }
}
