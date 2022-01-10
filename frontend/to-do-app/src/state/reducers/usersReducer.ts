import { UserTypes } from "../action-types";
import { ACTIONS } from "../actions";
import * as axiosActions from "../../utilities/axios";
import { signIn } from "components/Login/actions";

const initialState = {
  redirectTo: false,
  user: {},
  jwt: "",
  isLogged: false,
  loadingBackend: false
};

const reducer = async (state: Object = initialState, action: ACTIONS) => {
  switch (action.type) {
    case UserTypes.SIGNIN:
      const payload: object = action.payload;
      try {
        const userData = await signIn(payload["email"], payload["password"]);
        const { jwt } = userData;
        delete userData.jwt;
        state["user"] = userData;
        state["jwt"] = jwt;
        axiosActions.setLocalStorage("user", JSON.stringify(userData));
        axiosActions.setLocalStorage("jwt", jwt);
        axiosActions.setJWT(jwt);
      } catch (error) {
        alert("Error trying to login");
        console.log(error);
      }
      console.log(state["jwt"]);

      return { state };
    case UserTypes.SET_USER_DATA:

    case UserTypes.SIGNUP:
      return { ...state };
    case UserTypes.SIGNOUT:
      return { ...state };
    default:
      return { ...state };
  }
};

export default reducer;
