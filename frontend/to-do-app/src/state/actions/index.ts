import { UserTypes } from "../action-types";

interface SIGNIN_ACTION {
  type: UserTypes.SIGNIN;
  payload: Object;
}

interface SIGNUP_ACTION {
  type: UserTypes.SIGNUP;
  payload: Object;
}

interface SIGNOUT_ACTION {
  type: UserTypes.SIGNOUT;
}


export type ACTIONS = SIGNIN_ACTION | SIGNUP_ACTION | SIGNOUT_ACTION 