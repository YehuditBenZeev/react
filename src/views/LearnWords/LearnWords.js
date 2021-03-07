import React from "react";
import firebaseService from 'firebase_services/firebaseService';
import {Component} from 'react';
import CardActions from '@material-ui/core/CardActions';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardHeader from '../../components/Card/CardHeader';
import RegularButton from '../../components/CustomButtons/Button'
import Card from "../../components/Card/Card";
import CardIcon from "../../components/Card/CardIcon";
import {sortMapByKey, getMapSize} from "../../global.js";
import LinearProgressWithLabel from 'components/LinearProgress/LinearProgressWithLabel';


//this componnent is a layout for the Learn Words page
class LearnWords extends Component {
    constructor() {
        super();
        this.state = {
            words: {},
            grammerWords: {},
            relativeHoldoingWord: 0, //the relative word we are holding at
            realHoldoingWord: 0, //the most advanced holding word that was learned
            wordsLength: 0,
            previousDisabled: false,
            nextDisabled: false,
            loading: true
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
            if(this.props.location.state === "category3"){
                this.setState({grammerWords: list.grammerWords});
            }

            firebaseService.getHoldingWordsByCategoryForUser(this.props.location.state)
            .then(function(count) {
                holdingWord = count; 
            })
            .then(() => {
                //at the first time the user starts to learn words, we need to update that we are at the #1 word
                if(holdingWord === 0){
                    holdingWord++;
                    firebaseService.setHoldingWordsByCategoryForUser(this.props.location.state, holdingWord)
                }

                var wordsListLength = getMapSize(list.words);
                //to show the word that the user is holding on
                this.setState({relativeHoldoingWord: holdingWord});
                //to keep track of the most advanced word that the user learned
                this.setState({realHoldoingWord: holdingWord});

                //disable previous or next buttons if needed
                //first word - could not press previous now
                if(holdingWord === 1){
                    this.setState({previousDisabled: true});
                }
                //last word - could not press next anymore
                if(holdingWord === wordsListLength){
                    this.setState({nextDisabled: true});
                }
                //only now we will set the size, this will also indecate to show to screen
                this.setState({wordsLength: wordsListLength});
            }).then(()=>{
                this.setState({loading: false});
            })
        })
    }

    //go back to previous word
    handlePrevious(event) {
        event.preventDefault();
        if (this.state.relativeHoldoingWord > 0){
            //one before last word - could press next now
            if (this.state.relativeHoldoingWord === this.state.wordsLength){
                this.setState({nextDisabled: false});
            }
            //#1 word - could not press previous anymore
            if (this.state.relativeHoldoingWord === 2){
                this.setState({previousDisabled: true});
            }
            var previous  = this.state.relativeHoldoingWord -1;
            this.setState({relativeHoldoingWord: previous});
        }
    }

    //continue to next word
    handleNext(event) {
        event.preventDefault();
        if (this.state.relativeHoldoingWord < this.state.wordsLength){
            //#2 word - could press previous now
            if (this.state.relativeHoldoingWord === 1){
                this.setState({previousDisabled: false});
            }
            //last word - could not press next anymore
            if (this.state.relativeHoldoingWord === this.state.wordsLength - 1){
                this.setState({nextDisabled: true});
            }
            var next  = this.state.relativeHoldoingWord + 1;
            if(this.state.realHoldoingWord === this.state.relativeHoldoingWord){
                firebaseService.setHoldingWordsByCategoryForUser(this.props.location.state, next)
                this.setState({realHoldoingWord: next});
            }
            this.setState({relativeHoldoingWord: next});
        }
    }

    //play the word with speech
    play(event) {
        event.preventDefault();
        var u = new SpeechSynthesisUtterance(Object.keys(this.state.words)[this.state.relativeHoldoingWord-1])
        u.lang = 'en-GB';
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
    }

    render() {
        if (this.state.wordsLength === 0)
        return (
            <LinearProgressWithLabel />
        )

        const styles = {
            'textAlign': "center",
            width: '100%',
            maxWidth: 500,
        };

        //for category 3 we add the grammer words if exist
        var grammerList = null;
        if(this.props.location.state === 'category3' && this.state.grammerWords[Object.keys(this.state.words)[this.state.relativeHoldoingWord-1]] !== undefined){ 
            grammerList = Object.keys(this.state.grammerWords[Object.keys(this.state.words)[this.state.relativeHoldoingWord-1]]).map((key) => ( 
                <ListItem>
                    <ListItemText
                    primary={this.state.grammerWords[Object.keys(this.state.words)[this.state.relativeHoldoingWord-1]][key] + " = " + key}
                    />
                    <CardIcon>
                        <PriorityHighIcon />
                    </CardIcon>
                </ListItem>
            ))
        }
        return (
                <Card style={styles}>
                    <div className="content" style={styles}>
                        <CardActions style={styles}>
                            <CardHeader color='info'>
                                <SettingsVoiceIcon size="large" onClick={this.play} disabled={false}></SettingsVoiceIcon>
                            </CardHeader>
                        </CardActions>
                        {  
                            <h3>    
                                {"מילה: " + Object.keys(this.state.words)[this.state.relativeHoldoingWord-1]}       
                                <br />
                                {"תרגום: " + this.state.words[Object.keys(this.state.words)[this.state.relativeHoldoingWord-1]]}
                                <br />
                                <List dense={true}>{grammerList}</List>
                            </h3>
                        }
                        <CardActions>
                            <RegularButton id="previous" color='info' aria-label="add an arrow" onClick={this.handlePrevious} disabled={this.state.previousDisabled}>
                                <ArrowForwardIosIcon size="large"/>
                            </RegularButton>
                            <RegularButton id="next" color='info' aria-label="add an arrow" onClick={this.handleNext} disabled={this.state.nextDisabled}>
                                <ArrowBackIosIcon size="large"/>
                            </RegularButton>
                        </CardActions>
                    </div>
                </Card>
          );
      }
  }

export default LearnWords