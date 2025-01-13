import { Router, Request, Response } from "express";
import { CreatePostController } from "./controllers/posts/CreatePostController";
import { CreateUsersController } from "./controllers/users/CreateUsersController";
const router = Router();

// rota de teste
router.get("/teste", (req: Request, res: Response) => {
  res.send("Hello World");
  // throw new Error("Error message");
});

// Rotas de usuários
router.post("/create-users", new CreateUsersController().handle);

// Rotas de posts
router.post("/create-posts", new CreatePostController().handle);

export { router };
