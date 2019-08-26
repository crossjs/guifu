import { Button } from "@material-ui/core";
import { Face as FaceIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useBlocks } from "../../hooks/useBlocks";
import { DragItem } from "../../types";

export default {
  name: "Button",
  type: "inline",
  icon: FaceIcon,
  component: React.forwardRef(function ComponentButton(
    { children, label, ...props }: any,
    ref,
  ) {
    const [blocks, setBlocks] = useState([]);
    const [{ canDrop, isHoverCurrent }, componentDrop] = useDrop({
      accept: "inline",
      canDrop: (item: DragItem, monitor: DropTargetMonitor) => {
        console.log(item, monitor);
        return false;
      },
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
      <span
        ref={componentDrop}
        style={{
          backgroundColor: canDrop
            ? isHoverCurrent
              ? "green"
              : "lime"
            : "white",
        }}
      >
        <Button ref={ref} {...props}>
          {children || label}
          {useBlocks(blocks)}
        </Button>
      </span>
    );
  }),
  options: [
    {
      name: "size",
      type: "string",
      defaultValue: "medium",
      enum: ["small", "medium", "large"],
    },
    {
      name: "label",
      type: "string",
      defaultValue: "button",
    },
  ],
};
