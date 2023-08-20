import fs from "fs";
import path from "path";
import { getAll, getByEmail } from "./users";

import { v4 as uuidv4 } from "uuid";

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
      id:uuidv4(),
    };

    userData.blogs.push(newBlog);

    fs.writeFileSync(filePath, JSON.stringify(users));
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



export function updateUserPic(updatePic, email) {
  try {
    const users = getAll();
    const user = getByEmail(email);

    if (user) {
      user.picture = updatePic;

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
    console.error("Failed to change profile picture:", error);
    throw new Error("Failed to change profile picture. Please try again and refresh the page.");
  }
}


export function deleteBlog(email, id) {
  try {
    const users = getAll();
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
      const user = users[userIndex];
      const blogIndex = user.blogs.findIndex(blog => blog.id === id);

      if (blogIndex !== -1) {
        user.blogs.splice(blogIndex, 1); 
        fs.writeFileSync(filePath, JSON.stringify(users));
        console.log("Blog post deleted successfully.");
      } else {
        throw new Error("Blog post not found.");
      }
    } else {
      throw new Error("User not found. Please refresh the page.");
    }
  } catch (error) {
    throw new Error("Failed to delete blog post: " + error.message);
  }
}