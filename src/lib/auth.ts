import argon2 from "argon2";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export async function hashPassword(password: string) {
  return argon2.hash(password);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
) {
  return argon2.verify(hashedPassword, password);
}

export async function createToken(payload: {
  id: number;
  email: string;
  role: string;
}) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);

  return payload as {
    id: number;
    email: string;
    role: string;
  };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}