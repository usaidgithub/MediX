import { Router } from "express";
import { verifyToken } from "../utils/jwt.js";
import axios from "axios";
import Chat from "../models/Chat.js";

const router = Router();

router.post("/", async(req, res) => { 
    const {token,message} = req.body
    let {chatId} = req.body

    const validToken = await verifyToken(token)
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
    
    let answer = response.data.answer;
    if(answer ===""){
        answer = "No context available"
    }
    const chat = await Chat.findById(chatId)
    if(chat){
        chat.messages.push({role:"user",content:message})
        chat.messages.push({role:"bot",content:answer})
        await chat.save()
    }
    else{
    
        const newChat = new Chat({  
            userId: userId,
            messages: [{role:"user",content:message},{role:"bot",content:answer}]
        })

        chatId = newChat._id
        await newChat.save()
    }
    res.json({ answer ,chatId});
});



export default router;