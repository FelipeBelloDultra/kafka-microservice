import { UseCase } from "~/core/application/use-case";

export type ConsumeDataType = {
  [key: string]: (data: Buffer) => Promise<void>;
};

export interface EventProvider {
  consume: (data: ConsumeDataType) => Promise<void>;
  adpatHandler: <T>(useCase: UseCase<T>, message: Buffer) => Promise<void>;
}
