import { Chip } from "@material-ui/core";
import { TagFaces as TagFacesIcon } from "@material-ui/icons";
import React from "react";

export default {
  name: "Chip",
  type: "inline",
  icon: TagFacesIcon,
  component: React.forwardRef((props: any, ref) => {
    return <Chip ref={ref} {...props} />;
  }),
  options: [
    {
      name: "label",
      type: "string",
      defaultValue: "label",
    },
  ],
};
