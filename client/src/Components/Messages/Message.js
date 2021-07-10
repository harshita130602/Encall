import React, { useContext } from 'react';
import { SocketContext } from '../../SocketContext';
import './Messages.css';

// Const for a message
const Message = (props) => {
  const { me } = useContext(SocketContext);
  
  // The below code snippet is used to determine the user who is sending the message and showing it at the side of the respective user who sent it
  return (
    <div
      className={props.message.user == me ? 'message-div tr' : 'message-div tl'}                      
    >
      <div className={props.message.user == me ? 'message' : 'message bg-dark'}> {props.message.text}</div>
    </div>
  );
};

export default Message;
