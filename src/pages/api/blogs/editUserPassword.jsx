import { editPassword } from "@/services/users";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { hashedPassword, oldPassword, newPassword, email } = req.body;

    try {
      await editPassword(hashedPassword, oldPassword, newPassword, email);
      return res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
      console.error("Error changing Password:", error);
      return res.status(500).json({errorMessage: error.message });
    }
  } else {
    return res.status(404).json({ error: "Not found." });
  }
}