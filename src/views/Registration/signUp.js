import React from 'react';
import ReactDOM from "react-dom";

import { useState, useEffect } from 'react';
import firebaseService from 'firebase_services/firebaseService';
import { Button, InputAdornment, Icon, TextField, Typography, Card, CardContent } from '@material-ui/core';
import { Route, Link, Router, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import { createBrowserHistory } from "history";

function SignUp() {
    const [signed, setSigned] = useState(false);
    const [inputFields, setInputFields] = useState({ email: '', password: '', displayName: '' }); // '' is the initial state value

    function mySubmitHandler(event) {
        event.preventDefault();
        firebaseService.UserSignUp(inputFields).then((value) => {
            ReactDOM.render(
                <Router history={createBrowserHistory()}><Route path="/admin" component={Admin} /></Router>
            , document.getElementById("root"))
            window.location.href = '/admin/dashboard'        }
        ).catch(error => {
            setSigned(false);
        })
    }

    function myChangeHandler(event) {
        setInputFields({ ...inputFields, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <form onSubmit={mySubmitHandler}>
                <TextField
                    className="mb-16"
                    type="text"
                    name="name"
                    label="Name"
                    validations={{
                        minLength: 4
                    }}
                    // validationErrors={{
                    //     minLength: 'Min character length is 4'
                    // }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    onChange={myChangeHandler}
                    required
                // error={Boolean(errorMessage)}
                // helperText={errorMessage}
                />
                <TextField
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Email"
                    validations={{
                        minLength: 4
                    }}
                    // validationErrors={{
                    //     minLength: 'Min character length is 4'
                    // }}
                    onChange={myChangeHandler}

                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
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
                    // validationErrors={{
                    //     minLength: 'Min character length is 4'
                    // }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                    onChange={myChangeHandler}

                // error={Boolean(errorMessage)}
                // helperText={errorMessage}
                />
                <Button
                    onSubmit={mySubmitHandler}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="w-full mx-auto normal-case mt-16"
                    aria-label="LOG IN"
                    value="firebase">
                    Sign Up
                </Button>
            </form>
        </div>
    );
}

export default SignUp;
