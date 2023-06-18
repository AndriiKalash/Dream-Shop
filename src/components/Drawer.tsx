import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


interface DrawerProps {
    closeCart: (value: boolean) => void;
    cartStatus: boolean;
  }

export default function TemporaryDrawer({closeCart, cartStatus}:DrawerProps) {

  const list = () => (
    <Box
      sx={{ width: 450 }}
      role="presentation"
    >
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                 <MailIcon />
              </ListItemIcon>
              {/* img, title, -count+ , price */}
              <ListItemText primary={"Cart"} />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
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