import React from 'react';
import { useState, useRef, useEffect} from 'react';
import firebaseService from 'firebase_services/firebaseService';
import { InputAdornment, Icon, Typography, Card, CardContent } from '@material-ui/core';
import { Link, } from "react-router-dom";
import CustomTextField from "components/CustomInput/CustomInput.js";
import RegularButton from "components/CustomButtons/Button";
import Formsy from 'formsy-react';

  
function Login() {
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    // const login = useSelector(({ auth }) => auth.login);

    const [error, setError] = useState({email: null, password: null})


    useEffect(() => {
        if (error && (error.email || error.password)) {
            formRef.current.updateInputsWithError({
                ...error
            });
            disableButton();
        }
    }, [error]);

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {
        firebaseService.userLogin(model).then((value) => {
            window.location.href = '/'
        }
        ).catch(err => {
            console.log(err)
            setError({email: err.email, password: err.password});
            console.log(error);
        })
    }

    return (

        <Card className="max-w-400 mx-auto m-16 md:m-0" style = {{borderRadius: 10}} square>

        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
                <Typography variant="h6" className="text-center md:w-full mb-48">ברוך שובך</Typography>
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
                        name="email"
                        label="אימייל"
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
                    />
                    <CustomTextField
                        className="pb-16"
                        type="password"
                        name="password"
                        label="סיסמא"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{

                            minLength: 'Min character length is 4'
                        }}
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
                   אין לך חשבון? &nbsp; 
                <Link
                    variant = "body2"
                    color="info"
                    to="/registration/signUp"
                    className="text-center md:w-full mt-4 "
                >
                    הרשם עכשיו
                </Link>
            </Typography>
            </div>
            </CardContent>
        </Card>
    );
}

export default Login;
