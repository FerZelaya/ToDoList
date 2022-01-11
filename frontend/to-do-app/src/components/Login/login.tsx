import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Container,
  Link,
} from "@mui/material";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State } from "../../state/reducers/index";
import { userActionsCreator } from "../../state/action-creators/Users-actions/index";
import { Redirect } from "react-router-dom";

interface LoginProps {
  auth: {
    isLogged: boolean;
    login: Function;
  };
}

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ auth }) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const { login } = auth;

  const dispatch = useDispatch();

  const { signin } = bindActionCreators(userActionsCreator, dispatch);
  const state = useSelector((state) => state);

  function onTextChange(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }
  
  function onClickLogIn(e) {
    e.preventDefault();
    signin(loginData);
  }

  //   useEffect(() => {
  //     login();
  //   }, [login]);

  if (state['users'].redirectTo) {
    const url = "/home";
    return <Redirect to={url} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="paper">
        <Typography variant="h4">ToDo App</Typography>
        {/* <h1>{user["name"]}</h1> */}
        <form className="loginForm">
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
              value={loginData.password}
              onChange={onTextChange}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClickLogIn}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item>
              <Typography variant="h6">
                <Link href="/signup">Create an account!</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
