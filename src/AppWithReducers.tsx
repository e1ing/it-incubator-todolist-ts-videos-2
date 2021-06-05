import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, MenuItem, Paper, Toolbar, Typography} from "@material-ui/core";
import { useReducer } from 'react';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]);

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Orange", isDone: false},
            {id: v1(), title: "Cheese", isDone: true},
        ]
    })

    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer (removeTaskAC(id, todolistId));
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
       dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value))
    }

    let removeTodolist = (todolistId: string) => {
        dispatchToTodolistsReducer(removeTodolistAC(todolistId))
        dispatchToTasksReducer(removeTodolistAC(todolistId))
    }

    function addTodolist(title: string) {
        dispatchToTodolistsReducer(addTodolistAC(title))
        dispatchToTasksReducer(addTodolistAC(title))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle,todolistId))
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(id,newTitle))
    }


    return (
        <div className="App">
            <AppBar position="static">

                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuItem/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id];
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }
                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                            }

                            return <Grid item>
                                <Paper style={{padding:"10px"}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}


                                    changeFilter={changeFilter}


                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}

                                    changeTodolistTitle={changeTodolistTitle}
                                />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    )
}

export default AppWithReducers;
