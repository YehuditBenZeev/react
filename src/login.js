import React from 'react';
import { useState, useEffect } from 'react';
import firebaseService from './firebase_services/firebaseService';
import SignedApp from './SignedApp';


function LoginPage() {
    const [signed, setSigned] = useState(false);
    const [inputFields, setInputFields] = useState({ email: '', password: ''}); // '' is the initial state value
    let displayName = ''

    function mySubmitHandler(event) {
        event.preventDefault();
        firebaseService.userLogin(inputFields).then((value) => {
                displayName = value;
                setSigned(true);
        }
        ).catch(error=>{
            setSigned(false);
        })
    }

    function myChangeHandler(event) {
        setInputFields({ ...inputFields, [event.target.name]: event.target.value })
    }

    return signed ? <SignedApp displayName={displayName}/> : (
        <div>
            <form onSubmit={mySubmitHandler}>
                <p>Enter your email:</p>
                <input
                    type='text'
                    name='email'
                    onChange={myChangeHandler}
                />
                <p>Enter your password:</p>

                <input
                    type='text'
                    name='password'
                    onChange={myChangeHandler}
                />
                <br />
                <br />
                <input type='submit' />
            </form>
        </div>
    );
}

export default LoginPage;
