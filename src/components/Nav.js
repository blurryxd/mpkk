import React from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Home, AccountBox, PowerSettingsNew, MusicVideo, FolderOpen} from '@material-ui/icons';

const Nav = () => {
  return (
      <nav>
        <List>
          <ListItem button component={Link} to="/home">
            <ListItemIcon>
              <Home/>
            </ListItemIcon>
            <ListItemText primary='Home'/>
          </ListItem>
          <ListItem button component={Link} to="/my-files">
            <ListItemIcon>
              <FolderOpen/>
            </ListItemIcon>
            <ListItemText primary='My files'/>
          </ListItem>
          <ListItem button component={Link} to="/upload">
            <ListItemIcon>
              <MusicVideo/>
            </ListItemIcon>
            <ListItemText primary='Upload'/>
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <AccountBox/>
            </ListItemIcon>
            <ListItemText primary="Profile"/>
          </ListItem>
          <ListItem button component={Link} to="/logout">
            <ListItemIcon>
              <PowerSettingsNew/>
            </ListItemIcon>
            <ListItemText primary="Logout"/>
          </ListItem>
        </List>
      </nav>
  );
};

export default Nav;