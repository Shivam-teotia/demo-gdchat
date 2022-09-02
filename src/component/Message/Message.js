import React from 'react'
import "./Message.css";
const Message = ({user,message,classs}) => {
    if(user){
        return (
            <div className="messageBox">
                <div className={`messagecontent ${classs}`}>
                    {`${user}:${message}`};
                </div>
            </div>
          )
    }else{
        return (
            <div className='messageBox'>
                <div className={`messagecontent ${classs}`}>
                    {`You: ${message}`}
                </div>

            </div>
        )
    }
  
}

export default Message;