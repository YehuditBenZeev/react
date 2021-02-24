import React from 'react';
import { useState, useEffect } from 'react';
import firebaseService from '../../firebase_services/firebaseService';
// import SignedApp from './SignedApp';
import {Component} from 'react';
import { Card , CircularProgress } from '@material-ui/core';
// import ImageCard from './DisplayImage';
// import {  } from "DisplayImage";

//import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import RegularButton from '../../components/CustomButtons/Button'
//import story_button from '../../assets/css/material-dashboard-react.css'


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
            finished_to_raed: false,
            loading: true
        };
        // this.get_next_story = this.get_next_story.bind(this);
        // this.finished_story= this.finished_story.bind(this);
    
    }

    componentDidMount() {
        var list;
        var story_st;
        var stories_len;
        firebaseService.getStoryByCategory(this.props.location.state)
        .then(function(list_links) {
            list = list_links.stories;
        }).then(() => {
            story_st = firebaseService.user[this.props.location.state]["holdingStory"]
            // story_st = firebaseService.getHoldingStoryByCategoryForUser(this.props.location.state ,this.user)
            // .then()
            if (story_st > this.state.story_count)
                story_st = 0;

            this.setState({story_links: list});  
            this.setState({story_state: story_st});
            this.setState({story_count:  getMapSize(list)});
            this.setState({loading: false})
        })
    }

    finished_story = async (event) =>{
        console.log("finished_to_raed", this.state.finished_to_raed);
        console.log("get_story ", this.state.get_story);
        event.preventDefault(); 
        await  this.setState({finished_to_raed : true});
        await  this.setState({get_story: false});
        console.log("finished_to_raed", this.state.finished_to_raed);
        console.log("get_story ", this.state.get_story);
        var next  = this.state.story_state + 1;
        firebaseService.setHoldingStoryByCategoryForUser(this.props.location.state, next)
    }

    get_next_story = (event) =>{
        console.log("get_next_story");
        this.setState({finished_to_raed : false});
        this.setState({get_story: true})

        console.log("story_state", this.state.story_state);
        console.log("story_count ", this.state.story_count);
        if (this.state.story_state < this.state.story_count -1 ){
            var next  = this.state.story_state + 1;
            this.setState({story_state: next});
        }
        else{
            console.log("in if");
            this.setState({story_state: 0});
            firebaseService.setHoldingStoryByCategoryForUser(this.props.location.state, 0)
        }
    }

    render() {
        var is_last = this.state.story_count - 1 == this.state.story_state ? true : false
        var link = this.state.story_links[this.state.story_state]
        var story_name = "story ".concat(this.state.story_state)
        
        return (
            this.state.loading ? <CircularProgress /> :
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={story_name}
                        image={link}
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
                <CardActions>
                  <div id="story_buttons">
                  <RegularButton color='info' onClick={this.finished_story} disabled={this.state.finished_to_raed}>
                      סימתי לקרוא    
                    </RegularButton>
                    <RegularButton color='info' onClick={this.get_next_story} disabled={this.state.get_story}>
                      {is_last? " חזור לסיפור הראשון " : " סיפור הבא "}
                    </RegularButton>
                  </div>
        
                </CardActions>
            </Card>
        );
      }
  }


export default StoryPage;