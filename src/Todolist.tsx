import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string|null>(null)

    //выносим анонимные функции для обработчиков
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeypressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            props.addTask(taskTitle)
            setTaskTitle("")
        }
    }

    const addTask = () => {
        if (taskTitle.trim() !== "") {
            props.addTask(taskTitle.trim())
            setTaskTitle("")
        } else{
            setError("Title is required")
        }
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={taskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeypressHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                            const onRemoveHandler = () => {
                                props.removeTask(t.id)
                            }
                            const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked);
                            }
                            return <li className={t.isDone ? "is-done" : ""} key={t.id}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={onChangeCheckboxHandler}
                                />
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x
                                </button>
                            </li>
                        }
                    )
                }
            </ul>

            <div>
                <button className={props.filter==="all"? "active-filter": ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter==="active"? "active-filter": ""} onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter==="completed"? "active-filter": ""} onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}