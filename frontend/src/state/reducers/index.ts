import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import todosReducer from "./ToDoReducer"

const reducers = combineReducers({
    users: usersReducer,
    ToDos: todosReducer
})

export default reducers

export type State = ReturnType<typeof reducers>