import React from "react";
import UserStatus from 'views/userStatus/userStatus'
import { SwitchCategory } from '../../routes/categoryRoutes'
import { useRouteMatch } from "react-router-dom";


function Students(props){
    let match = useRouteMatch();

    if (props.location.state != null)
        return (
            <div>{SwitchCategory(match.url)}</div>
        )
    else
        return (
            <UserStatus category="category2" />
        )
}

export default Students;