import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import CustomizedList from './CustomList';


export default function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer variant="temporary" {...other}>
      <CustomizedList
        userType={1}
      >
      </CustomizedList>
    </Drawer>
  );
}