import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
interface AuthProps {
  email: string;
  password: string;
}

class AuthUsersService {
  async handle({ email, password }: AuthProps) {
    // console.log(email);

    // verificar se o email existe.
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email não encontrado!");
    }
    // verificar a senha no BD
    const passwordHash = await compare(password, user.password);
    if (!passwordHash) {
      throw new Error("Senha incorreta!");
    }

    // tokken
    const tokken = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "24h",
      }
    );

    return {
      id: user.id,
      nome: user.name,
      email: user.email,
      tokken: tokken,
    };
  }
}

export { AuthUsersService };
