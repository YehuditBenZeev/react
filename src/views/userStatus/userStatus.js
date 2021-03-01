import React, { useState, useEffect } from "react";
import CategoryStatus from '../../variables/categoryStatus'
import GridContainer from "components/Grid/GridContainer.js";
import firebaseService from '../../firebase_services/firebaseService'

function UserStatus(props) {

       return (
    <div>
      <GridContainer justify="space-evenly">
        <CategoryStatus subCategory = "learnWords" category = {props.category}/>
        <CategoryStatus subCategory = "story" category = {props.category}/>
      </GridContainer>
      <GridContainer justify="space-evenly" >
        <CategoryStatus subCategory = "game" category = {props.category}/>
        <CategoryStatus subCategory = "test" category = {props.category}/>
      </GridContainer>
    </div>
  ) 


}

export default UserStatus;