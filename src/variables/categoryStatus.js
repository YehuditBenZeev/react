import { Box, Typography, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import cardBg from "assets/img/cardBg.jpg"
import Card from "components/Card/Card.js";
import firebaseService from '../firebase_services/firebaseService'
import GridItem from "components/Grid/GridItem.js";

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
    const userStatus = firebaseService.user[category]
    const {text, data} = getNameCategory(subCategory)
    console.log(text, data);
    function getNameCategory(subCategory) {
        console.log(subCategory);
        switch (subCategory) {
            case 'learnWords':
                return {text: "מילים", data: userStatus.holdingWords};
            case 'game':
                return {text: userStatus.game ? "המשחק הושלם" : "משחק לא הושלם", data: userStatus.game};
            case 'story':
                return {text:  "סיפורים", data: userStatus.holdingStory}
            case 'test':
                return  {text: userStatus.test > -1 ? "ציון" : "מבחן לא נעשה", data: userStatus.test}
        }
    }


    return (
        <GridItem xs={4} sm={4} md={4} lg={3}>
            <Card className={classes.card} style={{ backgroundImage: `url(${cardBg})` }}>
                <Box boxShadow={3} className={classes.card}>
                    <div className="sm:center text-center pt-82 center block">
                        <Typography style={{ fontSize: "5.2vw" }} variant="h2" component="h2"
                            className="text-72 leading-none text-white">{data}</Typography>
                        <div className="text-center pt-12 pb-28 center block">
                            <Typography style={{ fontSize: "2.8vw" }} className="text-72 leading-none text-white" variant="h4">{text}</Typography>
                        </div>
                    </div>
                </Box>
            </Card>
        </GridItem>
    );
}

export default CategoryStatus