import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import { Typography } from "@material-ui/core";
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
import firebaseService from "../../firebase_services/firebaseService"
import LinearProgressWithLabel from 'components/LinearProgress/LinearProgressWithLabel';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

// const useStyles = makeStyles(styles);

export default function Dashboard(props) {

  const [wordsLength, setWordsLength] = useState([0, 0, 0, 0]);
  const [storiesLength, setStoriesLength] = useState([0, 0, 0, 0]);
  const [userData, setUserData] = useState({game: -1, story: -1, words: -1, test: -1});
  const userStatus = firebaseService.user
  // const { text, data } = getNameCategory(subCategory)

  useEffect(
    () => {
      for (let i = 1; i <= 4; i++) {
        firebaseService.getWordsStoriesLength(`category${i}`).then(storiesWords => {
          var storiesCategory = storiesLength;
          storiesCategory[i - 1] = storiesWords.story
          setStoriesLength(storiesCategory);
          var wordsCategory = wordsLength;
          wordsCategory[i - 1] = storiesWords.word
          setWordsLength(wordsCategory);
        })
      }
      console.log(wordsLength);
      console.log(storiesLength);
    },
  );

  function totalWords(){
    let userWords = userStatus['category1'].holdingWords + userStatus['category2'].holdingWords + userStatus['category3'].holdingWords + userStatus['category4'].holdingWords
    let percentWords = (userWords * 100) / (wordsLength[0] + wordsLength[1] + wordsLength[2] + wordsLength[3])
    console.log(percentWords);
    return percentWords
  }

  function totalStories(){
    let userStories = userStatus['category1'].holdingStory + userStatus['category2'].holdingStory + userStatus['category3'].holdingStory + userStatus['category4'].holdingStory
    let percentStories = (userStories * 100) / (storiesLength[0] + storiesLength[1] + storiesLength[2] + storiesLength[3])
    console.log(percentStories);
    return percentStories
  }

  function totalGames(){
    let userGames = 0;
    for(let i = 1; i <= 4; i ++){
      userGames += userStatus[`category${i}`].game ?? 1 
    }
    // let userStories =  + userStatus['category2'].holdingStory + userStatus['category3'].holdingStory + userStatus['category4'].holdingStory
    let percentGames = (userGames * 100) / 4
    console.log(percentGames);
    return percentGames
  }

  function totalTests(){
    let userTests = 0;
    for (let i = 1; i <= 4; i++) {
      userTests += userStatus[`category${i}`].test != -1 ?? 1
    }
    // let userStories =  + userStatus['category2'].holdingStory + userStatus['category3'].holdingStory + userStatus['category4'].holdingStory
    let percentTests = (userTests * 100) / 4
    console.log(percentTests);
    return percentTests
  }


  // const user = useContext(UserContext);
  // const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={10} md={10}>
          <LinearProgressWithLabel value={totalWords()} />
        </GridItem>
        <GridItem xs={12} sm={10} md={10}>
          <Typography>סך מילים שנלמדו</Typography>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={10} md={10}>
          <LinearProgressWithLabel value={totalStories()} />
        </GridItem>
        <GridItem xs={12} sm={10} md={10}>
          <Typography>סיפורים שנקראו</Typography>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={10} md={10}>
          <LinearProgressWithLabel value={totalGames()} />
        </GridItem>
        <GridItem xs={12} sm={10} md={10}>
          <Typography>משחקים ששוחקו</Typography>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={10} md={10}>
          <LinearProgressWithLabel value={totalTests()} />
        </GridItem>
        <GridItem xs={12} sm={10} md={10}>
          <Typography>מבחנים שנעשו</Typography>
        </GridItem>
      </GridContainer>

    </div>
  );
}
