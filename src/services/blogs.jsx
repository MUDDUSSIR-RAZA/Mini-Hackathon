import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "blogs.json");

export function existingBlogs() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export default function publishBlog(title, description, dateTime) {
  const existingData = existingBlogs();
  const newBlog = {
    title,
    description,
    dateTime,
  };

  existingData.push(newBlog);

  try {
    fs.writeFileSync(filePath, JSON.stringify(existingData));
    console.log("Blog published successfully.");
  } catch (error) {
    console.error("Failed to publish blog:", error);
  }
}
