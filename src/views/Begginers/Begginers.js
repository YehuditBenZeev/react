import { Card } from '@material-ui/core';
import React from "react";
import {SwitchCategory} from '../../routes/categoryRoutes'
import {useRouteMatch} from "react-router-dom";


function Begginers(props) {
    let match = useRouteMatch();
    return (
        <div>{SwitchCategory(match.url)}</div>
    )
}

export default Begginers;