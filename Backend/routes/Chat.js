import { Router } from "express";
import { verifyToken } from "../utils/jwt.js";
import axios from "axios";
import Chat from "../models/Chat.js";

const router = Router();

router.post("/", async(req, res) => { 
    const {token,message} = req.body
    let {chatId} = req.body
    const validToken = await verifyToken(token)
    console.log(validToken)
    const userId = validToken.id
    const response = await axios.post(
        "http://127.0.0.1:8080/get",
        { msg: message },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );   
    
    const answer = response.data.answer;
    const chat = await Chat.findById(chatId)
    if(chat){
        chat.messages.push({role:"user",content:message})
        chat.messages.push({role:"bot",content:answer})
        await chat.save()
    }
    else{
        console.log(userId,message,answer)
        const newChat = new Chat({  
            userId: userId,
            messages: [{role:"user",content:message},{role:"bot",content:answer}]
        })
        console.log(newChat)

        chatId = newChat._id
        await newChat.save()
    }
    res.json({ answer ,chatId});
});



export default router;