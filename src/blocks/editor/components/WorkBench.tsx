import { Box, Chip, IconButton, NativeSelect, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Add, Remove } from "@material-ui/icons";
import { useSharedState } from "@spax/hooks";
import React, { useEffect, useState } from "react";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
  XYCoord,
} from "react-dnd";
import { useBlocks } from "../hooks/useBlocks";
import { useWindowSize } from "../hooks/useWindowSize";
import { DragItem } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    workBench: {
      position: "absolute",
      zIndex: 0,
      width: ({ windowWidth }) => windowWidth,
      height: ({ windowHeight }) => windowHeight,
    },
    workBenchDragger: {
      position: "absolute",
      width: ({ width }) => width,
      height: ({ height }) => height,
      transform: ({ left, top }: any) => `translate(${left}px,${top}px)`,
      transition: "transform 0.3s ease, width 0.3s ease, height 0.3s ease",
    },
    workBenchToolbar: {
      position: "absolute",
      top: -50,
      width: ({ width }) => width,
      transition: "width 0.3s ease",
    },
    workBenchViewport: {
      position: "absolute",
      width: ({ width }) => width,
      height: ({ height }) => height,
      transform: ({ scale }: any) => `scale(${scale},${scale})`,
      transition: "transform 0.3s ease, width 0.3s ease, height 0.3s ease",
    },
  }),
);

const deviceSizes = ["320×568", "360×640", "375×667", "375×812"];
const scaleLevels = [0.2, 0.4, 0.5, 0.75, 0.8, 1];

export const WorkBench: React.FC<any> = () => {
  const [, setActiveComponent] = useSharedState("active-component", null);
  const [windowWidth, windowHeight] = useWindowSize();
  const [width, setWidth] = useState(375);
  const [height, setHeight] = useState(667);
  const [scale, setScale] = useState(1);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const classes = useStyles({
    width,
    height,
    windowWidth,
    windowHeight,
    scale,
    left,
    top,
  });

  const [{ isDragging }, drag] = useDrag({
    item: { id: "viewport", left, top, type: "viewport" },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "viewport",
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const delta: XYCoord = monitor.getDifferenceFromInitialOffset();
      setLeft(
        Math.max(
          0,
          Math.min(windowWidth - width, Math.round(item.left + delta.x)),
        ),
      );
      setTop(
        Math.max(
          0,
          Math.min(windowHeight - height, Math.round(item.top + delta.y)),
        ),
      );
    },
  });

  const [{ canDrop, isHoverCurrent }, componentDrop] = useDrop({
    accept: "block",
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

  useEffect(() => {
    setLeft((windowWidth - width) / 2);
    setTop((windowHeight - height) / 2);
  }, [windowWidth, windowHeight, width, height]);

  function setScaleLevel(level: number) {
    if (!level) {
      // 100%
      setScale(1);
    } else {
      const currentIndex = scaleLevels.indexOf(scale) + level;
      setScale(
        scaleLevels[Math.max(0, Math.min(scaleLevels.length - 1, currentIndex))],
      );
    }
  }

  return (
    <>
      <div
        ref={drop}
        className={classes.workBench}
        onClick={() => setActiveComponent(null)}
      >
        <div
          ref={drag}
          className={classes.workBenchDragger}
          onClick={(e) => e.stopPropagation()}
        >
          <Box
            className={classes.workBenchToolbar}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <div>
              <NativeSelect
                value={`${width}×${height}`}
                onChange={(e) => {
                  const [w, h] = e.target.value.split("×");
                  setWidth(+w);
                  setHeight(+h);
                }}
              >
                {deviceSizes.map((value) => {
                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </NativeSelect>
            </div>
            <div>
              <IconButton
                onClick={() => setScaleLevel(-1)}
                aria-label="zoom out"
              >
                <Remove />
              </IconButton>
              <Chip
                label={`${scale * 100}%`}
                onClick={() => setScaleLevel(0)}
              />
              <IconButton onClick={() => setScaleLevel(1)} aria-label="zoom in">
                <Add />
              </IconButton>
            </div>
          </Box>
          <Paper
            ref={componentDrop}
            className={classes.workBenchViewport}
            style={{
              opacity: isDragging ? 0.3 : 1,
              backgroundColor: canDrop
                ? isHoverCurrent
                  ? "green"
                  : "lime"
                : "white",
            }}
          >
            {useBlocks(blocks)}
          </Paper>
        </div>
      </div>
    </>
  );
};
