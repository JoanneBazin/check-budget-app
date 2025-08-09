import { User } from "../../../shared/dist/types";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: string;
    }
  }
}

export {};
