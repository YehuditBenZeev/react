import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });

export default function ImageCard(props) {
    //const classes = useStyles();
    var link = props.image_link;
    var is_last = props.last;
    // console.log("image_link");
    // console.log(link);

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    image="https://firebasestorage.googleapis.com/v0/b/react-english-e6bf1.appspot.com/o/story%202%20b.PNG?alt=media&token=3b1cfcda-4445-4b13-96d0-6d47a42eb135"
                    title="Contemplative Reptile"
                />
            </CardActionArea>
            <CardActions>
              <div id="story_buttons">
                <Button size="small" color="primary" >
                  סימתי לקרוא    
                </Button>
                <Button size="small" color="primary" >
                  {is_last? " סיפור הבא" : "חזור לסיפור הראשון"}
                </Button>
              </div>
    
            </CardActions>
        </Card>
    );
}