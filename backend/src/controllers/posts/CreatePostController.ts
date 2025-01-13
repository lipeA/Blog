import { Request, Response } from "express";

class CreatePostController {
  async handle(req: Request, res: Response) {
    res.json({ message: "Post created!" });
  }
}

export { CreatePostController };
