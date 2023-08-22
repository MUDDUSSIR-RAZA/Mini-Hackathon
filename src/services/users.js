import fs from "fs";
import path from "path";
import { compare, hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function getAll() {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to get all data:", error);
    throw new Error("Failed to get all data. Please refresh the page.");
  }
}

export function getByEmail(email) {
  const data = getAll();
  return data.find((p) => p.email.toLowerCase() === email.toLowerCase());
}


export function getById(id) {
  const data = getAll();
  return data.find((p) => p.id === id);
}

export async function verifyPassword(hashedPassword, password) {
  try {
    const isValid = await compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    console.error("Failed to verify password:", error);
    throw new Error("Failed to verify password. Please refresh the page.");
  }
}

export async function save(firstName, lastName, email, password) {
  try {
    const data = getAll();
    const hashedPassword = await hash(password, 12);
    data.push({
      id: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      blogs: [],
      picture:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg",
    });
    fs.writeFileSync(filePath, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save data:", error);
    throw new Error("Failed to save data. Please refresh the page.");
  }
}

export function saveAll(users) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    console.log("Data saved successfully.");
  } catch (error) {
    console.error("Failed to save data:", error);
    throw new Error("Failed to save data. Please refresh the page.");
  }
}

export async function editPassword(
  hashedPassword,
  oldPassword,
  newPassword,
  email
) {
  try {
    const isValid = await compare(oldPassword, hashedPassword);
    const users = getAll();
    const user = getByEmail(email);
    console.log(isValid);
    console.log(oldPassword, hashedPassword);

    if (!isValid) {
      throw new Error(
        "Old password is not valid. Please ensure you've entered the correct old password and refresh the page."
      );
    }

    const newHashedPassword = await hash(newPassword, 12);
    user.password = newHashedPassword;

    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      throw new Error(
        "User not found in the users array. Please refresh the page."
      );
    }

    users[userIndex] = user;

    fs.writeFileSync(filePath, JSON.stringify(users));
  } catch (error) {
    throw new Error(error);
  }
}
