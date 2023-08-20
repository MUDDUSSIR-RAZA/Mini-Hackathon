import { updateUserPic } from "@/services/blogs";
import { message } from "antd";

export default async function handler(req, res) {
  const { updatePic, email } = req.body;
  if (req.method === "POST") {
    try {
      updateUserPic(updatePic, email);
      return res.status(200).send();
    } catch (err) {
      return res.status(400).send(err);
    }
  } else {
    return res.status(404).send();
  }
}
