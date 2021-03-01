import React, { useContext } from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { UserContext } from "../../userProvider";
import firebaseService from "firebase_services/firebaseService"
import LinearProgressWithLabel from 'components/LinearProgress/LinearProgressWithLabel';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  // const user = useContext(UserContext);
  const classes = useStyles();
  return (
    <div>
            <GridContainer>
        <GridItem xs={12} sm={10} md={10}>
        <LinearProgressWithLabel value="25" />

        </GridItem>
        </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={10} md={10}>
          <LinearProgressWithLabel value="25" />

        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={10} md={10}>
          <LinearProgressWithLabel value="25" />

        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={10} md={10}>
          <LinearProgressWithLabel value="25" />

        </GridItem>
      </GridContainer>
  
    </div>
  );
}
