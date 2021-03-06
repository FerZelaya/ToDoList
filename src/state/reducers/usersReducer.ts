import { UserTypes } from "../action-types";
import { ACTIONS } from "../actions";

const initialState = {
  redirectTo: false,
  user: {},
  jwt: "",
  isLogged: false,
  loadingBackend: false,
  success: false,
};

const reducer = (state = initialState, action: ACTIONS) => {
  switch (action.type) {
    case UserTypes.SIGNIN:
      let newState = Object.assign(state, { ...action.payload });
      return {
        ...state,
        ...newState,
      };
    case UserTypes.SET_USER_DATA:
      let userLogged = Object.assign(state, { ...action.payload });
      return {
        ...state,
        ...userLogged,
      };
    case UserTypes.SIGNUP:
      return { ...state, success: action.payload };
    case UserTypes.SIGNOUT:
      return { ...state, state: initialState };
    case UserTypes.SUCCESSTOFALSE:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export default reducer;
