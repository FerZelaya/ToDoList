import { stat } from "fs";
import { ToDosTypes } from "../action-types";
import { ACTIONS } from "../actions";

const initialState = {
  todos: [],
  success: false,
};

const reducer = (state = initialState, action: ACTIONS) => {
  switch (action.type) {
    case ToDosTypes.SHOWALL:
      return {
        ...state,
        todos: action.payload,
      };
    case ToDosTypes.POSTONE:
      return {
        ...state,
        success: action.payload,
      };
    case ToDosTypes.SUCCESSTOFALSE:
      return{
        ...state,
        success: false
      }
    default:
      return state;
  }
};

export default reducer;
