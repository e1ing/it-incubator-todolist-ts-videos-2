import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";


export type TaskPropsType = {
    task:TaskType
    todolistId: string
    changeTaskTitle: (taskId: string, inewTtile:string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
}

export const Task = React.memo(({task,todolistId, removeTask,changeTaskTitle,changeTaskStatus}: TaskPropsType)=>{
    const onRemoveHandler = () => {
        removeTask(task.taskId, todolistId);
    }

    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
       changeTaskStatus(task.taskId, e.currentTarget.checked,  todolistId)

    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.taskId, newValue, todolistId)
    }, [task.taskId, changeTaskTitle, todolistId])

    return <div /*className={t.isDone ? "is-done" : ""} key={t.id}*/>
        <Checkbox
            checked={task.isDone}
            onChange={onChangeCheckboxHandler}
        />
        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
    </div>

})