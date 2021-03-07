import React, {Component} from 'react';
import firebaseService from 'firebase_services/firebaseService';
import Registration from "layouts/Registration.js";
import Admin from "layouts/Admin.js";


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
                // firebaseService.getUserData(authUser.uid).then(user => {

                    // this.props.setUserDataFirebase(user, authUser);

                    resolve();

                    console.log({message: 'Logged in with Firebase'});
                    resolve();
            }
            else{
                resolve();
            }
        });
        return Promise.resolve();
    })
    render(){
        return this.state.waitAuthCheck ?  <Registration/> : <Admin/>
    }
}

export default Auth;