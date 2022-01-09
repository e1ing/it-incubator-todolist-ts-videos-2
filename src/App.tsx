import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, MenuItem, Paper, Toolbar, Typography} from "@material-ui/core";


export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

   /* let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
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
        let tasks_ = tasks[todolistId]
        let newTasks = tasks_.filter(t => t.taskId !== id);
        tasks[todolistId] = newTasks;
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        let tasks_ = tasks[todolistId];
        let newTasks = [newTask, ...tasks_]
        tasks[todolistId] = newTasks;
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks_ = tasks[todolistId]
        let task = tasks_.find(t => t.taskId === taskId) //нашли кликнутую таску
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {             //проверка есть ли todolist с таким ID
            todolist.filter = value;
            setTodolists([...todolists])

        }
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist);
        delete tasks[todolistId]; //удаляются таски удалённого todolist
        setTasks({...tasks}); //удаляются таски удалённого todolist из стейта
    }

    function addTodolist(title: string) {

        const todolistId = v1()
        const todolist: TodolistType = {
            id: todolistId, title, filter: "all"
        };
        setTodolists([todolist, ...todolists]);
        setTasks({...tasks, [todolistId]: []})
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        debugger
        let tasks_ = tasks[todolistId]
        let task = tasks_.find(t => t.taskId === taskId) //нашли кликнутую таску
        if (task) {
            task.title = newTitle;
        }
        setTasks({...tasks});
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
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
                                    key={tl.todolistId}
                                    todolistId={tl.todolistId}
                                    title={tl.title}
                                    changeFilter={changeFilter}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={ChangeTaskTitle}
                                />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    )*/
}

export default App;
