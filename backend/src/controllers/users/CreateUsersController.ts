import { Request, Response } from "express";
import { CreateUsersService } from "../../services/users/CreateUsersService";

class CreateUsersController {
  async handle(req: Request, res: Response) {
    // console.log(req.body);
    const { name, email, password, role } = req.body;

    const createUsersService = new CreateUsersService();

    const users = await createUsersService.execute({
      name,
      email,
      password,
      role,
    });

    res.json(users);
  }
}

export { CreateUsersController };
