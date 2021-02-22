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
            story_state: 0,
            link_pdf: "https://firebasestorage.googleapis.com/v0/b/react-english-e6bf1.appspot.com/o/b%201.pdf?alt=media&token=85fad328-3fa6-45da-866d-bdf0894c1f7f",
            link: "https://firebasestorage.googleapis.com/v0/b/react-english-e6bf1.appspot.com/o/story1.PNG?alt=media&token=e88ed352-8646-425e-a196-e34a3f8be010"
    }

    componentDidMount() {
        var list;
        var st;
        var user = 'naBHeosikgVyLOTvbcL28sX0F653';
        firebaseService.getStoryByCategory(this.props.category)
        .then(function(list_links) {
            list = list_links;
        }).then(() => {
            this.setState({story_links: list});
        })

    }

    componentDidUpdate(){
        var list;
        var st;
        var user = 'naBHeosikgVyLOTvbcL28sX0F653';
        firebaseService.getStoryByCategory(this.props.category)
        .then(function(list_links) {
            list = list_links;
        }).then(() => {
            this.setState({story_links: list});
        });
   
    }

    render() {
        console.log("******************");
        console.log(this.state.story_links);
        console.log(this.state.story_links[0]);

        // console.log(this.props.category);
        console.log("story state");
        console.log(this.state.story_state);


        

        return ( 
                //<embed src={this.state.link} width="1000" height="375"  type="image/png"/> //</embed>
                //<iframe id="processor" src="http://hubgit.github.com/2011/11/pdftotext/"></iframe>
                //<iframe id="input" src={link}></iframe>
                //<img src="https://firebasestorage.googleapis.com/v0/b/react-english-e6bf1.appspot.com/o/story1.PNG?alt=media&token=e88ed352-8646-425e-a196-e34a3f8be010" alt="Trulli" width="500" height="333"/>

                //<image src={this.state.story_links[this.story_state]} type="image/png"/> 
                //<embed src="https://firebasestorage.googleapis.com/v0/b/react-english-e6bf1.appspot.com/o/story1.PNG?alt=media&token=e88ed352-8646-425e-a196-e34a3f8be010" type="image/png"/>

                // <body>
                   
                //     <div id="ImageCard">
                //         <embed src="https://firebasestorage.googleapis.com/v0/b/react-english-e6bf1.appspot.com/o/story1.PNG?alt=media&token=e88ed352-8646-425e-a196-e34a3f8be010" type="image/png"/>
                        <ImageCard image_link={this.state.story_links[this.story_state]}/>
                        
                        
                //     </div>

                    
                // </body>
                
            );
      }
  }


export default StoryPage;