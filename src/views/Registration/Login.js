import React from 'react';
import { useState, useRef,} from 'react';
import firebaseService from 'firebase_services/firebaseService';
import { Button, InputAdornment, Icon, TextField, Typography, Card, CardContent } from '@material-ui/core';
import { Route, Link, Router, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import { createBrowserHistory } from "history";

import ReactDOM from "react-dom";



function Login() {
    const [signed, setSigned] = useState(false);
    const [inputFields, setInputFields] = useState({ email: '', password: '' }); // '' is the initial state value
    const [name, setName] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    function changeValue(event) {
        setInputFields({ ...inputFields, [event.target.name]: event.target.value })

    }

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        firebaseService.userLogin(inputFields).then((value) => {
            ReactDOM.render(
                <Router history={createBrowserHistory()}><Route path="/admin" component={Admin} /></Router>
            , document.getElementById("root"))
            window.location.href = '/admin/dashboard'
        }
        ).catch(error => {
        })
    }

    return (
        <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

            <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                <Typography variant="h6" className="text-center md:w-full mb-48">LOGIN TO YOUR ACCOUNT</Typography>
                <form onSubmit={handleSubmit} >
                    <TextField
                        className="mb-16"
                        type="text"
                        name="email"
                        label="Email"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                        onChange={changeValue}
                    // error={Boolean(errorMessage)}
                    // helperText={errorMessage}
                    />
                    <TextField
                        className="mb-16"
                        type="text"
                        name="password"
                        label="Password"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                        onChange={changeValue}
                    // error={Boolean(errorMessage)}
                    // helperText={errorMessage}
                    />
                    <Button
                    onSubmit = {handleSubmit}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="w-full mx-auto normal-case mt-16"
                    aria-label="LOG IN"
                    value="firebase">
                        Log in
                    </Button>
                    <Button
                                          component={Link}
                                          to="/registration/signUp"
                    variant="contained"
                    color="secondary"
                    className="w-full mx-auto normal-case mt-16"
                    aria-label="LOG IN"

                    value="firebase">
                        Sign Up
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default Login;
