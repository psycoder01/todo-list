import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button } from "@material-ui/core";
import { checkEmail } from "../helpers/validators";
import SnackBar from "../components/snackbar";
import { Link } from "react-router-dom";
import { signin } from "../apis/auth";

const useStyles = makeStyles({
    root: {
        margin: "auto auto",
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        width: "60vw",
        height: "60vh",
        padding: "10px",
        background: "#f0f0f0",
    },
    inputs: {
        width: "60%",
        margin: "1em auto",
    },
    buttons: {
        width: "40%",
        margin: "1em auto",
    },
});

const Login = () => {
    const classes = useStyles();
    const email = useRef();
    const pass = useRef();
    const [error, setError] = useState();
    const [openSnackBar, setOpen] = useState(false);

    const submit = () => {
        if (!checkEmail(email.current.value)) {
            setError("Not Valid Credentials");
            setOpen(true);
            return;
        }
        signin(email.current.value, pass.current.value)
            .then((user) => {
                localStorage.setItem("token", user.user.uid);
                window.location = "/";
            })
            .catch((error) => {
                console.log(error);
                setError("Opps! Something not good");
                setOpen(true);
            });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Paper elevation={3} className={classes.root}>
                <h1>Login</h1>
                <TextField
                    inputRef={email}
                    className={classes.inputs}
                    variant="outlined"
                    label="Email"
                />
                <TextField
                    inputRef={pass}
                    className={classes.inputs}
                    variant="outlined"
                    label="Password"
                    type="password"
                />
                <Button
                    className={classes.buttons}
                    variant="contained"
                    color="primary"
                    onClick={() => submit()}
                >
                    Login
                </Button>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Button
                        className={classes.buttons}
                        variant="contained"
                        color="secondary"
                    >
                        Sign Up
                    </Button>
                </Link>
            </Paper>
            <SnackBar
                messege={error}
                open={openSnackBar}
                handleClose={handleClose}
                variant="error"
            />
        </>
    );
};

export default Login;
