import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(router);
app.use(cors());

// tratamento de erros.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({
      error: err.message,
    });
  }
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

// porta do servidor.
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
