import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";

export default function Todos({
    task,
    createdAt,
    completed,
    completedAt,
    index,
    deleteTodo,
    markRead,
}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {completed ? (
                <div style={{ color: "red" }}>{completedAt} </div>
            ) : (
                <IconButton aria-label="delete" onClick={() => markRead(task)}>
                    <CheckIcon />
                </IconButton>
            )}
            <h2 style={{ color: completed ? "red" : "black" }}>{task}</h2>
            <IconButton
                aria-label="delete"
                onClick={() => deleteTodo(task, index)}
            >
                <DeleteIcon />
            </IconButton>
            {createdAt}
        </div>
    );
}
