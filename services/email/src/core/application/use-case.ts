export interface UseCase<Input = unknown, Output = Promise<void>> {
  execute: (data: Input) => Output;
}
