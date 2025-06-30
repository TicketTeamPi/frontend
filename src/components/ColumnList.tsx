// src/components/ColumnList.tsx
import React, { useRef, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Column } from "./Column";
import type { Ticket } from "src/types/type";

const useStyles = makeStyles(() => ({
  columnContent: {
    flex: 1,
    overflowY: "auto",
    height: "100%",
    padding: 8,
    scrollbarWidth: "thin",
  },
}));

interface ColumnListProps {
  calls: Ticket[];
  columnKey: string;
  onTicketDrop: (
    ticketId: string,
    fromColumnId: string,
    toColumnId: string,
    toIndex: number
  ) => void;
}

export const ColumnList: React.FC<ColumnListProps> = ({
  calls,
  columnKey,
  onTicketDrop,
}) => {
  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const handleContainerDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;
    const { ticketId, fromColumnId } = JSON.parse(data);

    const nodes = Array.from(
      containerRef.current?.querySelectorAll<HTMLDivElement>("[data-index]") ||
        []
    );
    const dropY = e.clientY;
    let minDist = Infinity;
    let dropIdx = 0;
    nodes.forEach((node, i) => {
      const rect = node.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const dist = Math.abs(dropY - mid);
      if (dist < minDist) {
        minDist = dist;
        dropIdx = dropY < mid ? i : i + 1;
      }
    });
    onTicketDrop(ticketId, fromColumnId, columnKey, dropIdx);
  };
  return (
    <Grid
      spacing={1}
      className={classes.columnContent}
      ref={containerRef}
      onDragOver={(e) => {
        e.preventDefault();
        if (!isHovering) setIsHovering(true);
      }}
      onDragEnter={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
          setIsHovering(true);
        }
      }}
      onDragLeave={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
          setIsHovering(false);
        }
      }}
      onDrop={(e) => {
        setIsHovering(false);
        handleContainerDrop(e);
      }}
      style={
        isHovering ? { backgroundColor: "rgba(63,81,181,0.1)" } : undefined
      }
    >
      {calls.map((ticket, idx) => (
        <Grid key={ticket.id} item xs={12}>
          <div
            data-index={idx}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e: React.DragEvent) => {
              e.preventDefault();
              e.stopPropagation();
              setIsHovering(false);
              const data = e.dataTransfer.getData("text/plain");
              if (!data) return;
              const { ticketId, fromColumnId } = JSON.parse(data);

              const rect = (
                e.currentTarget as HTMLDivElement
              ).getBoundingClientRect();
              const midpoint = rect.top + rect.height / 2;
              const dropY = e.clientY;
              const newIndex = dropY < midpoint ? idx : idx + 1;

              onTicketDrop(ticketId, fromColumnId, columnKey, newIndex);
            }}
          >
            <Column
              ticket={ticket}
              columnKey={columnKey}
              onDragEnd={() => setIsHovering(false)}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
