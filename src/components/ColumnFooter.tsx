import React from "react";
import {
  Button,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  columnButton: {
    justifyContent: "center",
  },
}));

interface ColumnFooterProps {
  onAdd: () => void;
}

export const ColumnFooter: React.FC<ColumnFooterProps> = ({ onAdd }) => {
  const classes = useStyles();

  return (
    <CardActionArea onClick={onAdd} className={classes.columnButton}>
      <CardContent>
        <Typography component="span" variant="h6">
          + Adicionar
        </Typography>
      </CardContent>
    </CardActionArea>
  );
};
