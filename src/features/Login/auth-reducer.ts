import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";


const initialState = {
   isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value:boolean}>){
            state.isLoggedIn = action.payload.value
        }
    }
})


export const authReducer =  slice.reducer;
export const {setIsLoggedInAC} = slice.actions

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) =>{
    debugger
    dispatch(setAppStatusAC({status: 'loading'}))
        authAPI.login(data)
            .then (res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value: true}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch ((error) => {
                handleServerAppError(error, dispatch)
            })
}

export const logoutTC = () => async (dispatch: Dispatch)  => {
    dispatch(setAppStatusAC({status:'loading'}))
    try{
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }
  catch (error) {
      const res = await authAPI.logout()
      handleServerAppError(res.data, dispatch)
  }
}