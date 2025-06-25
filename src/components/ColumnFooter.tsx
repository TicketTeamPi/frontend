import React, { useState } from "react";
import {
  Button,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  columnButton: {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
}));
export const ColumnFooter = () => {
  const classes = useStyles();

  return (
    <CardActionArea>
      <CardContent>
        <Typography component="span" variant="h6">
          + Adicionar
        </Typography>
      </CardContent>
    </CardActionArea>
  );
};
