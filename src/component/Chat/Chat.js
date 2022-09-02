import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import closeIcon from "../../images/closeIcon.png";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
const ENDPOINT = "https://demo-gdchat.herokuapp.com/";

let socket;

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setmessages] = useState([]);
  const send=()=>{
    const message=document.getElementById('chatInput').value;
    socket.emit('message',{message,id});
    document.getElementById('chatInput').value="";
  }
  console.log(messages);
  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("connected");
      setid(socket.id);
    });
    //console.log(socket);
    socket.on('Welcome',(data)=>{
      setmessages([...messages,data]);
      console.log(data.user,data.message);
    })
    socket.emit("joined", {user});

    socket.on('userJoined',(data)=>{
      setmessages([...messages,data]);
      console.log(data.user,data.message);
    })
    socket.on('leave',(data)=>{
      setmessages([...messages,data]);
      console.log(data.user,data.message);
    })
    return () => {
      socket.emit('end');
      socket.close();
    };
  }, []);
  useEffect(() => {
    socket.on('sendMessage',(data)=>{
      setmessages([...messages,data]);
      console.log(data.user,data.message,data.id);
    })
  
    return () => {
      socket.off();
    }
  }, [messages]);
  
  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>Chit Chat</h2>
          <a href="/"><img src={closeIcon} alt=""></img></a> 
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item,i)=>
              <Message user={item.id===id?'':item.user}classs={item.id===id?'right':'left' } message={item.message} key={i}/>
          )}
        </ReactScrollToBottom>
        <div className="InputBox">
          <input onKeyPress={(event)=>event.key==='Enter'?send():null} type="text" id="chatInput"></input>
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
