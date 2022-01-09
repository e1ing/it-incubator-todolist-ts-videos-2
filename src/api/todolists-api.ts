import axios from "axios";
import {Todolist} from "../Todolist";


const instanse = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": "b00b044a-fabf-40f0-8522-d4dd85a812f0"
    }
})

export type TodolistType = {
    id: string
    title: string
    AddedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: Date
    deadline: Date
}


export const todolistsAPI = {
    getTodolists() {
        return instanse.get<Array<TodolistType>>(`todo-lists`);
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title});
    },
    deleteTodolist(id: string) {
        return instanse.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instanse.put<ResponseType>(`todo-lists/${id}`, {title});
    },
    getTasks(todolistId: string) {
        return instanse.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instanse.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/`, {title:taskTitle})
    },
    updateTask(todolistId: string, taskId: string, newTitle: string, model: UpdateTaskModelType) {
        return instanse.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}


/*
.then((res)=> {
    setState(res.data)
})

axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title}, settings)
    .then((res)=> {
        setState(res.data)
    })


axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    .then((res)=> {
        setState(res.data)
    })

axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
    .then((res)=> {
        setState(res.data)
    })*/
