import React from "react";
import UserStatus from 'views/userStatus/userStatus'
import { SwitchCategory } from '../../routes/categoryRoutes'
import { useRouteMatch } from "react-router-dom";


function Begginers(props) {
  let match = useRouteMatch();

  if (props.location.state != null)
    return (
      <div>{SwitchCategory(match.url)}</div>
    )
  else
    return (
      <UserStatus category="category1" />
    )
}

export default Begginers;