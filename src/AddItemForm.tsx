import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType ={
    addItem: (title: string) => void
}


export function AddItemForm(props: AddItemFormPropsType) {

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeypressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        //setError(null);
        if (e.key === "Enter") {
            if (taskTitle.trim() !== "") {
                props.addItem(taskTitle.trim(), )
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
        <input
            className={error ? "error" : ""}
            value={taskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyPress={onKeypressHandler}
        />
        <button onClick={addItemHandler}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}