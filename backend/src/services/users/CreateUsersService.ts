import prismaClient from "../../prisma";
import { Role } from "@prisma/client";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
  role: "admin" | "reader";
}

class CreateUsersService {
  async execute({ email, name, password, role }: UserRequest) {
    // console.log(name);

    // verificar se o email existe.
    if (!email) {
      throw new Error("Email incorreto");
    }

    // verificar se o email existe.
    const UserExists = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (UserExists) {
      throw new Error("Usuário já existe");
    }

    // criar o usuário
    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user;
  }
}

export { CreateUsersService };
