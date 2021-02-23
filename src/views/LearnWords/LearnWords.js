import React from "react";
import firebaseService from 'firebase_services/firebaseService';
import {Component} from 'react';
import Speech from 'react-speech';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core';

// get map size
function getMapSize(x) {
    var len = 0;
    for (var count in x) {
            len++;
    }
    return len;
}

// sort map by key
function sortMapByKey(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

// this componnent is a layout for the Learn Words page
class LearnWords extends Component {

    constructor() {
        super();
        this.state = {
            words: {},
            count: 0,
            wordsLength: 0,
            previousDisabled: false,
            nextDisabled: false
        };
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }
   
    componentDidMount() {
        var list;
        var holdingWord
        firebaseService.getWordsByCategory(this.props.location.state)
        .then(function(list_words) {
            list = list_words;
        }).then(() => {
            this.setState({words: sortMapByKey(list.words)});
            firebaseService.getHoldingWordsByCategoryForUser(this.props.location.state)
            .then(function(count) {
                holdingWord = count;
            }).then(() => {
                // to show the word that the user is holding on
                //holdingWord = firebaseService.getHoldingWordsByCategoryForUser(this.props.location.state);
                console.log("aaa: " + holdingWord);
                this.setState({count: holdingWord});
                // disable previous or next buttons if needed
                //first word - could not press previous now
                if(this.state.count == 0){
                    this.setState({previousDisabled: true});
                }
                //last word - could not press next anymore
                if(this.state.count == this.state.wordsLength - 1){
                    this.setState({nextDisabled: true});
                }
                //only now we will set the size, this will also indecate to show to screen
                this.setState({wordsLength: getMapSize(list.words)});
            })
        })
    }

    // go back to previous word
    handlePrevious(event) {
        event.preventDefault();
        if (this.state.count > 0){
            //one before last word - could press next now
            if (this.state.count == this.state.wordsLength - 1){
                this.setState({nextDisabled: false});
            }
            //#1 word - could not press previous anymore
            if (this.state.count == 1){
                this.setState({previousDisabled: true});
            }
            var previous  = this.state.count -1;
            firebaseService.setHoldingWordsByCategoryForUser(this.props.location.state, previous)
            this.setState({count: previous});
            console.log("count: " + previous);
        }
    }

    // continue to next word
    handleNext(event) {
        event.preventDefault();
        if (this.state.count < this.state.wordsLength - 1){
            //#2 word - could press previous now
            if (this.state.count == 0){
                this.setState({previousDisabled: false});
            }
            //last word - could not press next anymore
            if (this.state.count == this.state.wordsLength - 2){
                this.setState({nextDisabled: true});
            }
            var next  = this.state.count + 1;
            this.setState({count: next});
            firebaseService.setHoldingWordsByCategoryForUser(this.props.location.state, next)
            console.log("count: " + next);
        }
    }

    render() {  
        if (this.state.wordsLength == 0)
            return null;
        const styles = {
            'textAlign': "center"
        };
        return (
            <div className="word-container">
                <h2>לימוד מילים</h2>
                <Card style={styles}>
                    <div className="content" style={styles}>
                        {  
                            <h3>    
                                {"מילה: "}
                                <Speech text={Object.keys(this.state.words)[this.state.count]}
                                        voice="Google UK English Female" 
                                        textAsButton={true}/>
                                <br />
                                {"תרגום: " + this.state.words[Object.keys(this.state.words)[this.state.count]]} 
                            </h3>
                        }
                        <CardActions style={styles}>
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