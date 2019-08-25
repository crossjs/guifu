import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { ReactNode, useState } from "react";
import { DrawerLeft } from "./DrawerLeft";
import { DrawerRight } from "./DrawerRight";
import { WorkBench } from "./WorkBench";

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
