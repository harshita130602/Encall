// This component is to render notes

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { message } from 'antd';
import { SocketContext } from '../../SocketContext';
import EventNoteIcon from '@material-ui/icons/EventNote';
import './Notes.css';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import Menu from '@material-ui/core/Menu';
import { jsPDF } from 'jspdf';

// consts
const Notes = () => {
  const { notes, setNotes } = useContext(SocketContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileView, setMobileView] = useState(false);

  // resizing as per mobile view
  const resize = () => {
    setMobileView(window.innerWidth <= 600);
  };

  // calling resize function when needed
  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
  }, []);

  // Function to handle click event
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle close event
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to enable downloading of notes as pdf
  const downLoadAsPdf = () => {
    if (notes.trim().length == 0) {
      message.error('Please write some text to download');        // If notes is empty
      return;
    }
    const pdfDoc = new jsPDF();
    pdfDoc.text(notes, 10, 10);
    message.success('Your notes is downloading');               // Downloading
    pdfDoc.save('meet notes.pdf');
  };

  return (
    // HTML 
    <>
      {!mobileView && (
        <button className='tooltip' type='primary' onClick={handleClick}>            {/*HTML for opening notes when click function triggers */}
          <EventNoteIcon />
          <span className='tooltiptext'>Notes</span>
        </button>
      )}
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className='notes'>
          <div className='btn-div'>
            <div>
              <h3>Notes</h3>
            </div>
            <div className='flex-btns-div'>
              <button type='primary' onClick={downLoadAsPdf}>                 {/*HTML for pdf download */}
                <GetAppIcon />
              </button>
              <button type='primary' onClick={handleClose}>                    {/*HTML for closing the notes */}
                <CloseIcon />
              </button>
            </div>
          </div>

          <textarea
            type='text'
            placeholder='You can take your notes here'                         /*HTML for the notes */
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />
        </div>
      </Menu>
    </>
  );
};

export default Notes;
