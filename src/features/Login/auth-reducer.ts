import {AppThunk} from "../../app/store";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {createSlice} from "@reduxjs/toolkit";
import {Dispatch} from "redux";


const initialState = {
   isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: any){
            state.isLoggedIn = action.value
        }
    }
})


export const authReducer =  slice.reducer;
export const {setIsLoggedInAC} = slice.actions

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) =>{
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

export const logoutTC = () => async (dispatch: Dispatch)  => {
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