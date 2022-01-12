import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { todosActionCreator } from "state/action-creators/ToDo-actions";
import { ToDosTypes } from "state/action-types/index";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Container,
  Link,
  Checkbox,
  IconButton,
  Box,
  Modal,
} from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
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
  const successHander = useSelector((state) => state["ToDos"].success);
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

  useEffect(() => {
    if (successHander) {
      getAll(loadingHandler);
      dispatch({ type: ToDosTypes.SUCCESSTOFALSE });
    }
  }, [successHander]);

  function onTextChange(e) {
    const { name, value } = e.target;
    setTodoData({
      ...todoData,
      [name]: value,
    });
  }

  function onCheckBoxChange(e) {
    const { checked } = e.target;
    setTodoData({
      ...todoData,
      completed: checked,
    });
    console.log(todoData.completed);
  }

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

  const updateCompletionToDo = async (todoID: string, newCompletion: boolean) => {
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
              onChange={() => updateCompletionToDo(val['_id'], !val['completed'])}
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
        <IconButton
          aria-label="delete"
          color="primary"
          size="large"
          onClick={() => getAll(loadingHandler)}
        >
          <RotateLeftIcon fontSize="large" />
        </IconButton>
        <div className="home-title">
          <Typography variant="h3">All things you need to do</Typography>
        </div>
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={handleOpenAddModal}
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </div>

      <Grid container spacing={0} className="todos-container">
        {todosComponent}
      </Grid>
      <Modal
        open={modalConfig["open"]}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalConfig["modalType"] === "ADD" ? (
          <Box sx={style} justifyContent="center">
            <Typography variant="h4">Add New To Do</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              type="text"
              value={todoData.title}
              onChange={onTextChange}
            />
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              onClick={postNewToDo}
            >
              Add
            </Button>
          </Box>
        ) : (
          <Box sx={style} justifyContent="center">
            <Typography variant="h4">Edit</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              type="text"
              value={todoData.title}
              onChange={onTextChange}
            />
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              onClick={() => updateToDO(modalConfig["todoID"])}
            >
              Apply
            </Button>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default Home;
