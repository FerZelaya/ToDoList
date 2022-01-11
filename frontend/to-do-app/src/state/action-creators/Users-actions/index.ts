import { UserTypes } from "../../action-types";
import { Dispatch } from "redux";
import { ACTIONS } from "../../actions";
import * as axiosActions from "utilities/axios";
import { signIn } from "components/Login/actions";

export const signInUser = (userData: Object) => {
  return async (dispatch: Dispatch<ACTIONS>) => {
    var user;
    var jwt;
    var newState = {}
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
        jwt:jwt,
        redirectTo: true,
        isLogged: true,
        loadingBackend: false
      }
      if(user){
        alert("Log In successfull.");
      }
    } catch (error) {
      alert("Error trying to login");
      console.log(error);
    }
    
    dispatch({
      type: UserTypes.SIGNIN,
      payload: newState
    });
  };
};

export const signUpUser = (userData: Object) => {
  return (dispatch: Dispatch<ACTIONS>) => {
    dispatch({
      type: UserTypes.SIGNUP,
      payload: userData,
    });
  };
};

export const signOutUser = () => {
  return (dispatch: Dispatch<ACTIONS>) => {
    dispatch({
      type: UserTypes.SIGNOUT,
    });
  };
};

// export const setUserData = (jwt) => {
//   return (dispatch: Dispatch<ACTIONS>) => {
//     let isLogged = false
//     if(jwt !== ""){
//       axiosActions.setJWT(jwt),
//       isLogged = true
//     }
//     dispatch({
//       type: UserTypes.SET_USER_DATA,
//       payload: isLogged
//     });
//   };
// };

export const userActionsCreator = {
  signin: signInUser,
  signout: signOutUser,
  signup: signUpUser,
  // setUser: setUserData
};
