import { useSharedState } from "@spax/hooks";
import React from "react";
import { Draggable } from "../components/Draggable";

export const useBlocks = (blocks) => {
  const [, setActiveComponent] = useSharedState("active-component", null);
  return blocks.map((meta, index) => {
    const { name, component: C, options = [] } = meta;
    const defaultProps = options.reduce(
      (o: any, { name: propName, defaultValue }: any) => {
        return Object.assign(o, {
          [propName]: defaultValue,
        });
      },
      {},
    );
    return (
      <Draggable
        key={`${name}&${index}`}
        meta={meta}
        onClick={(e) => {
          e.stopPropagation();
          setActiveComponent(meta);
        }}
      >
        <C {...defaultProps} />
      </Draggable>
    );
  });
};
