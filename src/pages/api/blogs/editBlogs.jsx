import { changeUserName } from "@/services/blogs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nameChangeValue, email } = req.body;

    try {
      changeUserName(nameChangeValue, email);
      return res.status(200).json({ message: "Name changed successfully." });
    } catch (error) {
      console.error("Error changing name:", error);
      return res.status(500).json({ error: "Failed to change name." });
    }
  } else {
    return res.status(404).json({ error: "Not found." });
  }
}
