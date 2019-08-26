import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

export const Draggable: React.FC<any> = ({
  children,
  meta,
  ...props
}: any) => {
  const classes = useStyles({});
  const [{ isDragging }, drag] = useDrag({
    item: { meta, type: meta.type },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return React.cloneElement(children, {
    ref: drag,
    className: classes.root,
    style: { opacity: isDragging ? 0.3 : 1 },
    ...props,
  });
};
