import React, {Component} from 'react';
import firebaseService from './firebase_services/firebaseService';
import SignUpPage from './signUpPage';
import LoginPage from './login';

class Auth extends Component {
    state = {
        waitAuthCheck: true
    }

    componentDidMount()
    {
        return Promise.all([
            this.firebaseCheck(),
        ]).then(() => {
            this.setState({waitAuthCheck: false})
        })
    }
    firebaseCheck = () => new Promise(resolve => {

        firebaseService.init(
            success => {
                if ( !success )
                {
                    resolve();
                }
            }
        );

        firebaseService.onAuthStateChanged(authUser => {
            if ( authUser )
            {
                console.log({message: 'Logging in with Firebase'});

                /**
                 * Retrieve user data from Firebase
                 */
            }
            else{
                resolve();
            }
        });
        return Promise.resolve();
    })
    render(){
        return <SignUpPage/>
    }
}

export default Auth;