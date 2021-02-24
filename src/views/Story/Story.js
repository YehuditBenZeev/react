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
            story_count: 0, // len of story_links
            get_story: true,
            finished_to_raed: false
        };
        this.get_next_story = this.get_next_story.bind(this);
        this.finished_story= this.finished_story.bind(this);
    
    }

    componentDidMount() {
        var list;
        var story_st;
        var stories_len;
        firebaseService.getStoryByCategory(this.props.location.state)
        .then(function(list_links) {
            list = list_links.stories;
        }).then(() => {
            firebaseService.getHoldingStoryByCategoryForUser(this.props.location.state ,this.user)
            .then(function(st){
                story_st = st;
            }).then(()=>{
                this.setState({story_links: list});  
                this.setState({story_state: story_st});
                this.setState({story_count:  getMapSize(list)});
            })
        })
    }

    finished_story(event) {
        event.preventDefault();
        console.log("finished_story");
        console.log("state ", this.state.story_count);
        console.log("state ", this.state.story_state);
        
         
        this.setState({finished_to_raed : true});
        this.setState({get_story: false});
                
        var next  = this.state.story_state + 1;
        this.setState({story_state: next});
        firebaseService.setHoldingStoryByCategoryForUser(this.props.location.state, next)
    }

    get_next_story(){
        console.log("get_next_story");
    }

    render() {
        var is_last = this.state.count - 1 == this.state.story_state ? true : false
        console.log("story render")
        console.log("story_links ", this.state.story_links);
        console.log("story_state ", this.state.story_state);
        console.log("story_count ", this.state.story_count);
        // if (this.story_state == NaN)
        //     this.setState({story_state: 0});

        // console.log(this.state.story_links[this.story_state]);

        // console.log(Object.keys(this.state.story_links)[this.state.story_state]);

        // return ( 
        //     <div id="ImageCard">
        //         <ImageCard image_link={this.state.story_links[this.story_state]} last={is_last}/>         
        //     </div>
                
        //     );
        console.log("image link " ,this.state.story_links[this.state.story_state]);
        return (
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        image={this.state.story_links[this.story_state]}
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