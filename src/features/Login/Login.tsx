import React from "react"
import {useFormik} from "formik";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import {Grid, Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import {useDispatch} from "react-redux";
import {loginTC} from "./auth-reducer";

export const Login = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email ia required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password ia required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm();
        },
    });

    return (
        <Grid container justify={"center"}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}>here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                            <FormGroup>
                                <TextField
                                    label={"Email"}
                                    margin="normal"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                <TextField
                                    type={"password"}
                                    label={"Password"}
                                    margin="normal"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                                <FormControlLabel
                                    label={"Remember me"}
                                    control={<Checkbox/>}
                                    checked={formik.values.rememberMe}
                                    {...formik.getFieldProps('rememberMe')}
                                />
                                <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>

                            </FormGroup>
                        </FormLabel>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}