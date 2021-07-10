import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, message, notification } from 'antd';
import { SocketContext } from '../../SocketContext';
import Message from './Message';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { UserOutlined, MessageOutlined } from '@ant-design/icons';
import CloseIcon from '@material-ui/icons/Close';
import './Messages.css';

// consts
const Messages = () => {
  const {
    me,
    otherUser,
    socketState: socket,
    showChatBox,
    setShowChatBox,
    messages,
    setMessages,
    otherUserName,
  } = useContext(SocketContext);

  // Empty new message 
  const [newMessage, setNewMessage] = useState('');
  const msgRef = useRef();

  // Using the current state of message and enabling scroll with behavior: smooth
  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showChatBox]);

  // Setting up notification when some other user sends message in chatbox
  useEffect(() => {
    socket.on('recieve-message', (data) => {
      setMessages((messages) => [...messages, data]);
        notification.open({
          message: `New Message`,
          description: data.text,
          icon: <MessageOutlined style={{ color: '#108ee9' }} />,
        });
    });
  }, []);

  // Send message 
  const sendMessage = () => {
    if (newMessage.trim().length <= 0) {
      message.error('Enter some message');          // Text that will appear at the place of entering message
      return;
    }

    let tempMessage = { text: newMessage.trim(), user: me };        // sending data to other user 
    socket.emit('send-message', {
      data: tempMessage,
      userToSend: otherUser,
    });
    setMessages((messages) => [...messages, tempMessage]);
    setNewMessage('');                                             // Again setting new message to empty
  };

  const handleClose = () => {
    setShowChatBox(!showChatBox);                                 // ChatBox
  };

  const handleKeypress = (e) => {                                 // Key to invoke senMessage() function is ENTER
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Dialog
      open={showChatBox}
      onClose={handleClose}                                     // Handling the scenario when user closes the chat dialog box
      aria-labelledby='draggable-dialog-title'
    >
      {/*HTML */}
      <DialogTitle>
        <div className='btn-div'>
          <h3>Chatbox</h3>
          <button type='primary' onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className='outer-div'>
          <div className='messages scrollbar'>                {/*Message scrollbar */}
            {messages.length > 0 ? (
              messages.map((item, i) => (
                <Message message={item} key={i} item={i} />
              ))
            ) : (
              <h3>No messages</h3>                            /* When there is no previous communication between users on video call then this will appear */
            )}
            <div ref={msgRef}></div>
          </div>
        </div>
        <div className='inputs'>
          {' '}
          <input
            type='text'
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            onKeyPress={handleKeypress}
            placeholder='Enter a message'                   /* New message sending */
          />
          <Button
            type='primary'
            onClick={() => {
              sendMessage();                               /* Invoking the sendMessage() function on clicking of this button */
            }}
          >
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Messages;
