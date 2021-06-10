import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";


type TaskPropsType = {
    task:TaskType
    todolistId: string
    removeTask: (id: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, inewTtile:string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
}

export const Task = React.memo(({task,todolistId, removeTask,changeTaskTitle,changeTaskStatus}: TaskPropsType)=>{
    const dispatch = useDispatch();

    const onRemoveHandler = () => {
        dispatch (removeTaskAC(task.id, todolistId));
    }
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked,  todolistId))

    }
    const onChangeTitleHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
    }

    return <div /*className={t.isDone ? "is-done" : ""} key={t.id}*/>
        <Checkbox
            checked={task.isDone}
            onChange={onChangeCheckboxHandler}
        />
        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
    </div>

})