import { UseCase } from "~/core/application/use-case";

type Input = {
  name: string;
  email: string;
  id: string;
};

export class NewAccountCreated implements UseCase<Input> {
  public async execute(data: Input): Promise<void> {
    console.log({ data });
  }
}
