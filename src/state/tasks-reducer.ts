import {TasksStateType} from "../App"
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskAT = {
    type: "REMOVE-TASK",
    taskId: string,
    todolistId: string
}

type AddTaskAT = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}

type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}
 type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string

}

type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT |
    ChangeTaskTitleAT| AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType=initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            return {
                ...state,
                [action.todolistId]: [newTask, ...(state[action.todolistId]||[])]
            }
        case "CHANGE-TASK-STATUS":
            const stateCopy = {...state}
            let tasks_ = state[action.todolistId]
            let task = tasks_.find(t => t.id === action.taskId) //нашли кликнутую таску
            if (task) {
                task.isDone = action.isDone;
            }
            stateCopy[action.todolistId]=[...stateCopy[action.todolistId]]

            return stateCopy;
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            let tasks_ = state[action.todolistId]
            let task = tasks_.find(t => t.id === action.taskId) //нашли кликнутую таску
            if (task) {
                task.title = action.title;
            }
            return stateCopy;
        }
        case "ADD-TODOLIST":{
            const stateCopy ={...state}
            stateCopy[v1()] =[]
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy ={...state}
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
};

export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}