import { IPO } from "@spax/core";
import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { useLayout } from "./hooks";

export const Layout: React.FC<{ option: IPO }> = ({children, option}: any) => {
  const UseLayout = useLayout();

  return (
    <UseLayout option={option}>
      <DndProvider backend={HTML5Backend}>
        {children}
      </DndProvider>
    </UseLayout>
  );
};
