import React, { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  dropZone: {
    height: 20,
    margin: "4px 0",
    borderRadius: 6,
    backgroundColor: "transparent",
    transition: "background-color 0.2s ease",
  },
  dropActive: {
    backgroundColor: "rgba(33, 150, 243, 0.2)",
  },
}));

export interface DropZoneProps {
  index: number;
  columnKey: string;
  dropRefs: React.MutableRefObject<Record<string, HTMLDivElement[]>>;
  activeDropZone: number | null;
}

export const DropZone: React.FC<DropZoneProps> = ({
  index,
  columnKey,
  dropRefs,
  activeDropZone,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const isActive = activeDropZone === index;

  useEffect(() => {
    if (!ref.current) return;

    // garante que o array existe
    if (!Array.isArray(dropRefs.current[columnKey])) {
      dropRefs.current[columnKey] = [];
    }
    // registra
    dropRefs.current[columnKey][index] = ref.current;

    return dropTargetForElements({
      element: ref.current,
      getData: () => ({
        dropTargetFor: columnKey,
        insertIndex: index,
      }),
    });
  }, [columnKey, index, dropRefs]);

  return (
    <div
      ref={ref}
      className={`${classes.dropZone} ${isActive ? classes.dropActive : ""}`}
    />
  );
};
