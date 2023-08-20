import { deleteBlog } from "@/services/blogs";

export default async function handler(req, res) {
  const { email, id } = req.body;
  console.log(email, id );
  if (req.method === "DELETE") {
    try {
      deleteBlog(email, id);
      return res.status(200).json({ message: "Item deleted successfully." });
    } catch (error) {
      console.error("Error deleting item:", error);
      return res.status(500).json({ error: "Failed to delete item." });
    }
  } else {
    return res.status(404).json({ error: "Not found." });
  }
}
