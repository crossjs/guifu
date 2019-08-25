import {
  Button,
  Chip,
  IconButton,
  Paper,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Add, Remove } from "@material-ui/icons";
import { useSharedState } from "@spax/hooks";
import logo from "images/logo.png";
import React, { useEffect, useState } from "react";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
  XYCoord,
} from "react-dnd";
import { useWindowSize } from "./hooks/useWindowSize";

interface DragItem {
  type: string;
  meta: any;
  left: number;
  top: number;
}

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
      zIndex: 0,
      width: ({ width }) => width,
      height: ({ height }) => height,
      transform: ({ left, top }: any) =>
        `translate(${left}px,${top}px)`,
      transition: "transform 0.3s ease",
    },
    workBenchViewport: {
      position: "absolute",
      zIndex: 0,
      width: ({ width }) => width,
      height: ({ height }) => height,
      background: `url(${logo}) no-repeat center center`,
      transform: ({ scale }: any) =>
        `scale(${scale},${scale})`,
      transition: "transform 0.3s ease",
    },
  }),
);

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
    drop(item: DragItem, monitor: DropTargetMonitor) {
      const delta: XYCoord = monitor.getDifferenceFromInitialOffset();
      setLeft(Math.max(0, Math.min(windowWidth - width, Math.round(item.left + delta.x))));
      setTop(Math.max(0, Math.min(windowHeight - height, Math.round(item.top + delta.y))));
    },
  });

  const [{ isHover, canDrop }, componentDrop] = useDrop({
    accept: "component",
    drop(item: DragItem, monitor: DropTargetMonitor) {
      setBlocks([...blocks, item.meta]);
    },
    collect: (monitor: DropTargetMonitor) => ({
			isHover: monitor.isOver(),
			canDrop: monitor.canDrop(),
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
      <div ref={drop}
        className={classes.workBench}
        onClick={() => setActiveComponent(null)}>
        <div ref={drag}
          className={classes.workBenchDragger}
          onClick={(e) => e.stopPropagation()}>
          <Paper ref={componentDrop} className={classes.workBenchViewport} style={{
            opacity: isDragging ? 0.3 : 1,
          }}>
            {width} × {height}
            {canDrop && "dropping here"}
            {isHover && "im so hovered"}
            {blocks.map(({ name, component: C, options = [] }, index) => {
              const props = options.reduce((o: any, { name: propName, defaultValue }: any) => {
                return Object.assign(o, {
                  [propName]: defaultValue,
                });
              }, {});
              return (
                <span
                  key={`${name}&${index}`}
                  onClick={() => setActiveComponent({ name })}>
                  <C {...props} />
                </span>
              );
            })}
          </Paper>
        </div>
      </div>
      <div>
        <IconButton onClick={() => setScaleLevel(-1)} aria-label="zoom out">
          <Remove />
        </IconButton>
        <Chip label={`${scale * 100}%`} onClick={() => setScaleLevel(0)} />
        <IconButton onClick={() => setScaleLevel(1)} aria-label="zoom in">
          <Add />
        </IconButton>
      </div>
    </>
  );
};
