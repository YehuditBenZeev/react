import React from 'react';
import { useState, useEffect } from 'react';
import firebaseService from './firebase_services/firebaseService';
import SignedApp from './SignedApp';

import db from './firebase.config';


function LoginPage() {
    const [signed, setSigned] = useState(false);
    const [inputFields, setInputFields] = useState({ email: '', password: ''}); // '' is the initial state value
    const [name, setName] = useState('');

    function mySubmitHandler(event) {
        event.preventDefault();
        firebaseService.userLogin(inputFields).then((value) => {
                setName(value)
                setSigned(true);
        }
        ).catch(error=>{
            setSigned(false);
        })
    }

    function myChangeHandler(event) {
        <iframe src='http://docs.google.com/gview?embedded=true&url=gs://react-english-e6bf1.appspot.com'/>

    }

    return signed ? <SignedApp displayName={name}/> : (
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
    );
}

export default StoryPage;