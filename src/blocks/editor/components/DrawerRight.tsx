import {
  Button,
  Divider,
  Drawer,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useSharedState } from "@spax/hooks";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerRight: {
      width: 250,
      position: "relative",
      zIndex: 2,
    },
  }),
);

export const DrawerRight: React.FC<any> = () => {
  const [activeComponent] = useSharedState("active-component", null);
  const [opened, setOpened] = useState(false);
  const classes = useStyles({});

  useEffect(() => {
    setOpened(Boolean(activeComponent));
  }, [activeComponent]);

  return (
    <>
      <Button onClick={() => setOpened(!opened)}>
        Toggle Right
      </Button>
      <Drawer
        variant="persistent"
        anchor="right"
        open={opened}
      >
        <div
          className={classes.drawerRight}
          role="presentation"
        >
          <Button onClick={() => setOpened(!opened)}>
            Toggle Right
          </Button>
          <Divider />
          activeComponent: {activeComponent && activeComponent.name}
        </div>
      </Drawer>
    </>
  );
};
