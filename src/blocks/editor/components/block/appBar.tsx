import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { WebAsset as WebAssetIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useBlocks } from "../../hooks/useBlocks";
import { DragItem } from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: "relative",
      minHeight: 30,
      "&::before": {
        content: ({ canDrop, isHoverCurrent }: any) => {
          return (canDrop || isHoverCurrent) ? "\" \"" : "";
        },
        backgroundColor: ({ canDrop, isHoverCurrent }: any) => {
          return canDrop ? (isHoverCurrent ? "green" : "lime") : "transparent";
        },
        boxShadow: "0 0 1px gray inset",
        position: "absolute",
        width: "100%",
        height: "100%",
      },
    },
  }),
);

export default {
  name: "AppBar",
  type: "block",
  icon: WebAssetIcon,
  component: React.forwardRef(function ComponentAppBar(
    { children, toolbarProps, ...props }: any,
    ref,
  ) {
    const [blocks, setBlocks] = useState([]);
    const [{ canDrop, isHoverCurrent }, componentDrop] = useDrop({
      accept: "navAction",
      canDrop: () => blocks.length < 5,
      // canDrop: (item: DragItem, monitor: DropTargetMonitor) => {
      //   console.log(item, monitor);
      //   return false;
      // },
      drop: (item: DragItem, monitor: DropTargetMonitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        setBlocks([...blocks, item.meta]);
      },
      collect: (monitor: DropTargetMonitor) => ({
        canDrop: blocks.length < 5 && monitor.canDrop(),
        isHoverCurrent: monitor.isOver({ shallow: true }),
      }),
    });
    const classes = useStyles({ canDrop, isHoverCurrent });

    return (
      <div ref={componentDrop} className={classes.wrapper}>
        <AppBar ref={ref} {...props}>
          <Toolbar {...toolbarProps}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <WebAssetIcon />
            </IconButton>
            <Typography variant="h6">News</Typography>
            <Button color="inherit">Login</Button>
            {useBlocks(blocks)}
          </Toolbar>
        </AppBar>
      </div>
    );
  }),
  options: [
    {
      name: "position",
      type: "string",
      defaultValue: "static",
      enum: ["static", "fixed", "absolute", "sticky", "relative"],
    },
  ],
};
