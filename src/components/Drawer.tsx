import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

import { CartView } from "./CartView";
import { SearchView } from "./SearchView";

interface DrawerProps {
  closeCart: (value: boolean) => void;
  cartStatus: boolean;
  chidren:string;
}

export default function TemporaryDrawer({
  closeCart,
  cartStatus,
  chidren,
}: DrawerProps) {

  const listCart = () => (
    <Box sx={{ width: 400 }}  role="presentation">
      <Divider />
      {
        chidren === "cart" &&
        <CartView onClose={closeCart} />
      }
      {
       chidren === "search" &&
       <SearchView onClose={closeCart}/>
      }
    </Box>
  );

  return (
      <Drawer
        variant="temporary"
        anchor={"right"}
        open={cartStatus}
        onClose={() => closeCart(false)}>
        {listCart()}
      </Drawer>
  );
}
