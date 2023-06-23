import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { CartView } from './CartView';


interface DrawerProps {
    closeCart: (value: boolean) => void;
    cartStatus: boolean;
  }

export default function TemporaryDrawer({closeCart, cartStatus}:DrawerProps) {

  const list = () => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
    >
        <h4 
        style={{paddingLeft:16, color: "#888484"}}>
            Cart
        </h4>
      <Divider />
      <CartView/>
    </Box>
  );

  return (
    <div>
        <React.Fragment >
          <Drawer
            variant='temporary'
            anchor={'right'}
            open={cartStatus}
            onClose={()=>closeCart(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}