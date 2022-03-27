import React from "react"
import {useFormik} from "formik";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {useDispatch} from "react-redux";
import {loginTC} from "./login-reducer";

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
        },
    });

    return (
        <Grid container>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
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
                                    control={<Checkbox
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps('email')}
                                    />}

                                />
                            </FormGroup>
                        </FormLabel>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}