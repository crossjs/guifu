import { BottomNavigation } from "@material-ui/core";
import { CallToAction as CallToActionIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useBlocks } from "../../hooks/useBlocks";
import { DragItem } from "../../types";

export default {
  name: "Nav",
  type: "block",
  icon: CallToActionIcon,
  component: React.forwardRef(function ComponentNav(
    { children, ...props }: any,
    ref,
  ) {
    const [value, setValue] = useState(0);
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

    return (
      <div
        ref={componentDrop}
        style={{
          minHeight: 30,
          boxShadow: "0 0 1px gray inset",
          backgroundColor: canDrop
            ? isHoverCurrent
              ? "green"
              : "lime"
            : "white",
        }}
      >
        <BottomNavigation
          ref={ref}
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
          {...props}
        >
          {useBlocks(blocks)}
        </BottomNavigation>
      </div>
    );
  }),
  options: [
    {
      name: "showLabels",
      type: "boolean",
      defaultValue: true,
    },
  ],
};
