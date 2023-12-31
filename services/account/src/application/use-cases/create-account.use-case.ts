import { UseCase } from "~/core/application/use-case";
import { EventProvider } from "../providers/event/event-provider";
import { AccountRepository } from "../repository/account-repository";
import { EmailAlreadyUsed } from "./errors/email-already-used";
import { Account } from "~/domain/entity/account";
import { RepositoryFactory } from "../factory/repository-factory";

type Input = {
  name: string;
  email: string;
  password: string;
};

export class CreateAccount implements UseCase<Input> {
  private readonly accountRepository: AccountRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    private readonly eventProvider: EventProvider
  ) {
    this.accountRepository = repositoryFactory.createAccountRepository();
  }

  public async execute(data: Input): Promise<void> {
    const existingAccountEmail = await this.accountRepository.findByEmail(
      data.email
    );

    if (existingAccountEmail) {
      throw new EmailAlreadyUsed();
    }

    const account = Account.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await this.accountRepository.create(account);
    await this.eventProvider.emit(
      "new.account.created",
      Buffer.from(
        JSON.stringify({
          name: account.name,
          email: account.email,
          id: account.id,
        })
      )
    );
  }
}
