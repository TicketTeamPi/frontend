import React from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
const Login: React.FC = () => {
  return (
    <Grid gap={2} display={"grid"} alignContent={"center"} minHeight={"96vh"}>
      <Paper
        variant="outlined"
        style={{
          width: "600px",
          justifySelf: "center",
          alignSelf: "baseline",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          border: "unset",
        }}
      >
        <Grid gap={2} display={"grid"} container>
          <Grid justifyItems={"center"} size={12} display={"grid"}>
            <img
              src="../src/assets/icons/ticketTool.svg"
              className="logo-menu"
            ></img>
          </Grid>
          <Grid justifySelf={"center"} size={12}>
            <Typography
              variant="h1"
              fontSize={"44px"}
              textAlign={"center"}
              fontWeight={"500"}
              color="primary"
            >
              Entrar
            </Typography>
          </Grid>
          <Grid justifySelf={"center"} size={12}>
            <Typography
              variant="h1"
              fontSize={"18px"}
              textAlign={"center"}
              color="textDisabled"
            >
              Preencha o formulário abaixo:
            </Typography>
          </Grid>
          <Grid justifySelf={"center"} size={12}>
            <TextField
              id="outlined-uncontrolled"
              label="E-mail"
              placeholder="Inserir e-mail."
              style={{ minWidth: "400px" }}
              required
            />
          </Grid>
          <Grid justifySelf={"center"} size={12}>
            <TextField
              id="outlined-uncontrolled"
              label="Senha"
              placeholder="Inserir senha."
              required
              style={{ minWidth: "400px" }}
            />
          </Grid>
          <Grid justifySelf={"center"} size={12}>
            <p className="text-main-color">
              Não possui uma conta?{" "}
              <a
                href="/sign"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Cadastrar
              </a>
            </p>
            <Button
              variant="contained"
              style={{ width: "100%" }}
              onClick={() => {
                window.location.replace("/ticket");
              }}
            >
              Entrar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
