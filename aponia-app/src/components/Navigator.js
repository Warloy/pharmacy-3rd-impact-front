import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import CustomizedList from './CustomList';

export default function Navigator(props) {
  const { ...other } = props;

  const type = localStorage.getItem('@user')?.type || null

  return (
    <Drawer variant="temporary" PaperProps={{ style: { width: 256 } }} {...other}>
      <CustomizedList/>
    </Drawer>
  );
}