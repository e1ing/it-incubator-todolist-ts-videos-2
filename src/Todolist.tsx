import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";

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
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div>

            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
                <AddItemForm addItem={addTask}/>

            </h3>

            <div>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id);
                        }

                        return <div /*className={t.isDone ? "is-done" : ""} key={t.id}*/>
                            <Checkbox
                                   checked={t.isDone}
                                   onChange={onChangeCheckboxHandler}
                            />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
                        </div>
                    })
                }
            </div>

            <div>
                <Button variant={props.filter === "all" ?'contained'  : "text" }
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'}
                        variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'}
                        variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
}



