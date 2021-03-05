import { Box, Typography, makeStyles, Link } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import cardBg from "assets/img/cardBg.jpg"
import register from "assets/img/register.jpg"
import Card from "components/Card/Card.js";
import firebaseService from '../firebase_services/firebaseService'
import GridItem from "components/Grid/GridItem.js";
import Info from 'components/Typography/Info'
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { Link as RouterLink } from 'react-router-dom';
import {SwitchCategory  } from "routes/categoryRoutes";

const useStyles = makeStyles((theme) => ({
    card: {
        maxHeight: "100%",
        maxWidth: "100%",
        backgroundSize: "cover",
        aspectRatio: 1,
        borderRadius: '50%',
    }
}));

function CategoryStatus(props) {
    const classes = useStyles();
    const { category, subCategory } = props;
    const [wordsLength, setWordsLength] = useState(0);
    const [storiesLength, setStoriesLength] = useState(0);

    const userStatus = firebaseService.user[category]
    const {text, data} = getNameCategory(subCategory)

    useEffect(
        () => {
            firebaseService.getWordsStoriesLength(props.category).then(storiesWords => {
                setWordsLength(storiesWords.word);
                setStoriesLength(storiesWords.story);
            })

        },
    );


    function getNameCategory(subCategory) {
        switch (subCategory) {
            case 'learnWords':
                return {text: "לימוד מילים", data: `${userStatus.holdingWords}/${wordsLength}`};
            case 'game':
                return {text: "משחק", data: `${userStatus.game ? 1 : 0}/1`};
            case 'story':
                return {text:  "סיפור", data: `${userStatus.holdingStory}/${storiesLength}`}
            case 'test':
                return { text: "מבחן", data: `${userStatus.test == -1 ? "0%" : userStatus.test + "%"}`}
        }
    }

    function getCategoeryByName() {
        switch (category) {
            case 'category1':
                return 'begginers';
            case 'category2':
                return 'students';
            case 'category3':
                return 'advanced';
            case 'category4':
                return 'buisness';
        }
    }


    return (
        <GridItem xs={8} sm={8} md={8} lg={3}>
            
            <Link
                component={RouterLink}
                underline='none'
                to={{ pathname: `/admin/${getCategoeryByName()}/${subCategory}`, state: category }}
            >
                <Card hoverable>
                <CardHeader color="info">
                    <div className="sm:center text-center pt-82 center block">
                        <Info style={{ fontSize: "4.7vw" }} variant="h2" component="h2"
                            className="text-72 leading-none text-white">{data}
                        </Info>
                        </div>
                </CardHeader>
                <CardBody>
                    <h4 className={classes.cardTitle}>{text}</h4>
                </CardBody>
            </Card>
            </Link>
        </GridItem>
    );
}

export default CategoryStatus