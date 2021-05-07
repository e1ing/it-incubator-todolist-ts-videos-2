import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {

    /* const [taskTitle, setTaskTitle] = useState("")*/
    /* const [error, setError] = useState<string|null>(null)*/

    //выносим анонимные функции для обработчиков
    /*const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeypressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        //setError(null);
        if (e.key === "Enter") {
            if (taskTitle.trim() !== "") {
                props.addTask(taskTitle.trim(), props.id)
                setTaskTitle("")
            }else {
                setError("Title is required")
            }
        }
    }

    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            props.addTask(taskTitle.trim(), props.id)
            setTaskTitle("")
        } else{
            setError("Title is required")
        }
    }*/

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    return (
        <div>
            <AddItemForm addItem={addTask}/>
            <h3>{props.title}
                <button onClick={removeTodolist}>Remove</button>
            </h3>

            {/*<div>
                <input
                    className={error ? "error" : ""}
                    value={taskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeypressHandler}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>*/}
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        }
                        const onChangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle(t.id, newValue, props.id);
                        }

                        return <li className={t.isDone ? "is-done" : ""} key={t.id}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeCheckboxHandler}
                            />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            {/*  <span>{t.title}</span>*/}
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>

            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )

}



