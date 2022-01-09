import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === "Enter") {
            if (taskTitle.trim() !== "") {
                props.addItem(taskTitle.trim(),)
                setTaskTitle("")
            } else {
                setError("Title is required")
            }
        }
    }

    const addItemHandler = () => {
        if (taskTitle.trim() !== "") {
            props.addItem(taskTitle.trim())
            setTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    return <div>
        <TextField
            error={!!error}
            value={taskTitle}
            variant={'outlined'}
            helperText={error}
            label={'type value'}
            onChange={onNewTitleChangeHandler}
            onKeyPress={onKeyPressHandler}
        />
        <IconButton
            color={'primary'}
            onClick={addItemHandler}><ControlPoint/></IconButton>
    </div>
});