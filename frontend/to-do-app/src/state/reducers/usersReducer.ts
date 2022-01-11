import { UserTypes } from "../action-types";
import { ACTIONS } from "../actions";
import * as axiosActions from "../../utilities/axios";
import { signIn } from "components/Login/actions";

const initialState = {
  redirectTo: false,
  user: {},
  jwt: "",
  isLogged: false,
  loadingBackend: false,
};

const reducer = (state = initialState, action: ACTIONS) => {
  switch (action.type) {
    case UserTypes.SIGNIN:
      let newState = Object.assign(state, { ...action.payload });
      return {
        ...state,
        ...newState,
        // user: action.payload["user"],
        // jwt: action.payload["jwt"],
        // redirectTo: true,
        // isLogged: true,
        // loadingBackend: false
      };
    case UserTypes.SIGNUP:
      return { ...state };
    case UserTypes.SIGNOUT:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
