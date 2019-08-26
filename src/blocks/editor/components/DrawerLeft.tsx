import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Extension as ExtensionIcon } from "@material-ui/icons";
import { useSharedState } from "@spax/hooks";
import React, { useEffect, useState } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import * as blockComponents from "./block";
import * as inlineComponents from "./inline";

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    drawerLeft: {
      width: 250,
      position: "relative",
      zIndex: 1,
    },
  }),
);

export const DrawerLeft: React.FC<any> = () => {
  const [activeComponent] = useSharedState("active-component", null);
  const [opened, setOpened] = useState(false);
  const classes = useStyles({});

  useEffect(() => {
    setOpened(!Boolean(activeComponent));
  }, [activeComponent]);

  return (
    <>
      <Button onClick={() => setOpened(!opened)}>Toggle Left</Button>
      <Drawer variant="persistent" anchor="left" open={opened}>
        <div className={classes.drawerLeft} role="presentation">
          <Button onClick={() => setOpened(!opened)}>Toggle Left</Button>
          <List>
            <ListItem dense button key="component">
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText primary="组件" />
            </ListItem>
          </List>
          <Divider />
          {Object.values(blockComponents).map((meta, index) => {
            return <Draggable key={meta.name} meta={meta} />;
          })}
          <Divider />
          {Object.values(inlineComponents).map((meta) => {
            return <Draggable key={meta.name} meta={meta} />;
          })}
        </div>
      </Drawer>
    </>
  );
};

const Draggable: React.FC<any> = ({ meta }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { meta, type: meta.type },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const { icon: Icon } = meta;
  return (
    <Button ref={drag} style={{ opacity: isDragging ? 0.3 : 1 }}>
      <Icon />
      {meta.name}
    </Button>
  );
};
