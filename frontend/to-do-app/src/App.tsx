import React, { useEffect, useState } from "react";
import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import "./App.css";
import PubRoute from "./utilities/publicroutes";
import PrivRoute from "./utilities/privateroutes"
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  setJWT,
} from "./utilities/axios";
import { bindActionCreators } from "redux";
import { userActionsCreator } from "./state/action-creators/Users-actions";
import { todosActionCreator } from "./state/action-creators/ToDo-actions";
import { useSelector, useDispatch } from "react-redux";
//Components
import Login from "./components/Login/login";
import Home from "./components/Home/home";


interface AppState {
  user: Object;
  jwt: string;
  isLogged: Boolean;
  loadingBackend: Boolean;
}

const App: React.FC = () => {

  const userState = useSelector((state) => state); 
  const [state, setState] = useState<AppState>({
    user: getLocalStorage("user") || {},
    jwt: getLocalStorage("jwt") || "",
    isLogged: userState['users'].isLogged,
    loadingBackend: false,
  });
  const dispatch = useDispatch();
  const { setUser } = bindActionCreators(userActionsCreator, dispatch);
  const { getAll } = bindActionCreators(todosActionCreator, dispatch);

  useEffect(()=>{
   setUser() 
   getAll()
  },[])
  
  const auth = {
    isLogged: userState['users'].isLogged
  };

  const redirectComp = () => <Redirect to="/login"/>

  return (
    <Router>
      <Switch>
        <PubRoute path="/login" component={Login} auth={auth} />
        <PrivRoute path="/home" component={Home} auth={auth} />
        <PubRoute path="/" component={redirectComp}/>
      </Switch>
    </Router>
  );
};

export default App;
