import React, { useState } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import PubRoute from "./utilities/publicroutes";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  setJWT,
} from "./utilities/axios";

//Components
import Login from "./components/Login/login";
import { stat } from "fs";

interface AppState {
  user: Object;
  jwt: string;
  isLogged: Boolean;
  loadingBackend: Boolean;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    user: getLocalStorage("user") || {},
    jwt: getLocalStorage("jwt") || "",
    isLogged: false,
    loadingBackend: false,
  });

  if (state.jwt !== "") {
    setJWT(state.jwt);
    setState({ ...state, isLogged: true });
  }

  const setLogin = (user, jwt) => {
    setState({ ...state, user: user, jwt: jwt, isLogged: true });
    setLocalStorage("user", JSON.stringify(state.user))
    setLocalStorage("jwt", state.jwt)
  };

  const auth = {
    isLogged: true,
    login: setLogin,
  };
  return (
    <Router>
      <Switch>
        <PubRoute path="/login" component={Login} auth={auth} />
      </Switch>
    </Router>
  );
};

export default App;
