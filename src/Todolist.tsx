import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo ((props: PropsType)=> {
    const tasks =useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]) || []
    const dispatch = useDispatch();


    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, "all" ),[props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, "active" ),[props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter( props.id, "completed"),[ props.changeFilter,props.id,])

    const removeTodolist = useCallback(() => {props.removeTodolist(props.id)}, [props.removeTodolist, props.id])
    const changeTodolistTitle = useCallback ((newTitle: string) => {props.changeTodolistTitle(props.id, newTitle)}, [props.changeTodolistTitle, props.id])

    let allTodolistTasks = tasks;
    let tasksForTodolist=allTodolistTasks;

    if (props.filter==="active"){
        tasksForTodolist = allTodolistTasks.filter(t=>t.isDone===false)
    }
    if (props.filter==="completed"){
        tasksForTodolist = allTodolistTasks.filter(t=>t.isDone===true)
    }


    return (
        <div>

            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
               </h3>
            <AddItemForm addItem={()=>dispatch(addTaskAC(props.title, props.id))}/>

            <div>
                {
                    tasksForTodolist.map(t => {
                       <Task
                           task={t}
                           todolistId={props.todolistId}
                           changeTaskTitle={props.changeTaskTitle}
                           changeTaskStatus={props.changeTaskStatus}
                           removeTask={props.removeTask}
                           key={t.id}
                       />
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
})



