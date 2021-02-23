import React from 'react';
import { useState, useEffect } from 'react';
import firebaseService from '../../firebase_services/firebaseService';
// import SignedApp from './SignedApp';
import {Component} from 'react';
import { Card } from '@material-ui/core';
import ImageCard from './DisplayImage';
// import {  } from "DisplayImage";

//import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


// get map size
function getMapSize(x) {
    var len = 0;
    console.log("x , ", x)
    for (var count in x) {
            len++;
    }
    console.log("len ,", len);
    return len;
}


class StoryPage extends Component {
  

    constructor() {
        super();
        this.state = {
            story_links: [],
            story_state: 0,
            story_count: 0, // ten of story_links
            get_story: false,
            finished_to_raed: true
        };
        // this.handleNext = this.handleNext.bind(this);
        // this.handlePrevious = this.handlePrevious.bind(this);
        // this.play = this.play.bind(this);

    }

    componentDidMount() {
        var list;
        var story_st;
        firebaseService.getStoryByCategory(this.props.location.state)
        .then(function(list_links) {
            list = list_links;
        }).then(() => {
            this.setState({story_links: list});
            this.setState({count: getMapSize(list)});
        })

        firebaseService.getHoldingStoryByCategoryForUser(this.props.location.state ,this.user)
        .then(function(st){
            story_st = st;
        }).then(()=>{
            this.setState({story_state: story_st});
        })

        
        
    }

    finished_story(event) {
        console.log("finished_story");
        // event.preventDefault();
        // if (this.state.story_state < this.state.story_count - 1){
         
        // this.setState({finished_story : false});
        // this.setState({get_story: true});
            
        // var next  = this.state.count + 1;
        // this.setState({count: next});
        // firebaseService.setHoldingStoryByCategoryForUser(this.props.location.state, next)
        // }
    
    }

    get_next_story(){
        console.log("get_next_story");
    }

    render() {
        var is_last = this.state.count - 1 == this.state.story_state ? true : false
        console.log("story render")
        console.log(this.state.story_links);
        console.log(this.state.story_state);
        console.log(this.state.story_count);

        // console.log(this.state.story_links[this.story_state]);

        // console.log(Object.keys(this.state.story_links)[this.state.story_state]);

        // return ( 
        //     <div id="ImageCard">
        //         <ImageCard image_link={this.state.story_links[this.story_state]} last={is_last}/>         
        //     </div>
                
        //     );

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
                    <Button size="small" color="primary" onClick={this.finished_story} disabled={this.state.finished_to_raed}>
                      סימתי לקרוא    
                    </Button>
                    <Button size="small" color="primary" onClick={this.get_next_story} disabled={this.state.get_story}>
                      {is_last? " סיפור הבא" : "חזור לסיפור הראשון"}
                    </Button>
                  </div>
        
                </CardActions>
            </Card>
        );
      }
  }


export default StoryPage;