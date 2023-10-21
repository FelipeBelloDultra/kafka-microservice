import { RepositoryFactory } from "~/application/factory/repository-factory";
import { AccountRepository } from "~/application/repository/account-repository";
import { AccountRepositoryDatabase } from "../repository/account-repository-database";

export class RepositoryFactoryDatabase implements RepositoryFactory {
  public createAccountRepository(): AccountRepository {
    return new AccountRepositoryDatabase();
  }
}
