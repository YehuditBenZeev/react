import React from "react";
import firebaseService from 'firebase_services/firebaseService';
import {Component} from 'react';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


//get map size
function getMapSize(x) {
    var len = 0;
    for (var count in x) {
            len++;
    }
    return len;
}

//sort map by key
function sortMapByKey(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

//this componnent is a layout for the Learn Words page
class LearnWords extends Component {

    constructor() {
        super();
        this.state = {
            words: {},
            grammerWords: {},
            count: 0,
            wordsLength: 0,
            previousDisabled: false,
            nextDisabled: false
        };
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.play = this.play.bind(this);

    }
   
    componentDidMount() {
        var list;
        var holdingWord
        firebaseService.getWordsByCategory(this.props.location.state)
        .then(function(list_words) {
            list = list_words;
        }).then(() => {
            this.setState({words: sortMapByKey(list.words)});
            this.setState({grammerWords: list.grammerWords});

            firebaseService.getHoldingWordsByCategoryForUser(this.props.location.state)
            .then(function(count) {
                holdingWord = count;
            })
            .then(() => {
                var wordsListLength = getMapSize(list.words);
                // to show the word that the user is holding on
                this.setState({count: holdingWord});

                //disable previous or next buttons if needed
                //first word - could not press previous now
                if(holdingWord === 0){
                    this.setState({previousDisabled: true});
                }
                //last word - could not press next anymore
                if(holdingWord === wordsListLength - 1){
                    this.setState({nextDisabled: true});
                }

                //only now we will set the size, this will also indecate to show to screen
                this.setState({wordsLength: wordsListLength});
            })
        })
    }

    //go back to previous word
    handlePrevious(event) {
        event.preventDefault();
        if (this.state.count > 0){
            //one before last word - could press next now
            if (this.state.count === this.state.wordsLength - 1){
                this.setState({nextDisabled: false});
            }
            //#1 word - could not press previous anymore
            if (this.state.count === 1){
                this.setState({previousDisabled: true});
            }
            var previous  = this.state.count -1;
            firebaseService.setHoldingWordsByCategoryForUser(this.props.location.state, previous)
            this.setState({count: previous});
        }
    }

    //continue to next word
    handleNext(event) {
        event.preventDefault();
        if (this.state.count < this.state.wordsLength - 1){
            //#2 word - could press previous now
            if (this.state.count === 0){
                this.setState({previousDisabled: false});
            }
            //last word - could not press next anymore
            if (this.state.count === this.state.wordsLength - 2){
                this.setState({nextDisabled: true});
            }
            var next  = this.state.count + 1;
            this.setState({count: next});
            firebaseService.setHoldingWordsByCategoryForUser(this.props.location.state, next)
        }
    }

    //play the word with speech
    play(event) {
        event.preventDefault();
        var u = new SpeechSynthesisUtterance(Object.keys(this.state.words)[this.state.count])
        u.lang = 'en-GB';
        speechSynthesis.speak(u);
    }

    render() {
        if (this.state.wordsLength === 0)
            return null;
        
        var grammerList = null;

        const styles = {
            'textAlign': "center",
            width: '100%',
            maxWidth: 500,
        };

        //for category 3 we add the grammer words
        if(this.props.location.state === 'category3'){ 
            grammerList = Object.keys(this.state.grammerWords[Object.keys(this.state.words)[this.state.count]]).map((key) => ( 
                <ListItem>
                    <ListItemText
                    primary={this.state.grammerWords[Object.keys(this.state.words)[this.state.count]][key] + " = " + key}
                    />
                    <ListItemIcon>
                        <PriorityHighIcon />
                    </ListItemIcon>
                </ListItem>
            ))
            
        }
        return (
            <div className="word-container">
                <h2>לימוד מילים</h2>
                <Card style={styles}>
                    <div className="content" style={styles}>
                        <CardActions style={styles}><IconButton>
                        <SettingsVoiceIcon size="large" onClick={this.play}>
                        </SettingsVoiceIcon></IconButton>
                        </CardActions>
                        {  
                            <h3>    
                                {"מילה: " + Object.keys(this.state.words)[this.state.count]}       
                                <br />
                                {"תרגום: " + this.state.words[Object.keys(this.state.words)[this.state.count]]}
                                <br />
                                <List dense={true}>{grammerList}</List>
                            </h3>
                        }
                       
                        <CardActions>
                            <IconButton id="previous" aria-label="add an arrow" onClick={this.handlePrevious} disabled={this.state.previousDisabled}>
                                <ArrowForwardIosIcon size="large"/>
                            </IconButton>
                            <IconButton id="next" aria-label="add an arrow" onClick={this.handleNext} disabled={this.state.nextDisabled}>
                                <ArrowBackIosIcon size="large"/>
                            </IconButton>
                        </CardActions>
                    </div>
                </Card>
            </div>
          );
      }
  }

export default LearnWords