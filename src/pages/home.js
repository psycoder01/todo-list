import React, { useState, useRef, useEffect } from "react";
import { Button, IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Todos from "../components/todos";
import { signout, auth } from "../config/firebase";
import SnackBar from "../components/snackbar";
import { firestore } from "../config/firebase";

function Home() {
    const [user, setUser] = useState({});
    const [todos, setTodos] = useState([]);
    const [total, setTotal] = useState();
    const [completed, setCompleted] = useState();

    const todoref = useRef();
    const [messege, setMessege] = useState("");
    const [openSnackBar, setOpen] = useState(false);

    const logout = () => {
        signout();
        window.location="/";
    };

    const addTodo = (task) => {
        setTodos([
            ...todos,
            {
                task: task,
                completed: false,
                createdAt: new Date().toLocaleString(),
            },
        ]);
        setTotal(total + 1);
        firestore
            .collection("todos")
            .doc(user.id)
            .set({
                todos: [
                    ...todos,
                    {
                        task: task,
                        completed: false,
                        createdAt: new Date().toLocaleString(),
                    },
                ],
                completed: completed,
                total: total + 1,
            })
            .then(() => console.log("todo added in firestore"))
            .catch((error) => console.log(error));
        setMessege("Todo added");
        setOpen(true);
        todoref.current.value = "";
    };

    const deleteTodo = (task, index) => {
        setTodos(todos.filter((todo) => todo.task !== task));
        if (todos[index].completed) setCompleted(completed - 1);
        setTotal(total - 1);
        firestore
            .collection("todos")
            .doc(user.id)
            .update({
                todos: todos.filter((todo) => todo.task !== task),
                total: total - 1,
                completed: todos[index].completed ? completed - 1 : completed,
            })
            .then(() => console.log("todo deleted in firestore"))
            .catch((error) => console.log(error));
        setMessege("Todo deleted");
        setOpen(true);
    };

    const markRead = (task) => {
        setTodos(
            todos.map((todo) => {
                if (todo.task === task) {
                    todo.completed = true;
                    todo.completedAt = new Date().toLocaleString();
                }
                return todo;
            })
        );
        setCompleted(completed + 1);
        firestore
            .collection("todos")
            .doc(user.id)
            .update({
                todos: todos,
                completed: completed + 1,
            });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        let userId = auth.currentUser.uid;
        firestore
            .doc(`users/${userId}`)
            .get()
            .then((doc) => {
                setUser(doc.data());
            })
            .catch(() => {
                setMessege("Can't Connect");
                setOpen(true);
            });
        firestore
            .doc(`todos/${userId}`)
            .get()
            .then((doc) => {
                let todos = doc.data();
                setTodos(todos.todos);
                setTotal(todos.total);
                setCompleted(todos.completed);
            })
            .catch(() => {
                setMessege("Can't Connect");
                setOpen(true);
            });
    }, []);

    return (
        <div style={{ margin: "2em", textAlign: "center" }}>
            <h5 style={{ margin: "2em" }}>Welcome {user.username}</h5>
            <h3>Total : {total}</h3>
            <h3>Completed : {completed}</h3>
            <br />
            <br />
            <br />
            <div>
                {todos === undefined
                    ? ""
                    : todos.map((todo, index) => (
                          <Todos
                              task={todo.task}
                              createdAt={todo.createdAt}
                              completed={todo.completed}
                              completedAt={todo.completedAt}
                              index={index}
                              key={index}
                              style={{ margin: "1em" }}
                              deleteTodo={deleteTodo}
                              markRead={markRead}
                          />
                      ))}
            </div>
            <div>
                <TextField
                    id="standard-basic"
                    inputRef={todoref}
                    label="Add Todo"
                />
                <IconButton
                    aria-label="add"
                    onClick={() => addTodo(todoref.current.value)}
                >
                    <AddIcon />
                </IconButton>
            </div>
            <Button
                variant="contained"
                color="primary"
                style={{ margin: "2em" }}
                onClick={logout}
            >
                Logout
            </Button>
            <SnackBar
                messege={messege}
                open={openSnackBar}
                handleClose={handleClose}
                variant="success"
            />
        </div>
    );
}

export default Home;
