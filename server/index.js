const http =require("http");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const app = express();
const port=4500 || process.env.PORT;

const users=[{}];

app.use(cors());

const server =http.createServer(app);

const io= socketio(server);

io.on("connection", (socket) =>{
    console.log("new connection");

    socket.on('joined', ({user}) =>{
        users[socket.id]=user;
        console.log(user);
        socket.broadcast.emit('userJoined',{user:"admin", message:`${users[socket.id]}has joined`})
        socket.emit('welcome', {user:"Admin", message: `welcome to the chat, ${users[socket.id]}`});
    })

    socket.on('message',( {message, id})=>{
        
        io.emit('sendMessage', {user:users[id],message,id});
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"admin", message: `${users[socket.id]} user have left the chat`} )
        console.log('user discoonet');
    })
    
})
server.listen(port,()=>{
    console.log(`server is workin at http://localhost:${port}`);
})