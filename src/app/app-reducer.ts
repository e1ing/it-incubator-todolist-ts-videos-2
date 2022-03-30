export type RequestStatusType =  'idle'|'loading'|'succeeded'|'failed'
export type AppInitialStateType = {
    status: RequestStatusType
    error: string|null
}


const initialState: AppInitialStateType ={
    status: 'idle',
    error: "Some error"
}

export type SetErrorAT = ReturnType<typeof setErrorAC>
export type SetStatusAT = ReturnType<typeof setStatusAC>
export type AppActionType = SetErrorAT|SetStatusAT


export const appReducer = (state:AppInitialStateType=initialState, action: AppActionType):AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setErrorAC = (error: string|null) => ({type: "APP/SET-ERROR", error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)