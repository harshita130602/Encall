import React, { useContext, useEffect, useRef, useParams } from 'react';
import { SocketContext } from '../../SocketContext';
import './Join.css';
import homeIcon from '../../assets/video-call.png';
import { message } from 'antd';
import Spinner from '../../common/Spinner';
import Navbar from '../Navbar/Navbar';

// Setting consts for Joining
const Join = (props) => {
  const {
    callAccepted,
    name,
    setName,
    stream,
    setStream,
    callUser,
    meetingCode,
    setMeetingCode,
    newMeet,
  } = useContext(SocketContext);

  // Here we are using reference
  const myPreviewVideo = useRef();

  // It handles the scenario when there is no new meet & no meeting code
  useEffect(() => {
    if (!newMeet && meetingCode.length === 0) {
      props.history.push('/');
      window.location.reload();
      return;
    }
    // if (stream) return;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        res.getAudioTracks()[0].enabled = false;
        setStream(res);
        myPreviewVideo.current.srcObject = res;
      });
  }, []);

  // If call gets accepted we will take the user to the new meet
  useEffect(() => {
    if (callAccepted) props.history.push('meet');
  }, [callAccepted]);

  return (
    <>
    {/* Here, first we are returning NavBar*/}
      <Navbar />
      <div className='join-page'>                       {/* HTML for our Join page */}
        <div>
          <div className='video-div'>
            {stream ? (
              <video
                width='250'
                height='140'
                src=''
                ref={myPreviewVideo}
                autoPlay
                muted
              ></video>
            ) : (
              <Spinner />
            )}
          </div>
          {stream && (
            <>
              <input
                type='text'
                placeholder='Enter your name'                 /* User will give info like Name and will start the meet */
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className='join-btns-div'>                 {/* Button for starting the new meet */}
                {newMeet ? (
                  <button
                    className='btn'
                    onClick={() => {
                      if (name.trim().length === 0) {
                        message.error('Please enter your name');
                        return;
                      }
                      props.history.push('meet');
                    }}
                  >
                    Start
                  </button>
                ) : (
                  <button                                       /* Button for the user who wants to join an existing meet. It will require meeting code */
                    className='btn'
                    onClick={() => {
                      if (name.trim().length === 0) {
                        message.error('Please enter your name');
                        return;
                      }

                      callUser(meetingCode);
                    }}
                  >
                    Join now
                  </button>
                )}
                <button                                         /* Cancel button which will be used in both cases: 1. Start new meet; 2. Join an existing meet */
                  className='btn'
                  onClick={() => {
                    setMeetingCode('');
                    props.history.push('/');
                    window.location.reload();
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Join;
