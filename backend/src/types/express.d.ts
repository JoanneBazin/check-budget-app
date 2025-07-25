import { User } from "@shared/types";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: string;
    }
  }
}

export {};
