import { UserTypes } from "../../action-types";
import { Dispatch } from "redux";
import { ACTIONS } from "../../actions";
import * as axiosActions from "utilities/axios";
import { signIn, signUp } from "components/Login/actions";

export const signInUser = (userData: Object, loadingHandler: Function) => {
  loadingHandler(true);
  return async (dispatch: Dispatch<ACTIONS>) => {
    var user;
    var jwt;
    var newState = {};
    try {
      user = await signIn({
        email: userData["email"],
        password: userData["password"],
      });
      jwt = user.jwt;
      delete user.jwt;
      axiosActions.setLocalStorage("user", JSON.stringify(user));
      axiosActions.setLocalStorage("jwt", jwt);
      axiosActions.setJWT(jwt);
      newState = {
        user: user,
        jwt: jwt,
        redirectTo: true,
        isLogged: true,
        loadingBackend: false,
      };
      if (user) {
        alert("Log In successfull.");
        loadingHandler(false);
      }
    } catch (error) {
      loadingHandler(false);
      alert("Error trying to login");
      console.log(error);
    }

    dispatch({
      type: UserTypes.SIGNIN,
      payload: newState,
    });
  };
};

export const signUpUser = (userInfo: Object, loadingHandler: Function) => {
  return async (dispatch: Dispatch<ACTIONS>) => {
    loadingHandler(true);
    let response
    try {
      response = await signUp(
        userInfo["name"],
        userInfo["email"],
        userInfo["password"],
      );
      console.log(response);
      alert("Account created successfull.");
      loadingHandler(false);
    } catch (error) {
      alert("ERROR: Unable to sign in!");
      loadingHandler(false);
      console.log(error);
    }
    dispatch({
      type: UserTypes.SIGNUP,
      payload: response,
    });
  };
};

export const signOutUser = () => {
  return (dispatch: Dispatch<ACTIONS>) => {
    axiosActions.removeLocalStorage('user')
    axiosActions.removeLocalStorage('jwt')

    dispatch({
      type: UserTypes.SIGNOUT,
    });
  };
};

export const setUserData = () => (dispatch: Dispatch<ACTIONS>) => {
  const user = axiosActions.getLocalStorage("user") || {};
  const jwt = axiosActions.getLocalStorage("jwt") || "";

  var userLoggedIn = {};
  if (jwt !== "") {
    axiosActions.setJWT(jwt);
    userLoggedIn = {
      user: user,
      jwt: jwt,
      isLogged: true,
      redirectTo: true,
      loadingBackend: false,
    };
  }

  dispatch({
    type: UserTypes.SET_USER_DATA,
    payload: userLoggedIn,
  });
};

export const userActionsCreator = {
  signin: signInUser,
  signout: signOutUser,
  signup: signUpUser,
  setUser: setUserData,
};
