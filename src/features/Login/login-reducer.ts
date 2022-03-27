import {Dispatch} from "redux";
import {AppThunk} from "../../app/store";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError} from "../../utils/error-utils";
import {updateTaskAC} from "../TodolistsList/tasks-reducer";
import {setStatusAC} from "../../app/app-reducer";


const initialState = {
    email: "",
    password: "",
    rememberMe: false
}

type InitialStateType = typeof initialState
type LoginActionType = any

export const loginReducer = (state = initialState, action: LoginActionType): InitialStateType=> {
    switch(action.type){
        case "":
        default:
                return state
    }
}

//const loginAC = () => {()as const }

export const loginTC = (data: LoginParamsType):AppThunk => async dispatch=>{
    dispatch(setStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            alert('Hurray')
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }
    catch (error) {

    }

}