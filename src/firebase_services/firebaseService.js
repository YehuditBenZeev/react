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
                    console.log(response);
                    const user = response.user;
                    this.db.collection('users').doc(user.uid).set({
                        email: email,
                        displayName: username
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
    signOut = () => {
		if (!this.auth) {
			return;
		}
		this.auth.signOut();
	};

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
        return getDataByCategory(category, "holdingWord", this.user);
    }

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
          this.user = userDocument.data();
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