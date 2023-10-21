import "express-async-errors";

import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

import { Server, Method } from "./server";
import { AppError } from "~/core/errors/app-error";

export class ExpressServerAdapter implements Server {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
  }

  public on(method: Method, url: string, callback: Function): void {
    this.app[method](url, async (req, res, next) => {
      return await callback(req, res, next);
    });
  }

  public listen(port: string): void {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof AppError) {
          return res.status(err.httpStatus).json({
            data: {},
            error: {
              status: err.httpStatus,
              message: err.message,
              errors: err.errors,
            },
          });
        }

        return res.status(500).json({
          data: {},
          error: {
            statis: 500,
            message: "Internal server error",
            errors: {},
          },
        });
      }
    );

    this.app.listen(port, () => {
      console.log(`[🚀 running]: server listening on ${port}`);
    });
  }
}
