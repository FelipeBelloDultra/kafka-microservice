import { AccountRepository } from "~/application/repository/account-repository";
import { Account } from "~/domain/entity/account";
import {
  AccountMapper,
  ToPersistenceAccount,
} from "~/application/mappers/account-mapper";

export class AccountRepositoryDatabase implements AccountRepository {
  private readonly accounts: ToPersistenceAccount[];

  constructor() {
    this.accounts = [];
  }

  public async findByEmail(email: string): Promise<Account | undefined> {
    const findedAccount = await this.accounts.find(
      (account) => account.email === email
    );
    if (!findedAccount) return undefined;
    return AccountMapper.toDomain(findedAccount);
  }

  public async create(account: Account): Promise<Account> {
    this.accounts.push(AccountMapper.toPersistence(account));
    return account;
  }
}
