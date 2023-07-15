import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import {  Popover, styled } from "@mui/material";

import { useState, Fragment } from "react";
import { PriceSlider } from "./PriceSlider";

const TreeItemCostumize = styled(TreeItem)(({theme}) => ({
    '& .MuiTreeItem-content': {
        backgroundColor: "#ebf8f8",
    },
    '& .MuiTreeItem-label' : {
        color: '#888484',
        fontWeight:600
    },
    '& .MuiCollapse-root' : {
        marginRight:"17px"
    }
}));



export const Sort:React.FC = () => {

  //----------"pop-up settings":

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


  return (
    <Fragment>
      <a aria-describedby={id} onClick={handleClick}>
        Sort
      </a>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{
            height: 240,
            flexGrow: 1,
            maxWidth: 400,
            width: 380,
            overflowY: "auto",
            overflowX: "inherit",
          }}>
          <TreeItemCostumize
            nodeId="1"
            label="Price"
            >
            <PriceSlider/>
          </TreeItemCostumize>
        </TreeView>
      </Popover>
    </Fragment>
  );
};
