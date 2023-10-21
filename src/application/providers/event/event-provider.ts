export interface EventProvider {
  emit: (topic: string, data: Buffer) => Promise<void>;
}
