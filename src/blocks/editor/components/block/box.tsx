import { Box } from "@material-ui/core";
import { CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useBlocks } from "../../hooks/useBlocks";
import { DragItem } from "../../types";

export default {
  name: "Box",
  type: "block",
  icon: CheckBoxOutlineBlankIcon,
  component: React.forwardRef(function ComponentBox(props: any, ref) {
    const [blocks, setBlocks] = useState([]);
    const [{ canDrop, isHoverCurrent }, componentDrop] = useDrop({
      accept: ["inline", "block"],
      canDrop: () => blocks.length === 0,
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
        canDrop: monitor.canDrop(),
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
        <Box ref={ref} {...props}>
          {useBlocks(blocks)}
        </Box>
      </div>
    );
  }),
  options: [
    {
      name: "margin",
      type: "number",
      defaultValue: 1,
    },
    {
      name: "padding",
      type: "number",
      defaultValue: 1,
    },
  ],
};
