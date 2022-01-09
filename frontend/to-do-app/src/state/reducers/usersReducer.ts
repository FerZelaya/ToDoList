import { UserTypes } from "../action-types";
import { ACTIONS } from "../actions";

const initialState = {
  email: "",
  password: "",
  redirectTo: false,
};

const reducer = (state: Object = initialState, action: ACTIONS) => {
  switch (action.type) {
    case UserTypes.SIGNIN:
      return console.log(state);
    case UserTypes.SIGNUP:
      return state;
    case UserTypes.SIGNOUT:
      return state;
    default:
      return console.log(state);
  }
};

export default reducer;
