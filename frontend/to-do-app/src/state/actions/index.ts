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

interface SET_USER_DATA {
  type: UserTypes.SET_USER_DATA;
  payload: boolean;
}


export type ACTIONS = SIGNIN_ACTION | SIGNUP_ACTION | SIGNOUT_ACTION | SET_USER_DATA