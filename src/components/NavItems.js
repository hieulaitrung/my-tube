import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';
import ListItemLink from './ListItemLink';

export const mainListItems = (
  <div>
     <ListItemLink to="/" primary="Dashboard" icon={<DashboardIcon />} />
     <ListItemLink to="/private" primary="People" icon={<PeopleIcon />} />
  </div>
);