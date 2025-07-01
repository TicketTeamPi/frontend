import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { api } from "../utils/API";

const useStyles = makeStyles((theme) => ({
  columnHeader: {
    padding: theme.spacing(2),
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

interface ColumnHeaderProps {
  title: string;
  id: string;
  onUpdate?: () => void;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ title, id, onUpdate }) => {
  const classes = useStyles();
const handleOnClick = async () => {
    if (id) {
      await api.delete(`/columns/change-status/${id}`);
      if (onUpdate) onUpdate(); 
    }
  };
  return (
    <Grid container className={classes.columnHeader}>
      <Typography component="h5" variant="h5">
        {title}
      </Typography>
      <Button
        onClick={handleOnClick}
        style={{ marginLeft: 4, minWidth: 40, minHeight: 40 }}
      >
        X
      </Button>
    </Grid>
  );
};
