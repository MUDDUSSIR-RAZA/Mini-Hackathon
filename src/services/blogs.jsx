import fs from "fs";
import path from "path";
import { getAll, getByEmail } from "./users";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function publishBlog(title, description, dateTime, email) {
  try {
    const users = getAll();

    const userData = users.find((user) => {
      return user.email === email;
    });

    if (!userData) {
      throw new Error("User not found. Please refresh the page.");
    }

    const newBlog = {
      title,
      description,
      dateTime,
    };

    userData.blogs.push(newBlog);

    fs.writeFileSync(filePath, JSON.stringify(users));
    alert("Blog published successfully.");
  } catch (error) {
    throw new Error("Failed to publish blog: " + error.message);
  }
}

export function userBlogs(email) {
  try {
    const users = getAll();
    const userData = users.find((user) => {
      return user.email === email;
    });

    if (userData) {
      return userData.blogs;
    } else {
      throw new Error("User not found. Please refresh the page.");
    }
  } catch (error) {
    throw new Error("Failed to get user blogs: " + error.message);
  }
}

export function changeUserName(nameChangeValue, email) {
  try {
    const users = getAll();
    const user = getByEmail(email);

    if (user) {
      user.firstName = nameChangeValue;

      const userIndex = users.findIndex(u => u.email === email);

      if (userIndex !== -1) {
        users[userIndex] = user;

        fs.writeFileSync(filePath, JSON.stringify(users));
      } else {
        throw new Error("User not found in the users array. Please refresh the page.");
      }
    } else {
      throw new Error("User not found. Please refresh the page.");
    }
  } catch (error) {
    throw new Error("Failed to change name: " + error.message);
  }
}