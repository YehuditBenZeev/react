import firebaseConfig from './firebaseServiceConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

// get user category data
function getDataByCategory(category, data, user){
    if(category == "category1")
        return user.category1[data];
    else if(category == "category2")
        return user.category2[data];
    else if(category == "category3")
        return user.category3[data];
    else if(category == "category4")
        return user.category4[data];
}

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
        this.user = null;
        this.uid = null;
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
            this.db.collection("words").doc(category).get().then((word) => {
                resolve(word.data());
            }).catch((error) => {
                reject(error)
            })
        })
    }

    //get holding word index by category for specific user
    getHoldingWordsByCategoryForUser = (category) => {
        return new Promise((resolve, reject) => {
            this.db.collection('users').doc(this.uid).get().then((user) => {
                resolve(getDataByCategory(category, "holdingWords", user.data()));
            }).catch((error) => {
                reject(error)
            })
        })
    }

    //set holding word index by category for specific user
    setHoldingWordsByCategoryForUser = async (category, newValue) => {
        if(category == "category1")
            await this.userRef.set({
                category1: {
                    holdingWords: newValue,
                }
            }, { merge: true });
        else if(category == "category2")
            await this.userRef.set({
                category2: {
                    holdingWords: newValue,
                }
            }, { merge: true });
        else if(category == "category3")
            await this.userRef.set({
                category3: {
                    holdingWords: newValue,
                }
            }, { merge: true });
        else if(category == "category4")
            await this.userRef.set({
                category4: {
                    holdingWords: newValue,
                }
            }, { merge: true });
    }

    //set holding Story index by category for specific user
    setHoldingStoryByCategoryForUser = (category, newValue) => {
        if(category == "category1")
            this.userRef.set({
                category1: {
                    holdingStory: newValue,
                }
            }, { merge: true });
        else if(category == "category2")
            this.userRef.set({
                category2: {
                    holdingStory: newValue,
                }
            }, { merge: true });
        else if(category == "category3")
            this.userRef.set({
                category3: {
                    holdingStory: newValue,
                }
            }, { merge: true });
        else if(category == "category4")
            this.userRef.set({
                category4: {
                    holdingStory: newValue,
                }
            }, { merge: true });
    }

   
     //get story links by category
     getStoryByCategory = (category) => {

        return new Promise((resolve, reject) => {
            this.db.collection("stories").doc(category).get().then((story) => {
                // console.log("getStoryByCategory ", story.data());
                resolve(story.data());
            }).catch((error) => {
                reject(error)
            })
        })

        // return new Promise((resolve, reject) => {
        //     this.db.collection('stories').doc(category).get().then((story) => {
        //         console.log("getStoryByCategory ", story.data());
        //         // console.log(story.data());
        //         resolve(story.data());
        //     }).catch((error) => {
        //         reject(error)
        //     })
        // })
     }

    generateUserDocument = async (user, additionalData) => {
        if (!user) return;
        this.userRef = this.db.collection('users').doc(user.uid);
        const snapshot = await this.userRef.get();
        if (!snapshot.exists) {
            const { email, displayName, photoURL } = user;
            try {
                await this.userRef.set({
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

    updateDocument = async (uid) =>{
        const doc_listener = this.db.collection('users').doc(uid).onSnapshot(snap => {
            this.user = snap.data();
        });
    }

    getUserDocument = async uid => {
        if (!uid) return null;
        try {
          const userDocument = await this.db.collection('users').doc(uid).get();
        //   const doc_listener = this.db.collection('users').doc(uid).onSnapshot(snap => {
        //     this.user = userDocument.data();
        //     this.uid = uid;
        //   });
          this.uid = uid;
          this.user = userDocument.data();
          this.updateDocument(this.uid);
          return {
            uid,
            ...userDocument.data()
          };
        } catch (error) {
            console.error("Error fetching user", error);
        }
    };

    getWordsStoriesLength = category => {
        return new Promise((resolve, reject) => {
            let wordsStories = {};
            this.db.collection("stories").doc(category).get().then((story) => {
                wordsStories['story'] = Object.keys(story.data().stories).length;
                this.db.collection("words").doc(category).get().then(word => {
                    wordsStories['word'] = Object.keys(word.data().words).length;
                    resolve(wordsStories);
                })
            })
        })
    }

}


const instance = new FirebaseService();

export default instance; 