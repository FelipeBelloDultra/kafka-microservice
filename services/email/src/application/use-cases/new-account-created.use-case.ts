import { UseCase } from "~/core/application/use-case";
import { EmailProvider } from "../providers/email/email-provider";

type Input = {
  name: string;
  email: string;
  id: string;
};

export class NewAccountCreated implements UseCase<Input> {
  constructor(private readonly emailProvider: EmailProvider) {}
  public async execute(data: Input): Promise<void> {
    await this.emailProvider.sendEmail({
      to: data.email,
      subject: `Welcome, ${data.name}!`,
      html: `<h1>${data.name}</h1> your email is ${data.email} and your id is ${data.id}`,
    });
  }
}
