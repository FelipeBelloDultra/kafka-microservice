const methods = ["get", "post"] as const;

export type Method = (typeof methods)[number];

export interface Server {
  listen: (port: string) => void;
  on: (method: Method, url: string, callback: Function) => void;
}
