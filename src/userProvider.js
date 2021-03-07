import React, { Component, createContext } from "react";
import firebaseService from 'firebase_services/firebaseService';


export const UserContext = createContext({ user: null });
class UserProvider extends Component {

  state = {
    user: null,
    loading: true
  };

  constructor() {
    super();

  }

  componentDidMount = () => {
    firebaseService.init(
        success => {
            if ( !success )
                return;
        }
    );
    firebaseService.onAuthStateChanged(async userAuth => {
      if(userAuth == null){
        this.setState({user: false});
      }
      else{
        await firebaseService.generateUserDocument(userAuth);
        this.setState({user:true });
      }
    });
  };
  render() {

    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;