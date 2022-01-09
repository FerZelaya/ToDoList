import { UserTypes } from "../../action-types";
import { Dispatch } from "redux";
import { ACTIONS } from "../../actions";

export const signInUser = (userData: Object) => {
    return (dispatch: Dispatch<ACTIONS>) => {
        dispatch({
            type: UserTypes.SIGNIN,
            payload: userData
        })
    }
}

export const signUpUser = (userData: Object) => {
    return (dispatch: Dispatch<ACTIONS>) => {
        dispatch({
            type: UserTypes.SIGNUP,
            payload: userData
        })
    }
}

export const signOutUser = () => {
    return (dispatch: Dispatch<ACTIONS>) => {
        dispatch({
            type: UserTypes.SIGNOUT
        })
    }
}

export const userActionsCreator = {
    signin: signInUser,
    signout: signOutUser,
    signup: signUpUser
}