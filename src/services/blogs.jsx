import fs from "fs";
import path from "path";
import { getAll } from "./users";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function publishBlog(title, description, dateTime , email) {
  const users = getAll();

  const userData = users.find((user) => {
    return user.email === email;
  });

  const newBlog = {
    title,
    description,
    dateTime,
  };

  userData.blogs.push(newBlog);

  try {
    fs.writeFileSync(filePath, JSON.stringify(users));
    alert("Blog published successfully.");
  } catch (error) {
    console.error("Failed to publish blog:", error);
  }
}

export function userBlogs(email) {
  const users = getAll();
  const userData = users.find((user) => {
    return user.email === email;
  });
  return userData.blogs;
}
