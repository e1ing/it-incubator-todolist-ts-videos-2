import React, {FC, useCallback, useEffect} from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import {AppRootStateType} from "./store";
import {useDispatch, useSelector} from "react-redux";
import { Route, Routes } from 'react-router-dom';
import {Login} from "../features/Login/Login";
import CircularProgress from '@mui/material/CircularProgress';
import {logoutTC} from "../features/Login/auth-reducer";


type AppPropsType = {
    demo?: boolean
}

const App: FC<AppPropsType> = ({demo = false}) => {
const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
const isLoggedIn = useSelector<AppRootStateType, boolean>(state=>state.auth.isLoggedIn)
const isIntialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
const dispatch = useDispatch();

    useEffect(()=>{
        dispatch (initializedAppTC());
    }, [])

    const logoutHandler = useCallback(()=>{
        dispatch(logoutTC())
    }, [])

    if(!isIntialized){
        return <div style={{position: "fixed", top:"30%", left:"50%", textAlign: "center", width:"100%"}}>
            <CircularProgress />
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                <Route path={"/login"} element={ <Login/>}/>
                <Route path={"/"} element={ <TodolistsList/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
