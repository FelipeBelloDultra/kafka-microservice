import { Account } from "~/domain/entity/account";

export interface ToPersistenceAccount {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class AccountMapper {
  public static toDomain(raw: ToPersistenceAccount): Account {
    return Account.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
      },
      raw.id
    );
  }

  public static toPersistence(account: Account): ToPersistenceAccount {
    return {
      id: account.id,
      email: account.email,
      name: account.name,
      password: account.password,
    };
  }
}
