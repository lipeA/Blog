import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthnticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authTokken = req.headers.authorization;

  if (!authTokken) {
    return res.status(401).end();
  }

  const [, tokken] = authTokken.split(" ");

  try {
    const { sub } = verify(tokken, process.env.JWT_SECRET) as Payload;
    return next();
  } catch (err) {
    return res.status(401).end;
  }
  return next();
}
