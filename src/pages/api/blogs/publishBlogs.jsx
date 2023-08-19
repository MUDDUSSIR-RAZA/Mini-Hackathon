import publishBlog from "@/services/blogs";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).send();
  }
  const { title, description, dateTime } = req.body;
  publishBlog(title, description, dateTime);
  res.status(201).send();
}
