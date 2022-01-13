import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Container,
  FormControl,
  InputAdornment,
  Modal,
  Box,
} from "@mui/material";
import { AccountCircle, VpnKey, NoteAdd, Input } from "@material-ui/icons";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { userActionsCreator } from "state/action-creators/Users-actions/index";
import { todosActionCreator } from "state/action-creators/ToDo-actions/index";
import { Redirect } from "react-router-dom";
import { signUp } from "./actions";

interface authProps {
  auth: {
    isLogged: boolean;
    login: Function;
    loadingHandler: Function;
  };
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "39px",
  background: "#e0e0e0",
  p: 4,
  justifyContent: "center",
};

const Login: React.FC<authProps> = ({ auth }) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });
  const [modalConfig, setModalConfig] = useState<Object>({
    open: false,
  });
  const dispatch = useDispatch();
  const { signin, signup } = bindActionCreators(userActionsCreator, dispatch);
  const { getAll } = bindActionCreators(todosActionCreator, dispatch);
  const state = useSelector((state) => state);

  const { loadingHandler } = auth;

  function onTextChange(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function onRegisterTextChange(e) {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function onClickLogIn(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert("Please fill your email or password");
    } else {
      signin(loginData, loadingHandler);
      getAll(loadingHandler);
    }
  }

  function onClickRegister(e) {
    e.preventDefault();
    if (!registerData.email || !registerData.password || !registerData.name) {
      alert("Please fill the requested data");
    } else {
      signup(registerData, loadingHandler);
      handleClose()
    }
  }

  const handleOpenModal = () => {
    setModalConfig({
      ...modalConfig,
      open: true,
    });
  };

  const handleClose = () => {
    setModalConfig({
      ...modalConfig,
      open: false,
    });
  };

  if (state["users"].redirectTo) {
    const url = "/home";
    return <Redirect to={url} />;
  }

  return (
    <Container component="main" maxWidth="xl" className="main-Container">
      <div className="paper">
        <Typography variant="h2" marginBottom={2}>
          ToDo App
        </Typography>
        {/* <h1>{user["name"]}</h1> */}
        <form className="loginForm">
          <FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  value={loginData.email}
                  onChange={onTextChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKey />
                      </InputAdornment>
                    ),
                  }}
                  value={loginData.password}
                  onChange={onTextChange}
                />
              </Grid>

              <Grid item lg={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<Input />}
                  onClick={onClickLogIn}
                >
                  Sign In
                </Button>
              </Grid>

              <Grid item lg={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleOpenModal}
                  startIcon={<NoteAdd />}
                >
                  Create Account!
                </Button>
              </Grid>

              <Modal
                open={modalConfig["open"]}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} justifyContent="center">
                  <Typography variant="h4">Create Your Account</Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    type="name"
                    value={registerData.name}
                    onChange={onRegisterTextChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={onRegisterTextChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Create Password"
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={onRegisterTextChange}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    color="primary"
                    onClick={onClickRegister}
                  >
                    Register
                  </Button>
                </Box>
              </Modal>
            </Grid>
          </FormControl>
        </form>
      </div>
    </Container>
  );
};

export default Login;
