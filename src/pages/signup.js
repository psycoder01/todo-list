import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button } from "@material-ui/core";
import { checkEmail } from "../helpers/validators";
import SnackBar from "../components/snackbar";

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

const SignUp = () => {
    const classes = useStyles();
    const email = useRef();
    const pass = useRef();
    const passConfirm = useRef();
    const [error, setError] = useState();
    const [openSnackBar, setOpen] = useState(false);

    const submit = () => {
        console.log(pass.current.value);
        console.log(passConfirm.current.value);
        if (!checkEmail(email.current.value)) {
            setError("Not Valid Credentials");
            setOpen(true);
            return;
        }
        if (pass.current.value !== passConfirm.current.value) {
            setError("Password don't match");
            setOpen(true);
            return;
        }

        console.log(email.current.value);
        console.log(pass.current.value);
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
                <h1>Sign Up</h1>
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
                <TextField
                    inputRef={passConfirm}
                    className={classes.inputs}
                    variant="outlined"
                    label="Confirm Password"
                    type="password"
                />
                <Button
                    className={classes.buttons}
                    variant="contained"
                    color="primary"
                    onClick={() => submit()}
                >
                    Create Account
                </Button>
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

export default SignUp;
