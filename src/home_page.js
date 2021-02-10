import React from 'react';
import { useState, useEffect } from 'react';
import firebaseService from './firebase_services/firebaseService';
import SignedApp from './SignedApp';
import {Button, Table} from '@material-ui/core';



function Beginner() {
    return (
       <div className="be">
          <Button variant="primary" size="lg">
            אנגלית  jjj למתחילים
          </Button>
        </div>
      );
  }
  
function activateLasers(){
    render(<Beginner/>, document.getElementById("main"));
  }

function LoadingHomePage() {
    return (
      <Table striped bordered hover>
      <tbody>
        <tr>
          התקדמות
        </tr>
        
        <tr>
          <td>
             <div className="level">
               <br />
              <Button variant="primary" size="lg" onClick={activateLasers}>
                אנגלית למתחילים
              </Button>{' '}
               <br/>
              <Button variant="student" size="lg">
                אנגלית לסטודנט
              </Button>
               <br/>
              <Button variant="advance" size="lg">
                אנגלית למתקדמים
              </Button>{' '}
               <br/>
              <Button variant="business" size="lg">
                אנגלית עסקית
              </Button>
               <br/>
            </div>
             <br/>
           </td>
           
           <td>
            <div id="main">
            </div>
           </td>
           
        </tr>
    
      </tbody>
    </Table>
  
    );
}
  
render(<LoadingHomePage/>);
render(<Beginner/>); 

export default HomePage;