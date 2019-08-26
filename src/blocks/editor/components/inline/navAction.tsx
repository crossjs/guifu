import { BottomNavigationAction } from "@material-ui/core";
import { Lens as LensIcon } from "@material-ui/icons";
import React from "react";

export default {
  name: "NavAction",
  type: "navAction",
  icon: LensIcon,
  component: React.forwardRef((props: any, ref) => {
    return <BottomNavigationAction ref={ref} {...props} />;
  }),
  options: [
    {
      name: "label",
      type: "string",
      defaultValue: "label",
    },
    {
      name: "icon",
      type: "component",
      defaultValue: <LensIcon />,
    },
  ],
};
