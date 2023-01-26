import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import CustomizedList from './CustomList';


export default function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <CustomizedList
        userType={1}
      >
      </CustomizedList>
    </Drawer>
  );
}