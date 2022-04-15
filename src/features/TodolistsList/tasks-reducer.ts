import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ tasks: TaskType }>) {
            state[action.payload.tasks.todoListId].unshift(action.payload.tasks)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string, model: UpdateTaskModelType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            actoin.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
        }
        });
        /* [addTodolistAC.type]: (state, action: PayloadAction<{}>) => {

         },
         [removeTodolistAC.type]: (state, action: PayloadAction<{}>) => {

         },
         [setTodolistsAC().type]: (state, action: PayloadAction<{}>) => {

         },*/
    }
})

export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}


// thunks
export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    dispatch(setTasksAC({res.data.items, todolistId}))
    dispatch(setAppStatusAC({status: 'succeeded'}))
}
export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch) => {
    const res = await todolistsAPI.deleteTask(todolistId, taskId)
    const action = removeTaskAC({taskId, todolistId})
    dispatch(action)
}
export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            const action = addTaskAC({task})
            dispatch(action)
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC({res.data.messages[0]}));
            } else {
                dispatch(setAppErrorAC({error: "Some error occcured"}))
            }
            dispatch(setAppStatusAC({status: 'failed'}))
        }
    } catch (error) {
        dispatch(setAppErrorAC(error.message))
        dispatch(setAppStatusAC({status: 'failed'}))
    }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
    (dispatch,
     getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskId, model, todolistId}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }


