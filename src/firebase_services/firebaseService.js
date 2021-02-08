import firebaseConfig from './firebaseServiceConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

class FirebaseService {
    init(success) {
        if (firebase.apps.length) {
            return;
        }
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        success(true);
    }

    UserSignUp = (userDetails) => {
        const { email, password, displayName } = userDetails;
        return new Promise((res, rej) => {
            this.auth && this.auth.createUserWithEmailAndPassword(email, password).then(
                (response) => {
                    console.log(response);
                    const user = response.user;
                    this.db.collection('users').doc(user.uid).set({
                        email: email,
                        displayName: displayName
                    }).then(() => {
                        res(true)
                    }).catch((err) => rej(false))
                }
            ).catch(error => {
                console.log(error);
                const usernameErrorCodes = [
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];

                const emailErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email'
                ];

                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];

                const response = {
                    email: emailErrorCodes.includes(error.code) ? error.message : null,
                    displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password: passwordErrorCodes.includes(error.code) ? error.message : null
                };
                rej(response)
            });
        }
        )
    }

    userLogin = (userDetails) => {
        const { email, password } = userDetails;
        return new Promise((resolve, reject) => {
            this.auth && this.auth.signInWithEmailAndPassword(email, password).then((response) => {
                this.getUserData(response.user.uid).then((user) => {
                    resolve(user.displayName);
                }).catch(err => {
                    reject(err)
                }).catch(error => {
                        const usernameErrorCodes = [
                            'auth/email-already-in-use',
                            'auth/invalid-email',
                            'auth/operation-not-allowed',
                            'auth/user-not-found',
                            'auth/user-disabled'
                        ];
                        const passwordErrorCodes = [
                            'auth/weak-password',
                            'auth/wrong-password'
                        ];
    
                        const response = {
                            username: usernameErrorCodes.includes(error.code) ? error.message : null,
                            password: passwordErrorCodes.includes(error.code) ? error.message : null
                        };
                        reject(response)
                    })
            })
        })
    }

    getUserData = (uid) => {
        return new Promise((resolve, reject) => {
            this.db.collection('users').doc(uid).get().then((user) => {
                resolve(user.data());
            }).catch((error) => {
                reject(error)
            })
        })

    }

    onAuthStateChanged = (callback) => {
        if (!this.auth) {
            return;
        }
        this.auth.onAuthStateChanged(callback);
    };

}

const instance = new FirebaseService();

export default instance;