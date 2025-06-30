import React, { useState } from "react";
import {
  Button,
  Grid,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Alert } from "@mui/material";
import type { RegisterData } from "src/types/type";
import { authService } from "../services/authService";
import { api } from "../utils/API";
import { useNavigate } from "react-router";

const Register: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [form, setForm] = useState<RegisterData>({
    name: "",
    userName: "",
    cnpj: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = () => {
    api
      .post("/register", { ...form })
      .then((res) => {
        if (res.status === 200) {
          setMessage("empresa cadastrada com sucesso!");
          setError(false);
          return;
        }
      })
      .catch((err) => {
        setError(true);
        if (err.status === 422) {
          setMessage("Preencha os campos!");
          return;
        }
        setMessage("Erro ao cadastrar empresa");
      });
  };

  return (
    <>
      <Grid
        gap={2}
        display={"grid"}
        alignContent={"center"}
        // minHeight={"96vh"}
        // maxHeight={"100vh"}
      >
        {message && (
          <Alert
            severity={error ? "error" : "success"}
            style={{
              textAlign: "center",
              justifySelf: "center",
              marginTop: "10px",
            }}
          >
            {message}
          </Alert>
        )}
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
                Cadastrar
              </Typography>
            </Grid>
            <Grid justifySelf={"center"} size={12} maxWidth={"350px"}>
              <Typography
                variant="h1"
                fontSize={"18px"}
                textAlign={"center"}
                color="textDisabled"
              >
                Para efetuar o cadastro, preencha o formulário abaixo:
              </Typography>
            </Grid>
            <Grid justifySelf={"center"} size={12}>
              <TextField
                id="name"
                label="Nome da empresa"
                placeholder="Inserir nome da empresa."
                style={{ minWidth: "400px" }}
                onBlur={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
                required
              />
            </Grid>
            <Grid justifySelf={"center"} size={12}>
              <TextField
                id="name"
                label="Nome"
                placeholder="Inserir nome."
                style={{ minWidth: "400px" }}
                onBlur={(e) => {
                  setForm({ ...form, userName: e.target.value });
                }}
                required
              />
            </Grid>
            <Grid justifySelf={"center"} size={12}>
              <TextField
                id="cnpj"
                label="CNPJ"
                placeholder="Inserir CNPJ."
                style={{ minWidth: "400px" }}
                onBlur={(e) => {
                  setForm({ ...form, cnpj: e.target.value });
                }}
                required
              />
            </Grid>
            <Grid justifySelf={"center"} size={12}>
              <TextField
                id="email"
                label="E-mail"
                placeholder="Inserir e-mail."
                style={{ minWidth: "400px" }}
                onBlur={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
                required
              />
            </Grid>
            <Grid justifySelf={"center"} size={12}>
              <TextField
                id="phone"
                label="Telefone"
                placeholder="Inserir telefone."
                style={{ minWidth: "400px" }}
                onBlur={(e) => {
                  setForm({ ...form, phone: e.target.value });
                }}
                required
              />
            </Grid>
            <Grid justifySelf={"center"} size={12}>
              <TextField
                id="password"
                label="Senha"
                type="password"
                placeholder="Inserir senha."
                required
                onBlur={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
                style={{ minWidth: "400px" }}
              />
            </Grid>
            <Grid justifySelf={"center"} size={12}>
              <p className="text-main-color">
                Possui uma conta?{" "}
                <a
                  href="/login"
                  style={{ color: "#1976d2", textDecoration: "none" }}
                >
                  Entrar
                </a>
              </p>
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default Register;
