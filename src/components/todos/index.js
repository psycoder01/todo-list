import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";

export default function Todos({ todo, completed, deleteTodo, markRead }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {completed ? (
                " "
            ) : (
                <IconButton aria-label="delete" onClick={() => markRead(todo)}>
                    <CheckIcon />
                </IconButton>
            )}
            <h2 style={{ color: completed ? "red" : "black" }}>{todo}</h2>
            <IconButton aria-label="delete" onClick={() => deleteTodo(todo)}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
}
