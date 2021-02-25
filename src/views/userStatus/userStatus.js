import React, { Component } from "react";
import CategoryStatus from '../../variables/categoryStatus'
import GridContainer from "components/Grid/GridContainer.js";
import firebaseService from '../../firebase_services/firebaseService'

class UserStatus extends Component {
  
    constructor() {
        super();
        this.state = {
            user: firebaseService.user,
        };
    }

  render(){
       return (
    <div>
      <GridContainer justify="space-evenly">
        <CategoryStatus subCategory = "learnWords" category = {this.props.category}/>
        <CategoryStatus subCategory = "story" category = {this.props.category}/>
      </GridContainer>
      <GridContainer justify="space-evenly" >
        <CategoryStatus subCategory = "game" category = {this.props.category}/>
        <CategoryStatus subCategory = "test" category = {this.props.category}/>
      </GridContainer>
    </div>
  ) 
  }

}

export default UserStatus;