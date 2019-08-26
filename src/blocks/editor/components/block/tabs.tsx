import { AppBar, Tabs } from "@material-ui/core";
import { Tab as TabIcon } from "@material-ui/icons";
import { DragItem } from "blocks/editor/types";
import React, { useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useBlocks } from "../../hooks/useBlocks";

export default {
  name: "Tabs",
  type: "block",
  icon: TabIcon,
  component: React.forwardRef(function ComponentTabs(
    { children, tabsProps, ...props }: any,
    ref,
  ) {
    const [value, setValue] = useState(0);
    const [blocks, setBlocks] = useState([]);
    const [{ canDrop, isHoverCurrent }, componentDrop] = useDrop({
      accept: "tab",
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
        <AppBar ref={ref} {...props}>
          <Tabs
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
            {...tabsProps}
          >
            {useBlocks(blocks)}
          </Tabs>
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
