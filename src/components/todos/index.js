import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Todos({ todo, deleteTodo }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h2>{todo}</h2>
            <IconButton aria-label="delete" onClick={() => deleteTodo(todo)}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
}
