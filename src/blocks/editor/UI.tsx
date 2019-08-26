import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { ReactNode } from "react";
import { DrawerLeft } from "./components/DrawerLeft";
import { DrawerRight } from "./components/DrawerRight";
import { WorkBench } from "./components/WorkBench";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editor: {
    },
  }),
);

export default function UI(props: any): ReactNode {
  const classes = useStyles({});

  return (
    <div className={classes.editor}>
      <WorkBench />
      <DrawerLeft />
      <DrawerRight />
    </div>
  );
}
