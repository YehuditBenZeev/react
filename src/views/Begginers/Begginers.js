import { Card } from '@material-ui/core';
import React from "react";
import LearnWords from 'views/LearnWords/LearnWords';


function Begginers(){
    return (
        <Card>
            <LearnWords category='category1'/>      
        </Card>
    )
}

export default Begginers;