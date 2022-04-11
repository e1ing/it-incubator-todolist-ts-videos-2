import {AppThunk} from "../../app/store";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError} from "../../utils/error-utils";
import {AppActionType, setAppStatusAC} from "../../app/app-reducer";
import {createSlice} from "@reduxjs/toolkit";


const initialState: InitialStateType = {
   isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

    }
})


type InitialStateType = {
    isLoggedIn: boolean
}
export type AuthActionType = ReturnType<typeof setIsLoggedInAC>|AppActionType

export const authReducer =  slice.reducer; /*(state = initialState, action: AuthActionType): InitialStateType=> {
    switch(action.type){
        case "login/SET_IS-LOGGED_IN":
            return {...state, isLoggedIn: action.value}
        default:
                return state
    }
}*/

export const setIsLoggedInAC = (value: boolean) => ({type: "login/SET_IS-LOGGED_IN", value} as const)

export const loginTC = (data: LoginParamsType):AppThunk => (dispatch) =>{
    debugger
    dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then (res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch ((error) => {
                handleServerAppError(error, dispatch)
            })
}

export const logoutTC = (): AppThunk => async dispatch  => {
    dispatch(setAppStatusAC('loading'))
    try{
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }
  catch (error) {
      const res = await authAPI.logout()
      handleServerAppError(res.data, dispatch)
  }
}