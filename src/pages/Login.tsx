import React, { useState } from "react";
import { Alert, Button, fabClasses, Grid, Paper, TextField, Typography } from "@mui/material";
import type { LoginData, LoginResponse } from "../types/type";
import { useNavigate } from "react-router";
import { authService } from "../services/authService";
import type { AxiosResponse } from "axios";
import { useAppDispatch } from "../store/hook";
import { login } from "../store/userReducer";

const Login: React.FC = () => {
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [form, setForm] = useState<LoginData>({
    email: '',
    password: ''
  })
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    authService.login(form)
      .then((response: AxiosResponse<LoginResponse>) => {
        const token = response.data.data.accesstoken.token
        if (response.data) {
          
          console.log("login",  response.data)
          dispatch(login(response.data.data))
        }

        localStorage.setItem('auth-token', token)
        setError(false)
        navigate("/ticket");
      })
      .catch((error: any) => {
        setMessage('Ocorreu um erro ao fazer login')
        setError(true)
      })
  }

  return (
    <Grid gap={2} display={"grid"} alignContent={"center"} minHeight={"96vh"}>
      {error && (
        <Alert severity="error"
          style={{
            display: "",
            textAlign: "center",
            justifySelf: "center",
            marginTop: "100px",
          }}>
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
              id="email"
              label="Email"
              placeholder="Inserir seu email"
              style={{ minWidth: "400px" }}
              onBlur={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
              required
            />
          </Grid>
          <Grid justifySelf={"center"} size={12}>
            <TextField
              id="password"
              label="Senha"
              placeholder="Inserir sua senha"
              style={{ minWidth: "400px" }}
              onBlur={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
              required
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
                handleSubmit()
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
