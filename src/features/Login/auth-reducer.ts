import {AppThunk} from "../../app/store";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError} from "../../utils/error-utils";
import {AppActionType, setStatusAC} from "../../app/app-reducer";


const initialState: InitialStateType = {
   isLoggedIn: false
}

type InitialStateType = {
    isLoggedIn: boolean
}
export type AuthActionType = ReturnType<typeof setIsLoggedInAC>|AppActionType

export const authReducer = (state = initialState, action: AuthActionType): InitialStateType=> {
    switch(action.type){
        case "login/SET_IS-LOGGED_IN":
            return {...state, isLoggedIn: action.value}
        default:
                return state
    }
}

const setIsLoggedInAC = (value: boolean) => ({type: "login/SET_IS-LOGGED_IN", value} as const)

export const loginTC = (data: LoginParamsType):AppThunk => (dispatch) =>{
    dispatch(setStatusAC('loading'))
        authAPI.login(data)
            .then (res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch ((error) => {
                handleServerAppError(error, dispatch)
            })
}