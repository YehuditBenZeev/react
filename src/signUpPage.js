import React from 'react';
import { useState, useEffect } from 'react';
import firebaseService from './firebase_services/firebaseService';
import SignedApp from './SignedApp';


function SignUpPage() {
    const [signed, setSigned] = useState(false);
    const [inputFields, setInputFields] = useState({ email: '', password: '', displayName: '' }); // '' is the initial state value

    function mySubmitHandler(event) {
        event.preventDefault();
        firebaseService.UserSignUp(inputFields).then((value) => {
                setSigned(true);
        }
        ).catch(error=>{
            setSigned(false);
        })
    }

    function myChangeHandler(event) {
        setInputFields({ ...inputFields, [event.target.name]: event.target.value })
    }

    return signed ? <SignedApp displayName = {inputFields.displayName}/>: (
        <div>
            <form onSubmit={mySubmitHandler}>
                <p>Enter your name:</p>
                <input
                    type='text'
                    name='displayName'
                    onChange={myChangeHandler}
                />
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

export default SignUpPage;
