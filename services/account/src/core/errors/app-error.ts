type Errors = {
  [key: string]: string[];
};

export class AppError extends Error {
  public readonly httpStatus: number;
  public readonly errors: Errors;

  constructor(message: string, httpStatus = 400, errors: Errors = {}) {
    super(message);
    this.httpStatus = httpStatus;
    this.errors = errors;
    this.name = AppError.name;
  }
}
