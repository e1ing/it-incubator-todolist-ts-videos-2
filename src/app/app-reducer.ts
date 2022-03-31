import {AppThunk} from "./store";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: AppInitialStateType = {
    status: 'idle',
    error: "Some error",
    isInitialized: false
}

export type SetErrorAT = ReturnType<typeof setAppErrorAC>
export type SetStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppIsInitializedAT = ReturnType<typeof setAppIsInitializedAC>
export type AppActionType = SetErrorAT | SetStatusAT | SetAppIsInitializedAT


export const appReducer = (state: AppInitialStateType = initialState, action: AppActionType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppIsInitializedAC = (value: boolean) => ({type: "APP/SET-IS-INITIALIZED", value} as const)

export const initializedAppTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.me()
    if (res.data.resultCode===0){
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } else {

    }
    dispatch(setAppIsInitializedAC(true))
}