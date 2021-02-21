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
        const { email, password, username } = userDetails;
        return new Promise((res, rej) => {
            this.auth && this.auth.createUserWithEmailAndPassword(email, password).then(
                (response) => {
                    const user = response.user;
                    console.log("here22");
                    this.db.collection('users').doc(user.uid).set({
                        email: email,
                        displayName: username,
                        category1: {
                            game: false,
                            holdingStory: 0,
                            holdingWords: 0,
                            test: -1
                        },
                        category2: {
                            game: false,
                            holdingStory: 0,
                            holdingWords: 0,
                            test: -1
                        },
                        category3: {
                            game: false,
                            holdingStory: 0,
                            holdingWords: 0,
                            test: -1
                        },
                        category4: {
                            game: false,
                            holdingStory: 0,
                            holdingWords: 0,
                            test: -1
                        }
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
                this.getUserDocument(response.user.uid).then((user) => {
                    resolve(user);
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
    signOut = () => {
        if (!this.auth) {
            return;
        }
        this.auth.signOut();
    };


    onAuthStateChanged = (callback) => {
        if (!this.auth) {
            return;
        }
        this.auth.onAuthStateChanged(callback);
    }

    //get words by category
    getWordsByCategory = (category) => {
        return new Promise((resolve, reject) => {
            this.db.collection('words').doc(category).get().then((word) => {
                resolve(word.data());
            }).catch((error) => {
                reject(error)
            })
        })
    };

    generateUserDocument = async (user, additionalData) => {
        if (!user) return;
        const userRef = this.db.collection('users').doc(user.uid);
        const snapshot = await userRef.get();
        if (!snapshot.exists) {
            const { email, displayName, photoURL } = user;
            try {
                await userRef.set({
                    displayName,
                    email,
                    photoURL,
                    ...additionalData
                });
            } catch (error) {
                console.error("Error creating user document", error);
            }
        }
        return this.getUserDocument(user.uid);
    };

    getUserDocument = async uid => {
        if (!uid) return null;
        try {
            const userDocument = await this.db.collection('users').doc(uid).get();
            return {
                uid,
                ...userDocument.data()
            };
        } catch (error) {
            console.error("Error fetching user", error);
        }
    };

}

const instance = new FirebaseService();

export default instance;