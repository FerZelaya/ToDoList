import { ToDosTypes } from "../../action-types";
import { Dispatch } from "redux";
import { ACTIONS } from "../../actions";
import {
  showAlluser,
  postNew,
  deleteTodo,
  updateToDo,
  updateCompleted
} from "components/Home/actions";

export const getAllUserTodos = (loadingHandler: Function) => {
  return async (dispatch: Dispatch<ACTIONS>) => {
    loadingHandler(true)
    let allToDos = [];
    try {
      allToDos = await showAlluser();
      loadingHandler(false)
    } catch (error) {
      loadingHandler(false)
      alert("Error fetching your To Dos");
      console.log(error);
    }

    dispatch({
      type: ToDosTypes.SHOWALL,
      payload: allToDos,
    });
  };
};

export const postTodo = (todoInfo: Object, loadingHandler: Function) => {
  return async (dispatch: Dispatch<ACTIONS>) => {
    loadingHandler(true)
    let postedToDo;
    try {
      postedToDo = await postNew(todoInfo);
      loadingHandler(false)
    } catch (error) {
      alert("Error fetching your To Dos");
      loadingHandler(false)
      console.log(error);
    }

    dispatch({
      type: ToDosTypes.POSTONE,
      payload: postedToDo["Success"] ? true : false,
    });
  };
};

export const deleteOne = (todoId: string, loadingHandler: Function) => {
  return async (dispatch: Dispatch<ACTIONS>) => {
    loadingHandler(true)
    let deletedToDo;
    try {
      deletedToDo = await deleteTodo(todoId);
      loadingHandler(false)
    } catch (error) {
      alert("Error deleting your To Dos");
      loadingHandler(false)
      console.log(error);
    }

    dispatch({
      type: ToDosTypes.DELETEONE,
      payload: deletedToDo["Success"] ? true : false,
    });
  };
};

export const updateOne = (todoId: string, todoData: Object, loadingHandler: Function) => {
  return async (dispatch: Dispatch<ACTIONS>) => {
    loadingHandler(true)
    let updatedToDo;
    try {
      updatedToDo = await updateToDo(todoData, todoId);
      loadingHandler(false)
    } catch (error) {
      alert("Error updating your To Dos");
      loadingHandler(false)
      console.log(error);
    }

    dispatch({
      type: ToDosTypes.UPDATE,
      payload: updatedToDo["Success"] ? true : false,
    });
  };
};

export const updateCompletion = (todoId: string, newCompletion: boolean, loadingHandler: Function) => {
  return async (dispatch: Dispatch<ACTIONS>) => {
    loadingHandler(true)
    let updatedToDo;
    try {
      updatedToDo = await updateCompleted(newCompletion, todoId);
      loadingHandler(false)
    } catch (error) {
      alert("Error udpating your To Do completion");
      loadingHandler(false)
      console.log(error);
    }

    dispatch({
      type: ToDosTypes.UPDATE_COMPLETION,
      payload: updatedToDo["Success"] ? true : false,
    });
  };
};

export const todosActionCreator = {
  getAll: getAllUserTodos,
  postOne: postTodo,
  deleteOne: deleteOne,
  updateOne: updateOne,
  updateCompletion: updateCompletion
};
