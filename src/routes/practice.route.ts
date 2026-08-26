import { Router } from "express";
import { getDatabase } from "../db";



export const practiceRouter = Router();

practiceRouter.get("/", (req, res) => {
  res.json({ message: "Practice route working!" });
});