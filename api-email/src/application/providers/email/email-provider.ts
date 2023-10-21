export interface EmailProvider {
  sendEmail: ({
    to,
    html,
    subject,
  }: {
    to: string;
    html: string;
    subject: string;
  }) => Promise<void>;
}
