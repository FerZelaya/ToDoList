import { UserTypes, ToDosTypes } from "../action-types";

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
  payload: Object;
}

interface SHOW_ALL_TODOS {
  type: ToDosTypes.SHOWALL;
  payload: Array<any>;
}

interface POST_TODO {
  type: ToDosTypes.POSTONE;
  payload: boolean;
}

interface DELETE_TODO {
  type: ToDosTypes.DELETEONE;
  payload: boolean;
}

interface UPDATE_TODO {
  type: ToDosTypes.UPDATE;
  payload: boolean;
}

interface UPDATE_COMPLETION{
  type: ToDosTypes.UPDATE_COMPLETION;
  payload: boolean;
}

interface SET_SUCCESS_FALSE {
  type: ToDosTypes.SUCCESSTOFALSE;
}

export type ACTIONS =
  | SIGNIN_ACTION
  | SIGNUP_ACTION
  | SIGNOUT_ACTION
  | SET_USER_DATA
  | SHOW_ALL_TODOS
  | POST_TODO
  | DELETE_TODO
  | UPDATE_TODO
  | SET_SUCCESS_FALSE
  | UPDATE_COMPLETION;
