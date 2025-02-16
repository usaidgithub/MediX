import { Router } from "express";
import Users from "../models/Users.js";
import Chat from "../models/Chat.js";
import { createUser, getUserByEmail } from "../utils/Users.js";
import { verifyToken , generateToken} from "../utils/jwt.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Chat");
});

router.post("/signup", async (req, res) => {
    try {
      const { email, password ,age,gender,medicalHistory} = req.body;
  
      // Find if the user already exists
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
  

      // Create a new user
      const newUser = await createUser(email, password,age,gender,medicalHistory);
      const token = await generateToken(newUser);
      res.status(201).json({ message: "User created successfully", user: newUser ,accessToken: token,success: true});
  
    } catch (error) {
      console.error("Error during signup:", error.message);
      res.status(500).json({ message: "Internal server error" ,success: false});
    }
  });
  

router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    Users.findOne({ email }).then(async(user) => {   
        if (user) {
            if (user.password === password) {

                const token = await generateToken(user);
                res.status(200).json({ message: "User logged in successfully", user: user ,success: true, accessToken: token});
            } else {
                res.json({ message: "Invalid credentials" ,success: false});
            }
        } else {
            res.json({ message: "User not found" ,success: false});    

        }
    })
})
router.post("/chat-history", async(req, res) => {
    const { token } = req.body;
    console.log(token);
    const validToken = await verifyToken(token);
    console.log(validToken);
    const userId = validToken.id

    const chats = await Chat.find({ userId: userId })
    .sort({ createdAt: -1 }) // Sorting in descending order (newest first)
    .then((chats) => {
        res.json(chats);
    })
})
export default router;