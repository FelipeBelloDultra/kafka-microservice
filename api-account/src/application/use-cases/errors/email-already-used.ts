import { UseCaseError } from "~/core/domain/errors/use-case-error";
import { AppError } from "~/core/errors/app-error";

export class EmailAlreadyUsed extends AppError implements UseCaseError {
  constructor() {
    super("Email already used", 409);
    this.name = EmailAlreadyUsed.name;
  }
}
