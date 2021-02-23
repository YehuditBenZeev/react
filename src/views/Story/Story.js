import React from 'react';
import { useState, useEffect } from 'react';
import firebaseService from '../../firebase_services/firebaseService';
// import SignedApp from './SignedApp';
import {Component} from 'react';
import { Card } from '@material-ui/core';
import ImageCard from '../Story/DisplayImage';
// import {  } from "DisplayImage";


class StoryPage extends Component {
    state = {
            story_links: [],
            story_state: 0
        }

    componentDidMount() {
        var list;
        var story_st;
        firebaseService.getStoryByCategory(this.props.location.state)
        .then(function(list_links) {
            list = list_links;
        }).then(() => {
            this.setState({story_links: list});
        })

        firebaseService.getHoldingStoryByCategoryForUser(this.props.location.state ,this.user)
        .then(function(st){
            story_st = st;
        }).then(()=>{
            this.setState({story_state: story_st});
        })
    }

    componentDidUpdate(){
        var list;
        firebaseService.getStoryByCategory(this.props.category)
        .then(function(list_links) {
            list = list_links;
        }).then(() => {
            this.setState({story_links: list});
        })
    }

    render() {
        console.log("******************");
        console.log(this.state.story_links);
        console.log(this.state.story_links[this.story_state]);

        // console.log(this.props.category);
        console.log("story state");
        console.log(this.state.story_state);
        console.log(this.user);
        return ( 
            <div id="ImageCard">
                <ImageCard image_link={this.state.story_links[this.story_state]}/>         
            </div>
                
            );
      }
  }


export default StoryPage;