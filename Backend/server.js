const express = require('express')
require('dotenv').config();
const { connection } = require("./config/db");
const { userRoute } = require('./routes/user.route');
const jwt = require('jsonwebtoken')
const cors = require('cors');
const { taskRoute } = require('./routes/task.route');
const socketIo = require('socket.io');
const chatRoutes = require('./routes/chat.route');
const { Message } = require("./models/Message.model")
const http = require('http')



const app = express()
app.use(cors({
    origin:"*"
}))
app.use(express.json());
const secretKey = process.env.secretKey || "abcdef"
app.use('/user', userRoute)
app.use('/chat', chatRoutes);
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*', // set to your frontend URL in production
    }
});
  

// Real-time Socket.IO connection
io.on('connection', (socket) => {
    console.log('User connected');
  
    socket.on('send_message', async (data) => {
      const { sender, receiver, content } = data;
  
      // Save to database
      const message = new Message({ sender, receiver, content });
      await message.save();
  
      // Emit to receiver
      io.emit('receive_message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });




// custom middleware for authentication
const authenticationJwt = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, messge: 'UnAuthorized' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ success: false, messge: "Forbidden" ,err});
        req.user = user;
        next();
    })
    
}

app.use('/task',authenticationJwt,taskRoute)


const port  = process.env.PORT  || 8080
app.listen(port, async() => {
    try {
        await connection;
        console.log(`server successfully running on port ${port}`)
    } catch (err) {
        console.log("sorry something went wrong",err)
    }
})