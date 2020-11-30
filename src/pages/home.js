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

    const todoref = useRef();
    const [messege, setMessege] = useState("");
    const [openSnackBar, setOpen] = useState(false);

    const logout = () => {
        signout();
    };

    const addTodo = (todo) => {
        setTodos([...todos, { task: todo, completed: false }]);
        //firestore
        //.collection("users")
        //.doc(user.id)
        //.update({
        //todos: [...user.todos, todo],
        //})
        //.then(() => {
        //setMessege("Added Successfully");
        //setOpen(true);
        //})
        //.catch((error) => console.log(error));
        setMessege("Todo added");
        setOpen(true);
        todoref.current.value = "";
    };

    const deleteTodo = (task) => {
        setTodos(todos.filter((todo) => todo.task !== task));
        //firestore
        //.collection("users")
        //.doc(user.id)
        //.update({
        //todos: user.todos.filter((item) => item !== todo),
        //})
        //.then(() => console.log("done"))
        //.catch((error) => console.log(error));
        setMessege("Todo deleted");
        setOpen(true);
    };

    const markRead = (task) => {
        setTodos(
            todos.map((todo) => {
                if (todo.task === task) todo.completed = true;
                return todo;
            })
        );
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        var userId = auth.currentUser.uid;
        firestore
            .doc(`users/${userId}`)
            .get()
            .then((doc) => {
                setUser(doc.data());
            });
    }, []);

    return (
        <div style={{ margin: "2em", textAlign: "center" }}>
            <h5 style={{ margin: "2em" }}>Welcome {user.username}</h5>
            <div>
                {todos === undefined
                    ? ""
                    : todos.map((item, index) => (
                          <Todos
                              todo={item.task}
                              completed={item.completed}
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
