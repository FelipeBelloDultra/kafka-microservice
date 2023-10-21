import { Account } from "~/domain/entity/account";

export interface AccountRepository {
  findByEmail: (email: string) => Promise<undefined | Account>;
  create: (account: Account) => Promise<Account>;
}
