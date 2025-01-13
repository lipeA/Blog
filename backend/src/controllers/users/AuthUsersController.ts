import { Request, Response } from "express";
import { AuthUsersService } from "../../services/users/AuthUsersService";

class AuthUsersController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUsersService = new AuthUsersService();

    const auth = await authUsersService.handle({
      email,
      password,
    });

    res.json(auth);
  }
}

export { AuthUsersController };
