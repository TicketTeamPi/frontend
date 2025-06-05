import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Button } from "@mui/material";

export const Header = () => {
  return (
    <AppBar style={{ position: "static" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Ticket-Tool</Typography>
        <Button
          style={{ color: "white" }}
          onClick={() => {
            window.location.replace("/login");
          }}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
};
