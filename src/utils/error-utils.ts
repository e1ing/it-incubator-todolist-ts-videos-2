import {setErrorAC, SetErrorAT, setStatusAC, SetStatusAT} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError= <D> (data: ResponseType<D>, dispatch : Dispatch<SetErrorAT|SetStatusAT>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]));
    } else {
        dispatch(setErrorAC("Some error occcured"))
    }
    dispatch(setStatusAC('failed'))

}

export const handleServerNetworkError = (error:{message: string}, dispatch : Dispatch<SetErrorAT|SetStatusAT>) => {
    dispatch(setErrorAC(error.message))
    dispatch(setStatusAC('failed'))
}