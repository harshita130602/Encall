import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../SocketContext';
import Editor from '../Editor/Editor';
import Options from '../Options/Options';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import './Meet.css';
import homeIcon1 from '../../assets/video-call.png';
import noteIcon from '../../assets/note2.png';
import Spinner from '../../common/Spinner';
import Navbar from '../Navbar/Navbar';
import saveAs from 'file-saver';
import { pdfExporter } from 'quill-to-pdf';
import { message } from 'antd';
import GetAppIcon from '@material-ui/icons/GetApp';

// Consts 
const Meet = (props) => {
  const {
    me,
    call,
    callAccepted,
    callEnded,
    name,
    myVideo,
    userVideo,
    stream,
    setStream,
    myVideoStatus,
    myMicStatus,
    userVideoStatus,
    userMicStatus,
    showEditor,
    otherUserStream,
    otherUser,
    otherUserName,
    quill,
    setQuill,
  } = useContext(SocketContext);

  // Setting mobile view's state as false and loading state as true
  const [mobileView, setMobileView] = useState(false);
  const [loading, setLoading] = useState(true);

  // Resizing window with resize() function
  const resize = () => {
    setMobileView(window.innerWidth <= 600);
  };

  // Calling resize function()
  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
  }, []);

  // Calling Loading and time out function
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  // If we get stream then we will start stream for the screen
  useEffect(() => {
    if (loading) return;
    if (stream) {
      myVideo.current.srcObject = stream;
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })         // getting user video and audio
      .then((res) => {
        res.getAudioTracks()[0].enabled = false;
        setStream(res);
        myVideo.current.srcObject = res;
      });
  }, [loading]);

  useEffect(() => {
    if (myVideo.current) myVideo.current.srcObject = stream;
  }, [myVideoStatus]);

  useEffect(() => {
    if (userVideo.current) userVideo.current.srcObject = otherUserStream;
  }, [otherUserStream, userVideoStatus, loading]);

  // Function that enables downloading of
  const downloadPdf = async () => {
    const delta = quill.getContents();
    const pdfAsBlob = await pdfExporter.generatePdf(delta);
    message.success('Downloading your whiteboard');
    saveAs(pdfAsBlob, `Merge-whiteboard.pdf`);
  };

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        <Spinner starting />
      </div>
    );
  }
  return (
    <div className={showEditor ? 'flex-div' : 'flex-div hide-editor'}>
      <div className='left'>
        <Navbar />
        <div className='video-div'>
          {' '}
          <div
            className={callAccepted ? 'video-frames ' : 'video-frames v-size'}
          >
            <div className='video-frame'>
              {stream ? (
                <>
                  {myMicStatus ? <MicIcon /> : <MicOffIcon />}                  {/* Mic on/off */}
                  {myVideoStatus ? (
                    <video
                      width='250'
                      height='140'
                      className='video-ref'
                      src=''
                      ref={myVideo}
                      autoPlay
                      muted
                    ></video>
                  ) : (
                    <div className='video-ref img-bg'>
                      <img src={homeIcon1} />
                    </div>
                  )}
                  <div className='name'>{name} (you)</div>
                </>
              ) : (
                <Spinner />
              )}
            </div>

            {callAccepted && (
              <div className='video-frame'>
                {userMicStatus ? <MicIcon /> : <MicOffIcon />}                {/*Mic on/off */}
                {userVideoStatus ? (
                  <video
                    width='250'
                    height='140'
                    src=''
                    className='video-ref'
                    ref={userVideo}
                    autoPlay
                    // muted
                  ></video>
                ) : (
                  <div className='video-ref img-bg'>
                    <img src={homeIcon1} />
                  </div>
                )}
                <div className='name'>{otherUserName}</div>
              </div>
            )}
          </div>
        </div>
        <div className='bar'>
          <Options history={props.history} />
        </div>
      </div>
      {!mobileView && showEditor && (                                   // Editor
        <div className='right'>
          <div className='editor-div'>
            <div className='head'>
              <div className='head-title'>
                <img src={noteIcon} alt='' />
                <h3>Whiteboard</h3>
              </div>
              <button
                className='download'
                onClick={() => downloadPdf()}                     // invoking downloadpdf() function on click
                title='Download whiteboard'
              >
                <GetAppIcon />
              </button>
            </div>
            <Editor />
          </div>
        </div>
      )}
    </div>
  );
};

export default Meet;