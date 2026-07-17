"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import SelectAddress from './SelectAddress';

export default function AddressDrawer({ drawerStatus, setDrawerStatus }) {
  
  const toggleDrawer = (newOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerStatus(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
      <div style={{ padding: '20px' }}>
     <SelectAddress />
        
        
      </div>
    </Box>
  );

  return (
    <div>
      <Drawer 
        anchor="right" 
        open={drawerStatus} 
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}