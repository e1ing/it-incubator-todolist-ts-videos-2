import {setAppErrorAC, SetErrorAT, setAppStatusAC, SetStatusAT} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError= <D> (data: ResponseType<D>, dispatch : Dispatch<SetErrorAT|SetStatusAT>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC("Some error occcured"))
    }
    dispatch(setAppStatusAC('failed'))

}

export const handleServerNetworkError = (error:{message: string}, dispatch : Dispatch<SetErrorAT|SetStatusAT>) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}