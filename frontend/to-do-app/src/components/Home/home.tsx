import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { todosActionCreator } from "state/action-creators/ToDo-actions";
import { userActionsCreator } from "state/action-creators/Users-actions";
import { ToDosTypes, UserTypes } from "state/action-types/index";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Checkbox,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { ExitToApp } from "@material-ui/icons/";
import "./home.css";

interface authProps {
  auth: {
    isLogged: boolean;
    login: Function;
    loadingHandler: Function;
  };
}

interface ToDoData {
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

const Home: React.FC<authProps> = ({ auth }) => {
  const allTodos = useSelector((state) => state["ToDos"].todos);
  const successPostHandler = useSelector((state) => state["ToDos"].success);
  const successLoginHander = useSelector((state) => state["users"].success);
  const [modalConfig, setModalConfig] = useState<Object>({
    open: false,
    modalType: "",
    todoID: "",
  });
  const [todos] = useState<Array<Object>>(allTodos);
  const [todoData, setTodoData] = useState<ToDoData>({
    title: "",
    description: "",
    completed: false,
    date: "",
  });
  const { loadingHandler } = auth;
  const dispatch = useDispatch();

  const { getAll, postOne, updateOne, deleteOne, updateCompletion } =
    bindActionCreators(todosActionCreator, dispatch);

  const { signout } = bindActionCreators(userActionsCreator, dispatch);

  useEffect(() => {
    if (successLoginHander) {
      getAll(loadingHandler);
      dispatch({ type: UserTypes.SUCCESSTOFALSE });
    }
    if (successPostHandler) {
      getAll(loadingHandler);
      dispatch({ type: ToDosTypes.SUCCESSTOFALSE });
    }
  }, [successLoginHander, successPostHandler]);

  function onTextChange(e) {
    const { name, value } = e.target;
    setTodoData({
      ...todoData,
      [name]: value,
    });
  }

  // function onCheckBoxChange(e) {
  //   const { checked } = e.target;
  //   setTodoData({
  //     ...todoData,
  //     completed: checked,
  //   });
  //   console.log(todoData.completed);
  // }

  const signOutUser = async () => {
    await signout();
    window.location.reload();
  };

  const postNewToDo = async () => {
    if (todoData.title !== "") {
      await postOne(todoData, loadingHandler);
    } else {
      alert("Please fill the title of your to do");
    }
  };

  const updateToDO = async (todoID: string) => {
    if (todoData.title !== "") {
      await updateOne(todoID, todoData, loadingHandler);
    } else {
      alert("Please fill the title of your to do");
    }
  };

  const updateCompletionToDo = async (
    todoID: string,
    newCompletion: boolean,
  ) => {
    await updateCompletion(todoID, newCompletion, loadingHandler);
  };

  const deleteToDO = async (todoID: string) => {
    await deleteOne(todoID, loadingHandler);
  };

  const handleOpenAddModal = () => {
    setModalConfig({
      ...modalConfig,
      open: true,
      modalType: "ADD",
    });
  };

  const handleOpenEditModal = (todoId: string, todoIndex: number) => {
    setModalConfig({
      ...modalConfig,
      open: true,
      modalType: "EDIT",
      todoID: todoId,
      todoIndex: todoIndex,
    });
  };

  const handleClose = () => {
    setModalConfig({
      ...modalConfig,
      open: false,
      modalType: "",
    });
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "39px",
    background: "#e0e0e0",
    p: 4,
    justifyContent: "center",
  };

  const todosComponent =
    todos &&
    todos.map((val, index) => {
      return (
        <div className="todo-item" key={index}>
          <div className="todo-title">
            <label>{val["title"]}</label>
          </div>
          <div className="actions-container">
            <Checkbox
              defaultChecked={val["completed"] && true}
              name="completed"
              value={val["completed"]}
              onChange={() =>
                updateCompletionToDo(val["_id"], !val["completed"])
              }
            />
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => handleOpenEditModal(val["_id"], index)}
            >
              Edit
            </Button>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => deleteToDO(val["_id"])}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      );
    });

  useEffect(() => {}, []);
  return (
    <div className="home-container">
      <div className="top-container">
        <div className="sign-out-container">
          <IconButton
            aria-label="delete"
            color="primary"
            size="large"
            // onClick={() => getAll(loadingHandler)}
            onClick={() => getAll(loadingHandler)}
          >
            <RotateLeftIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="primary"
            size="large"
            // onClick={() => getAll(loadingHandler)}
            onClick={signOutUser}
          >
            <ExitToApp fontSize="large" />
          </IconButton>
        </div>

        <div className="home-title">
          <Typography variant="h3">All things you need to do</Typography>
        </div>
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={handleOpenAddModal}
          className="add-button"
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </div>

      <Grid container spacing={0} className="todos-container">
        {todosComponent}
      </Grid>
      <Dialog open={modalConfig["open"]} onClose={handleClose}>
        {modalConfig["modalType"] === "ADD" ? (
          <DialogContent>
            <DialogTitle>Add New To Do</DialogTitle>
            <TextField
              variant="standard"
              margin="dense"
              autoFocus
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              type="text"
              value={todoData.title}
              onChange={onTextChange}
            />
            <DialogActions>
              <Button
                variant="contained"
                fullWidth
                size="large"
                color="primary"
                onClick={postNewToDo}
              >
                Add
              </Button>
            </DialogActions>
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogTitle>Edit Your To Do</DialogTitle>
            <TextField
              variant="standard"
              margin="dense"
              required
              fullWidth
              autoFocus
              id="title"
              label="Title"
              name="title"
              type="text"
              value={todoData.title}
              onChange={onTextChange}
            />
            <DialogActions>
              <Button
                variant="contained"
                fullWidth
                size="large"
                color="primary"
                onClick={() => updateToDO(modalConfig["todoID"])}
              >
                Apply
              </Button>
            </DialogActions>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Home;
