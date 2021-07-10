// This component is to render the navigation bar at the top 

import React from 'react';
import homeIcon from '../../assets/video-call.png';
import { APP_NAME} from '../../constants';
import './Navbar.css';
import StarIcon from '@material-ui/icons/Star'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='title-div'>
        <img src={homeIcon} alt='' />
        <h3>{APP_NAME}</h3>                                  {/*This will return name of the name at the left-most corner of the NavBar at the top */}
      </div>
      <a className='repo'>
        <StarIcon className='rotate' />
        <div className='repo-text'>
          <p className='github-name'>Welcome</p>             {/*Using star icon and printing WELCOME at the rightmost corner of the NavBar */}

        </div>
      </a>
    </div>
  );
};

export default Navbar;