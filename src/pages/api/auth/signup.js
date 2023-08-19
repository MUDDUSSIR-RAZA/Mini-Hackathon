import { getByEmail, save } from "@/services/users";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(404).send();
    }
    const { firstName , lastName , email, password } = req.body;

    const found = getByEmail(email);
    if (found) {
        res.status(400).json({message: "User Already exist."});
    }
    else {
        save(firstName , lastName , email, password);
        res.status(201).send();
    } 

}
  