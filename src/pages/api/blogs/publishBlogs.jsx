import { publishBlog, userBlogs } from "@/services/blogs";

export default async function handler(req, res) {
  const { title, description, dateTime, email } = req.body;
  console.log(title, description, dateTime, email);
  console.log(req.method, "method");
  if (req.method === "POST") {
    publishBlog(title, description, dateTime, email);
    return res.status(200).send();
  } else {
    return res.status(404).send()
  }
}
