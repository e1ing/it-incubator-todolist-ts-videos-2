import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active"
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]);

    let [tasks, setTasks] = useState<TaskStateType>({
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
                id: todolistId, title, filter: "all"};
            setTodolists([todolist, ...todolists]);
            setTasks({...tasks, [todolistId]: []})
        }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        debugger
        let tasks_ = tasks[todolistId]
        let task = tasks_.find(t => t.id === taskId) //нашли кликнутую таску
        if (task) {
            task.title = newTitle;
        }
        setTasks({...tasks});
    }

    function changeTodolistTitle (id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id===id);
        if(todolist){
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
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
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>

    )
}

export default App;
