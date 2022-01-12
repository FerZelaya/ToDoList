import { ToDosTypes } from "../../action-types";
import { Dispatch } from "redux";
import { ACTIONS } from "../../actions";
import { showAlluser, postNew } from "components/Home/actions";

export const getAllUserTodos = () => {
  return async (dispatch: Dispatch<ACTIONS>) => {
      let allToDos = []
    try {
        allToDos = await showAlluser()
    } catch (error) {
      alert("Error fetching your To Dos");
      console.log(error);
    }

    dispatch({
        type: ToDosTypes.SHOWALL,
        payload: allToDos
    })
  };
};

export const postTodo = (todoInfo: Object) => {
  return async (dispatch: Dispatch<ACTIONS>) => {
      let postedToDo
    try {
        postedToDo = await postNew(todoInfo)
    } catch (error) {
      alert("Error fetching your To Dos");
      console.log(error);
    }

    dispatch({
        type: ToDosTypes.POSTONE,
        payload: postedToDo['Success'] ? true : false
    })
  };
};


export const todosActionCreator = {
    getAll: getAllUserTodos,
    postOne: postTodo
  };
