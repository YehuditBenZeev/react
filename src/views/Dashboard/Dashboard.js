import React, { useState, useEffect } from "react";
import { Link, makeStyles } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import firebaseService from "../../firebase_services/firebaseService"
import LinearProgressWithLabel from 'components/LinearProgress/LinearProgressWithLabel';
import Muted from 'components/Typography/Muted'
import Info from 'components/Typography/Info'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { Link as RouterLink } from 'react-router-dom';


export default function Dashboard(props) {

  const [wordsLength, setWordsLength] = useState([0, 0, 0, 0]);
  const [storiesLength, setStoriesLength] = useState([0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const userStatus = firebaseService.user

  useEffect(() => {
    async function getData() {
      let i;
      for (i = 1; i <= 4; i++) {
        let storiesWords = await firebaseService.getWordsStoriesLength(`category${i}`)
        var storiesCategory = storiesLength;
        storiesCategory[i - 1] = storiesWords.story
        setStoriesLength([...storiesCategory]);
        var wordsCategory = wordsLength;
        wordsCategory[i - 1] = storiesWords.word
        setWordsLength([...wordsCategory]);
      }
      if (i == 5)
        setLoading(false);
    }
    getData()
  }, []
  );

  return (
    loading ? <LinearProgressWithLabel /> :
      <div>
        <div className="sm:center center block">
          <Muted variant="h2" component="h2"
            className="text-72 leading-none text-white">שלום {userStatus.displayName},
        </Muted>
        </div>
        <OneCardStatus category='begginers' user={userStatus['category1']} wordsCount={wordsLength[0]} storyCount={storiesLength[0]} categoryName="מתחילים" />
        <OneCardStatus category='students' user={userStatus['category2']} wordsCount={wordsLength[1]} storyCount={storiesLength[1]} categoryName="תלמידים" />
        <OneCardStatus category='advanced' user={userStatus['category3']} wordsCount={wordsLength[2]} storyCount={storiesLength[2]} categoryName="מתקדמים" />
        <OneCardStatus category='buisness' user={userStatus['category4']} wordsCount={wordsLength[3]} storyCount={storiesLength[3]} categoryName="עסקים" />

      </div>
  )
}

const useStyles = makeStyles((theme) => ({
  card: {
    maxHeight: "100%",
    maxWidth: "100%",
    backgroundSize: "cover",
    aspectRatio: 1,
    borderRadius: '50%',
  }
}));


function OneCardStatus(props) {
  const classes = useStyles();
  const { category, user, wordsCount, storyCount, categoryName } = props;

  return (
    <div style={{ marginBottom: '7rem', marginTop: '3rem' }}>
      <Link
        component={RouterLink}
        underline='none'
        to={{ pathname: `/admin/${category}` }}
      >
        {/* <GridItem xs={12} sm={12} md={12}> */}
        <Card hoverable>
          <CardHeader color="info">
            <div className="sm:center text-center center block">
              <Info fontSize="1.8vw" variant="h2" component="h2"
                className="text-72 leading-none text-white">{categoryName}
              </Info>
            </div>
          </CardHeader>
          <CardBody>
            <GridContainer spacing={40}>
              <GridItem xs={12} sm={6}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <div style={{ marginLeft: '0.5rem' }}>
                    <Muted fontSize="2.4vw" variant="h2" component="h2"
                      className="text-72 leading-none text-white">{`לימוד מילים:`}
                    </Muted>
                  </div>
                  <Muted fontSize="2.4vw" variant="h2" component="h2"
                    className="text-72 leading-none text-white">{user.holdingWords < wordsCount ? `${user.holdingWords}/${wordsCount}` : "הושלם"}
                  </Muted>
                </div>
              </GridItem>
              <GridItem xs={12} sm={6}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <div style={{ marginLeft: '0.5rem' }}>
                    <Muted fontSize="2.4vw" variant="h2" component="h2"
                      className="text-72 leading-none text-white">{`משחק:`}
                    </Muted>
                  </div>
                  <Muted fontSize="2.4vw" variant="h2" component="h2"
                    className="text-72 leading-none text-white">{!user.game ? `לא הושלם` : "הושלם"}
                  </Muted>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer spacing={40}>
              <GridItem xs={12} sm={6}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <div style={{ marginLeft: '0.5rem' }}>
                    <Muted fontSize="2.4vw" variant="h2" component="h2"
                      className="text-72 leading-none text-white">{`קריאת סיפור:`}
                    </Muted>
                  </div>
                  <Muted fontSize="2.4vw" variant="h2" component="h2"
                    className="text-72 leading-none text-white">{user.holdingStory < storyCount ? `${user.holdingStory}/${storyCount}` : "הושלם"}
                  </Muted>
                </div>
              </GridItem>
              <GridItem xs={12} sm={6}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <div style={{ marginLeft: '0.5rem' }}>
                    <Muted fontSize="2.4vw" variant="h2" component="h2"
                      className="text-72 leading-none text-white">{`מבחן:`}
                    </Muted>
                  </div>
                  <Muted fontSize="2.4vw" variant="h2" component="h2"
                    className="text-72 leading-none text-white">{user.test < 100 ? user.test == -1 ? `0%` : `${user.test}%` : "הושלם"}
                  </Muted>
                </div>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
        {/* </GridItem> */}
      </Link>
    </div>
  );
}
