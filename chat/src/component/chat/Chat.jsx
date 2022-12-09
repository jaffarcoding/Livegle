import React, { useState,useEffect }  from 'react';
import {user} from "../join/Join"
import socketio from "socket.io-client";
import Message from "../message/Message";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import   ReactScrollToBottom from "react-scroll-to-bottom";



let socket;
const ENDPOINT ="http://localhost:4500/";
const Chat = () => {

     const [id,setId] = useState("");
     const [messagess, setMessagess] = useState([]);
    const send =() =>{
      
      const message = document.getElementById('chatInput').value;
      socket.emit('message',{message , id});
      document.getElementById('chatInput').value= " ";
    }
 
    useEffect(() =>{
       socket = socketio(ENDPOINT, { transports: ['websocket']});
        socket.on("connect", () =>{
            toast("LogIn Seccusfully");
            setId(socket.id);
           
        })
       
        socket.emit('joined',{user}); 

        socket.on('welcome', (data)=>{
          
          setMessagess([...messagess,data]);
          console.log(data.user, data.messagess);
        })
        socket.on('userJoined', (data) =>{
          
          setMessagess([...messagess,data]);
          console.log(data.user,data.message);
        })
        socket.on('leave',(data)=>{
         
          setMessagess([...messagess,data]);
           console.log(data.user,data.message);
        })
        return () =>{
          socket.disconnect();
          socket.off();
        }
    },[]);

    useEffect(()=>{
      socket.on('sendMessage', (data) =>{
        setMessagess([...messagess,data]);
        console.log(data.user,data.message,data.id);
      })
      return ()=>{
        socket.off();
      }
    },[messagess]);

    
  return (
    <div className='chatpage'>
        <div className='chatcontainer'>
            <div className="header">
              <h2>Livegle</h2>
              <a href="/">
                <h3>LogOut</h3>
              </a>
            </div>
            < ReactScrollToBottom className="chatbox">
              {
                messagess.map((item,i)=>
                  <Message user={item.id===id?'':item.user} key={i} message={item.message} 
                   classs={item.id===id? 'right': 'left' }
                  />
                )
              }
            </ ReactScrollToBottom>
            <div className="inputBox">
              <input  type="text" id='chatInput'/>
              <button onClick={send} className='sendbtn'>
                Send
              </button>
            </div>
        </div>
       
        <ToastContainer />
    </div>
  )
}

export default Chat