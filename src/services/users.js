import fs from "fs";
import path from "path";
import { compare, hash } from "bcryptjs";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function getAll() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

export function getById(id) {
  const data = getAll();
  return data.find((p) => p.id === Number(id));
}

export function getByEmail(email) {
  const data = getAll();
  return data.find((p) => p.email.toLowerCase() === email.toLowerCase());
}

export async function verifyPassword(hashedPassword, password) {
  const isValid = await compare(password, hashedPassword);
  console.log(isValid);
  return isValid;
}

export async function save(firstName, lastName, email, password) {
  const data = getAll();
  const hashedPassword = await hash(password, 12);
  data.push({
    id: data.length + 1,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    blogs:[],
  });
  fs.writeFileSync(filePath, JSON.stringify(data));
}
