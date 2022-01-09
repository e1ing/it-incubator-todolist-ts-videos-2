import {FilterValuesType, TodolistType} from "../AppWithRedux"
import {v1} from "uuid";

export type RemoveTodolistActionType={
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

type ChangeTodolistActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType|AddTodolistActionType|ChangeTodolistActionType|ChangeTodolistFilterActionType


const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType>=initialState, action: ActionsType): Array<TodolistType> =>{
    switch(action.type) {
        case "REMOVE-TODOLIST":{
            return state.filter(tl => tl.todolistId !== action.id)
        }
        case "ADD-TODOLIST":{
            return [{
                todolistId: action.todolistId,
                title: action.title,
                filter: "all"
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(tl => tl.todolistId ===action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [ ...state]
        }

        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(tl => tl.todolistId === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [ ...state]
        }
        default: return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title: title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id, filter: filter}
}