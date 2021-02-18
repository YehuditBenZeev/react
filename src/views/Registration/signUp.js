import React from 'react';
import { useState, useRef, } from 'react';
import firebaseService from 'firebase_services/firebaseService';
import { Button, InputAdornment, Icon, Typography, Card, CardContent } from '@material-ui/core';
import { Route, Link, Router, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import CustomTextField from "components/CustomInput/CustomInput.js";
import RegularButton from "components/CustomButtons/Button";
import { createBrowserHistory } from "history";
import Formsy from 'formsy-react';
import ReactDOM from "react-dom";

function SignUp() {
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);


    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {
        firebaseService.UserSignUp(model).then((value) => {
            ReactDOM.render(
                <Router history={createBrowserHistory()}><Route path="/admin" component={Admin} /></Router>
                , document.getElementById("root"))
            window.location.href = '/admin/dashboard'
        }
        ).catch(error => {
        })
    }


    return (

        <Card className="max-w-400 mx-auto m-16 md:m-0" style={{ backgroundColor: "transparent" }} square>

            <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
                <Typography variant="h6" className="text-center md:w-full mb-48">ברוך הבא</Typography>
                <div className="w-full">

                    <Formsy
                        onValidSubmit={handleSubmit}
                        onValid={enableButton}
                        onInvalid={disableButton}
                        ref={formRef}
                        className="flex flex-col justify-center w-full">

                        <CustomTextField
                            className="mb-16"
                            type="text"
                            name="username"
                            label="שם פרטי"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                            }}
                            variant="outlined"
                            required
                        />
                        <CustomTextField
                            className="mb-16"
                            type="text"
                            name="email"
                            label="אימייל"
                            validations="isEmail"
                            validationErrors={
                                {
                                    isEmail: "בבקשה הכנס אימייל חוקי"
                                }
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                            }}
                            variant="outlined"
                            required
                        />
                        <CustomTextField
                            className="pb-16"
                            type="password"
                            name="password"
                            label="סיסמא"
                            validations={
                                {
                                    minLength: 6,
                                    maxLength: 20,
                                }
                            }
                            validationErrors={
                                {
                                    minLength: "סיסמא חייבת להיות באורך מינימלי של 6 תוים",
                                    maxLength: "סיסמא יכולה להיות באורך מקסימלי של 20 תוים",
                                }
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                            }}
                            variant="outlined"
                            required
                        />
                        <CustomTextField
                            className="pb-16"
                            type="password"
                            name="password-confirm"
                            label="אשר סיסמא"
                            validations={
                                {
                                    equalsField: "password"
                                }
                            }
                            validationErrors={
                                {
                                    equalsField: "הסיסמאות לא מתאימות"
                                }
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                            }}
                            variant="outlined"
                            required
                        />
                        <RegularButton
                            type="submit"
                            variant="contained"
                            color="info"
                            className="w-full mx-auto normal-case mt-16"
                            aria-label="LOG IN"
                            disabled={!isFormValid}
                            value="firebase">
                            כניסה
                </RegularButton>

                    </Formsy>
                    <Typography className="text-right md:w-full mt-3 ">
                        יש לך כבר חשבון? &nbsp;
                <Link
                            variant="body2"
                            color="info"
                            to="/registration/login"
                            className="text-center md:w-full mt-4 "
                        >
                            כניסה
                            </Link>
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}

export default SignUp;
