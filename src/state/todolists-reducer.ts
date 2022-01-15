import { Dispatch } from 'redux';
import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type SetTodolistAT = {
    type: 'SET-TODOLIST',
    todolists: Array<TodolistType>
}


type ActionsType = RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodolistAT

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOLIST': {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })

        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const setTodolistAC = (todolists: Array<TodolistType>): SetTodolistAT => {
    return {type: 'SET-TODOLIST', todolists}
}

export const fetchTodolistTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistAC(res.data));
            })
    }
}