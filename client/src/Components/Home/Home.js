// Importing relevant files
import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../SocketContext';
import './Home.css';
import Footer from '../Footer/Footer';
import homeVideo from '../../assets/homeVideo1.mp4';
import ChatIcon from '@material-ui/icons/Chat';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';
import DuoIcon from '@material-ui/icons/Duo';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import Navbar from '../Navbar/Navbar';

const Home = (props) => {

  // setting consts
  const paramsCode = props.location.search;
  const { meetingCode, setMeetingCode, setNewMeet } = useContext(SocketContext);

  useEffect(() => {
    if (paramsCode.length) {
      if (paramsCode.substring(0, 5) == '?ref=') return; // for product hunt ref
      setMeetingCode(paramsCode.substring(1));
    }

    // new meet has to be NULL in the beginning
    setNewMeet(null);
  }, []);       

// Required HTML for front-end
  return (
    <div className='home'>
      <Navbar />
      <div className='body-div'>
        <div className='flex-box'>
          <div className='left-div'>
            <div className='contents'>
              <div className='start-meet'>
                <Link
                  className='home-btn'
                  to='join'
                  onClick={() => {
                    setNewMeet(true);           // setting new meet on click of this button
                  }}
                >
                  Start Meeting
                </Link>
              </div>
              <div className='join-meet'>
                <input
                  type='text'
                  placeholder='Enter meeting code'
                  value={meetingCode || ''}
                  onChange={(e) => {
                    setMeetingCode(e.target.value);             // setting meeting code with this function
                  }}
                />
                <button                                           // button to join a call
                  className='home-btn'
                  onClick={() => {
                    if (!meetingCode || meetingCode.trim().length === 0) {            // throwing error if user tries to join meeting without entering the code
                      message.error('Please enter the meeting code');
                      return;
                    }
                    props.history.push('join');
                  }}
                >
                  Join Meeting
                </button>
              </div>


              {/* HTML for the different features defined on the home-page */}
              <div className='features'>
                <h1>Features</h1>
                <div className='grid-div'>
                  <DuoIcon />
                  <p>1:1 Video chat</p>
                </div>
                <div className='grid-div'>
                  <SurroundSoundIcon />
                  <p>Live Editor for interview</p>
                </div>
                <div className='grid-div'>
                  <EventNoteIcon />
                  <p>Notes</p>
                </div>
                <div className='grid-div'>
                  <ChatIcon />
                  <p>Real time Chat</p>
                </div>
              </div>
              {/*<img src={homeIcon1} alt='' className='chat-img' />*/}
              {/*<img src={noteIcon} alt='' className='note-img' />*/}       
            </div>
          </div>
          <div className='right-div'>
            <video
              src={homeVideo}
              id='video'
              alt='video'
              autoPlay
              muted
              loop
            ></video>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
