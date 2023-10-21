import nodemailer from "nodemailer";

import { env } from "~/config/env";
import { EmailProvider } from "~/application/providers/email/email-provider";

export class NodemailerEmailAdapter implements EmailProvider {
  private readonly nodemailerInstance: nodemailer.Transporter;

  constructor() {
    this.nodemailerInstance = nodemailer.createTransport({
      host: env.emailHost,
      port: Number(env.emailPort),
      auth: {
        user: env.emailUsername,
        pass: env.emailPassword,
      },
    });
  }

  public async sendEmail({
    to,
    html,
    subject,
  }: {
    to: string;
    html: string;
    subject: string;
  }): Promise<void> {
    await this.nodemailerInstance.sendMail({
      from: "noreply@account.com.br",
      to,
      html,
      subject,
    });
  }
}
