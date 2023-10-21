import { Entity } from "~/core/domain/entity";

interface AccountProps {
  name: string;
  email: string;
  password: string;
}

export class Account extends Entity<AccountProps> {
  public get name(): string {
    return this.props.name;
  }
  public get email(): string {
    return this.props.email;
  }
  public get password(): string {
    return this.props.password;
  }

  private constructor(props: AccountProps, id?: string) {
    super(props, id);
  }

  public static create(props: AccountProps, id?: string): Account {
    return new Account(props, id);
  }
}
