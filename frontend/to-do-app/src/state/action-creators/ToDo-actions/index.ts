import { ToDosTypes } from "../../action-types";
import { Dispatch } from "redux";
import { ACTIONS } from "../../actions";
import {
  showAlluser,
  postNew,
  deleteTodo,
  updateToDo,
} from "components/Home/actions";

export const getAllUserTodos = () => {
  return async (dispatch: Dispatch<ACTIONS>) => {
    let allToDos = [];
    try {
      allToDos = await showAlluser();
    } catch (error) {
      alert("Error fetching your To Dos");
      console.log(error);
    }

    dispatch({
      type: ToDosTypes.SHOWALL,
      payload: allToDos,
    });
  };
};

export const postTodo = (todoInfo: Object) => {
  return async (dispatch: Dispatch<ACTIONS>) => {
    let postedToDo;
    try {
      postedToDo = await postNew(todoInfo);
    } catch (error) {
      alert("Error fetching your To Dos");
      console.log(error);
    }

    dispatch({
      type: ToDosTypes.POSTONE,
      payload: postedToDo["Success"] ? true : false,
    });
  };
};

export const deleteOne = (todoId: string) => {
  return async (dispatch: Dispatch<ACTIONS>) => {
    let deletedToDo;
    try {
      deletedToDo = await deleteTodo(todoId);
    } catch (error) {
      alert("Error deleting your To Dos");
      console.log(error);
    }

    dispatch({
      type: ToDosTypes.DELETEONE,
      payload: deletedToDo["Success"] ? true : false,
    });
  };
};

export const updateOne = (todoId: string, todoData: Object) => {
  return async (dispatch: Dispatch<ACTIONS>) => {
    let updatedToDo;
    try {
      updatedToDo = await updateToDo(todoData, todoId);
    } catch (error) {
      alert("Error deleting your To Dos");
      console.log(error);
    }

    dispatch({
      type: ToDosTypes.DELETEONE,
      payload: updatedToDo["Success"] ? true : false,
    });
  };
};

export const todosActionCreator = {
  getAll: getAllUserTodos,
  postOne: postTodo,
  deleteOne: deleteOne,
  updateOne: updateOne
};
