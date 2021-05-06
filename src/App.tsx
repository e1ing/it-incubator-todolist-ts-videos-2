import React, {useState} from 'react';
import './App.css';
import { Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "completed" | "active"
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ]);

    let [tasks, setTasks] = useState({
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
       let tasks_=tasks[todolistId]
        let newTasks = tasks_.filter(t => t.id !== id);
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
        let task = tasks_.find(t => t.id === taskId) //нашли кликнутую таску
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {             //проверка есть ли todolist с таким ID
            todolist.filter = value;
            setTodolist([...todolists])
        }
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter (tl => tl.id !== todolistId)
        setTodolist(filteredTodolist);
        delete tasks[todolistId]; //удаляются таски удалённого todolist
        setTasks({...tasks}); //удаляются таски удалённого todolist из стейта
    }

    return (
        <div className="App">
            {
                todolists.map((tl) => {


                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>

    )
}

export default App;
