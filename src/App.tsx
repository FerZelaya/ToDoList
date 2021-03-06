import React, { useEffect, useState } from "react";
import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import "./App.css";
import PubRoute from "./utilities/publicroutes";
import PrivRoute from "./utilities/privateroutes";
import { bindActionCreators } from "redux";
import { userActionsCreator } from "./state/action-creators/Users-actions";
import { todosActionCreator } from "./state/action-creators/ToDo-actions";
import { useSelector, useDispatch } from "react-redux";
//Components
import Login from "./components/Login/login";
import Home from "./components/Home/home";
import LottieView from "./components/Lottie/LottieView";

const App: React.FC = () => {
  const userState = useSelector((state) => state);
  const [loadingAPI, setLoadingAPI] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const { setUser } = bindActionCreators(userActionsCreator, dispatch);
  const { getAll } = bindActionCreators(todosActionCreator, dispatch);

  useEffect(() => {
    setUser();
    getAll(loadingHandler);
  }, []);

  const loadingHandler = (loading: Boolean) => {
    setLoadingAPI(loading);
  };

  const auth = {
    isLogged: userState["users"].isLogged,
    loading: false,
    loadingHandler: loadingHandler,
  };

  const redirectComp = () => <Redirect to="/login" />;

  if (loadingAPI) {
    return <LottieView />;
  }

  return (
    <Router>
      <Switch>
        <PubRoute path="/login" component={Login} auth={auth} />
        <PrivRoute path="/home" component={Home} auth={auth} />
        <PubRoute path="/" component={redirectComp} />
      </Switch>
    </Router>
  );
};

export default App;
