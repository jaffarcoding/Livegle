import React from 'react'
import logo from "../../assets/c.png";
import {Link} from "react-router-dom";
import { useState } from 'react';


import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


let user;
const senduser =()=>{
    user =document.getElementById('joininput').value;
    document.getElementById('joininput').value="";
}
const Join = () => {
    const [name, setName] =useState("");

    const prints =((e) =>{
        
        setName(e.target.value);
     });
     const whenclick =((event) =>{
        if(!name){
            event.preventDefault();
            toast("YOU NOT FILL THE NAME");
        }else if(name.length>6){
            toast("Name Must BE LessThen 6 Letters");
            event.preventDefault();
        }
        else{
            return null;
            
        }
     })
    
  return (
    <div className='joinpage'>
        <div className='joincontainer'>
            <img src={logo} alt="" />
            <h1>Live Chat</h1>
            <input onChange={prints} value={name} type="text" id='joininput' placeholder='Enter Your Name'/>
            <Link  onClick={whenclick} to='/chat' ><button className='joinbtn' onClick={senduser}>Login</button></Link>
            <ToastContainer />
        </div>
    </div>
  )
}

export default Join
export {user};