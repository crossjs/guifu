import { Tab } from "@material-ui/core";
import { Lens as LensIcon } from "@material-ui/icons";
import React from "react";

export default {
  name: "Tab",
  type: "tab",
  icon: LensIcon,
  component: React.forwardRef((props: any, ref) => {
    return <Tab ref={ref} {...props} />;
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
