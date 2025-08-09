import { Request, Response } from "express";
import app from "../app";

console.log("Démarrage du point d'entrée Vercel...");

export default function handler(req: Request, res: Response) {
  console.log("Requête reçue sur l'API : ", req.url);

  return app(req, res);
}
