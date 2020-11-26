import React, { useState, useRef, useEffect } from "react";
import { Button, IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Todos from "../components/todos";
import { signout } from "../apis/auth";
import SnackBar from "../components/snackbar";
import { firestore } from "../config/firebase";

function Home() {
    const [user, setUser] = useState({});

    const todoref = useRef();
    const [messege, setMessege] = useState("");
    const [openSnackBar, setOpen] = useState(false);

    const logout = () => {
        signout().then(() => {
            setMessege("Logout Successful");
            localStorage.removeItem("token");
            setOpen(true);
            window.location = "/";
        });
    };

    const addTodo = (todo) => {
        setUser({
            ...user,
            todos: [...user.todos, todo],
        });
        firestore
            .collection("users")
            .doc(user.id)
            .update({
                todos: [...user.todos, todo],
            })
            .then(() => console.log("done"))
            .catch((error) => console.log(error));
        todoref.current.value = "";
    };

    const deleteTodo = (todo) => {
        setUser({
            ...user,
            todos: user.todos.filter((item) => item !== todo),
        });
        firestore
            .collection("users")
            .doc(user.id)
            .update({
                todos: user.todos.filter((item) => item !== todo),
            })
            .then(() => console.log("done"))
            .catch((error) => console.log(error));
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        let query = firestore
            .collection("users")
            .where("authId", "==", localStorage.getItem("token"));

        query
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    setUser({ ...doc.data(), id: doc.id });
                });
            })
            .catch((error) => {
                console.log(error);
                setMessege("Opps! some error occured");
                setOpen(true);
            });
    }, []);

    return (
        <div style={{ margin: "2em", textAlign: "center" }}>
            <h5 style={{ margin: "2em" }}>Welcome {user.username}</h5>
            <div>
                {user.todos === undefined
                    ? ""
                    : user.todos.map((item, index) => (
                          <Todos
                              todo={item}
                              key={index}
                              style={{ margin: "1em" }}
                              deleteTodo={deleteTodo}
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
