import { Router, Request, Response } from "express";

const router = Router();

router.get("/teste", (req: Request, res: Response) => {
  res.send("Hello World");
  //   throw new Error("Error message");
});

export { router };
