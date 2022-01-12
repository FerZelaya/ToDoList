import { routes } from "routes/routes";
import { paxios } from "utilities/axios";
import { removeLocalStorage } from "utilities/axios";

export const showAlluser = async () => {
  try {
    const { data } = await paxios
      .get(routes.HOST + routes.showAllTodos)
      .catch((error) => {
        if (error.response.status === 401) {
          removeLocalStorage('user')
          removeLocalStorage('jwt')
          return []
        }
        return error
      });
    return data;
  } catch (error) {
    throw error;
  }
};

export const postNew = async (todoData) => {
  try {
    const { data } = await paxios.post(routes.HOST + routes.postTodo, todoData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (todoID) => {
  try {
    const { data } = await paxios.delete(
      routes.HOST + routes.deleteOne + "/" + todoID,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateToDo = async (todoData, todoID) => {
  try {
    const { data } = await paxios.put(
      routes.HOST + routes.updateOne + "/" + todoID,
      todoData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCompleted = async (completed, todoID) => {
  const completionUpdate = {completed}
  try {
    const { data } = await paxios.put(
      routes.HOST + routes.updateCompleted + "/" + todoID,
      completionUpdate,
    );
    console.log(data);
    
    return data;
  } catch (error) {
    throw error;
  }
};