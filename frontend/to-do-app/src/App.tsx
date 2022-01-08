import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/login";
import PubRoute from "./utilities/publicroutes";

//Components

const App: React.FC = () => {

  const setLogin = () => {
    console.log("YMCMB");
  }

  const auth = {
    isLogged: true,
    login: setLogin
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
