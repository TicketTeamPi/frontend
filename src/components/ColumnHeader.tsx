import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  columnHeader: {
    padding: theme.spacing(2),
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

interface ColumnHeaderProps {
  title: string;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ title }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.columnHeader}>
      <Typography component="h5" variant="h5">
        {title}
      </Typography>
    </Grid>
  );
};
