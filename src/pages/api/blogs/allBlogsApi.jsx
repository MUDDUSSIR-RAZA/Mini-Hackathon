import { getAll } from "@/services/users";

export default (req, res) => {
  try {
    const data = getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
};
