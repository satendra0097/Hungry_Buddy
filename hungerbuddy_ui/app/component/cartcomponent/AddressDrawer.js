"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SelectAddress from './SelectAddress';

export default function AddressDrawer({ drawerStatus, setDrawerStatus, setActiveAdd }) {

  const toggleDrawer = (newOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerStatus(newOpen);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={drawerStatus}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width: 400 }} role="presentation">
          <div style={{ padding: '20px' }}>
            <SelectAddress setActiveAdd={(addr) => {
              setActiveAdd(addr);
              setDrawerStatus(false);
            }} />
          </div>
        </Box>
      </Drawer>
    </div>
  );
}
