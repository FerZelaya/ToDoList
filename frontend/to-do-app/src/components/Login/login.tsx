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

interface LoginProps {
  auth: {
    isLogged: boolean;
    login: Function;
  };
}

interface LoginData {
  email: string;
  password: string;
  redirectTo: Boolean;
}

const Login: React.FC<LoginProps> = ({ auth }) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    redirectTo: false,
  });
  const { login } = auth;

  const dispatch = useDispatch();

  const { signin } = bindActionCreators(userActionsCreator, dispatch);
  const state = useSelector((state: State) => state.users);

  function onTextChange(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function onClickLogIn(e) {
    e.preventDefault();
    signin(loginData)
  }

  //   useEffect(() => {
  //     login();
  //   }, [login]);

  return (
    <Container component="main" maxWidth="xs">
      <div className="paper">
        <Typography variant="h4">ToDo App</Typography>
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
