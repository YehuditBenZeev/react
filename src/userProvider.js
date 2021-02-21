import React, { Component, createContext } from "react";
import firebaseService from 'firebase_services/firebaseService';

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    firebaseService.init(
        success => {
            if ( !success )
                return;
        }
    );
    firebaseService.onAuthStateChanged(async userAuth => {
        const user = await firebaseService.generateUserDocument(userAuth);
        this.setState({ user });
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