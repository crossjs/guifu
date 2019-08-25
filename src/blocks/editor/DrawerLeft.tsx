import {
  Button,
  Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Extension, Face, TagFaces } from "@material-ui/icons";
import { useSharedState } from "@spax/hooks";
import React, { useEffect, useState } from "react";
import {
  DragSourceMonitor,
  useDrag,
} from "react-dnd";

interface DragItem {
  type: string;
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerLeft: {
      width: 250,
      position: "relative",
      zIndex: 1,
    },
  }),
);

const components = [
  {
    name: "Button",
    icon: Face,
    component: ({ children, label, ...props }) => <Button {...props}>{children || label}</Button>,
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
  },
  {
    name: "Chip",
    icon: TagFaces,
    component: ({ children = null, ...props }) => <Chip {...props} />,
    options: [
      {
        name: "label",
        type: "string",
        defaultValue: "label",
      },
    ],
  },
];

const Draggable: React.FC<any> = ({ meta }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { meta, type: "component" },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const { icon: Icon } = meta;
  return (
    <Button
      ref={drag}
      style={{opacity: isDragging ? 0.3 : 1}}><Icon />{meta.name}</Button>
  );
};

export const DrawerLeft: React.FC<any> = () => {
  const [activeComponent] = useSharedState("active-component", null);
  const [opened, setOpened] = useState(false);
  const classes = useStyles({});

  useEffect(() => {
    setOpened(!Boolean(activeComponent));
  }, [activeComponent]);

  return (
    <>
      <Button onClick={() => setOpened(!opened)}>
        Toggle Left
      </Button>
      <Drawer
        variant="persistent"
        anchor="left"
        open={opened}
      >
        <div
          className={classes.drawerLeft}
          role="presentation"
        >
          <Button onClick={() => setOpened(!opened)}>
            Toggle Left
          </Button>
          <List>
            <ListItem dense button key="component">
              <ListItemIcon>
                <Extension />
              </ListItemIcon>
              <ListItemText primary="组件" />
            </ListItem>
          </List>
          <Divider />
          {
            components.map((meta) => {
              return (
                <Draggable key={meta.name} meta={meta} />
              );
            })
          }
        </div>
      </Drawer>
    </>
  );
};
