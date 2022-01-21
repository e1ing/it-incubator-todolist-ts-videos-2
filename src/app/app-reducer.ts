export type AppInitialStateType = {
    status: 'idle'|'loading'|'succeeded'|'failed'
    error: string|null
}

const initialState: AppInitialStateType ={
    status: 'idle',
    error: "Some erorr"
}

type ActionType = any


export const appReducer = (state:AppInitialStateType=initialState, action: ActionType):AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}