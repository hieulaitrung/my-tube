import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import React from 'react';
import ListItemLink from './ListItemLink';

const NavItems = (props) => {
  const showText = props.showText;
  return (
    <div>
     <ListItemLink to="/" primary="Home" icon={<HomeIcon />} showText={showText} />
     <ListItemLink to="/" primary="Trending" icon={<WhatshotIcon />} showText={showText} />
     <ListItemLink to="/private" primary="Library" icon={<VideoLibraryIcon />} showText={showText}  />
    </div>
  )
};

export default NavItems