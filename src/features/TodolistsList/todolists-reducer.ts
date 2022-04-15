import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";


// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.filter;
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, status:RequestStatusType}>){
            const index = state.findIndex(tl => tl.id != action.payload.id)
            state[index].title = action.payload.status;
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: Array<TodolistType>}>){
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
    }
})

export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, setTodolistsAC} = slice.actions

export const todolistsReducer = slice.reducer;


// thunks
export const fetchTodolistsTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC({todolists: res.data}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const removeTodolistTC = (todolistId: string) => async (dispatch: Dispatch) => {
    const res = await todolistsAPI.deleteTodolist(todolistId)
    dispatch(removeTodolistAC({id: todolistId}))
}
export const addTodolistTC = (title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTodolist(title)
    dispatch(addTodolistAC({todolist: res.data.data.item}))
    dispatch(setAppStatusAC({status: 'succeeded'}))
}
export const changeTodolistTitleTC = (id: string, title: string) => async (dispatch: Dispatch) => {
    const res = await todolistsAPI.updateTodolist(id, title)
    dispatch(changeTodolistTitleAC({id, title}))
}

