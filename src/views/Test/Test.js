import React, {Component} from 'react';
import Question from './Question/Question';
import Answer from './Answer/Answer';
import firebaseService from 'firebase_services/firebaseService';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from '../../components/Card/CardHeader';
import CardFooter from '../../components/Card/CardFooter';
import RegularButton from '../../components/CustomButtons/Button'
import Card from "../../components/Card/Card";


// get map size
function getMapSize(x) {
    var len = 0;
    for (var count in x) {
            len++;
    }
    return len;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Test extends Component {

    // initiating the local state
    state = {
        quiestions: {},
        answers: {},
        correctAnswers: {},
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 0,
        score: 0
    }

    componentDidMount() {
        var list;
        var quiestions_list = {};
        var answers_list = {1: {}, 2: {}, 3: {}, 4: {}};
        var correctAnswers_list = {};
        //get words from DB
        firebaseService.getWordsByCategory(this.props.location.state)
        .then(function(list_words) {
            list = list_words;
        }).then(() => {
            //create qustions
            var i, j;
            var wordsListLength = getMapSize(list.words);
            for (i = 1; i <= ((wordsListLength - (wordsListLength % 3 ))/ 3 ); i++) {
                var keys = [Object.keys(list.words)[i*3-1], 
                            Object.keys(list.words)[i*3-1-1], 
                            Object.keys(list.words)[i*3-2-1] ];
                var correctRandom = getRandomInt(2)
                quiestions_list[i] = "בחר את התרגום הנכון של \"" + keys[correctRandom] + "\" לעברית:";
                correctAnswers_list[i] = "" + (correctRandom + 1);
                answers_list[i] = { 1: list.words[keys[0]],
                                    2: list.words[keys[1]],
                                    3: list.words[keys[2]] }
            }
            for (j = 1; j <= ((wordsListLength - (wordsListLength % 3)) / 3 ); j++) {
                var keys = [Object.keys(list.words)[j*3-1], 
                            Object.keys(list.words)[j*3-1-1], 
                            Object.keys(list.words)[j*3-2-1] ];
                var correctRandom = getRandomInt(2)
                quiestions_list[i+j-1] = "בחר את התרגום הנכון של \"" + list.words[keys[correctRandom]] + "\" לאנגלית:";
                correctAnswers_list[i+j-1] = "" + (correctRandom + 1);
                answers_list[i+j-1] = { 1: keys[0],
                                        2: keys[1],
                                        3: keys[2] }
            }
            this.setState({
                quiestions: quiestions_list,
                answers: answers_list,
                correctAnswers: correctAnswers_list,
                step: 1
            });
        })
    }

    //checks the correct answer
    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    //go to the next question
    nextStep(step){
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
        //firebaseService.setGradeByCategoryForUser(this.props.location.state, grade);

        /*
        if (Object.keys(this.state.quiestions.length) === this.state.step){
            var grade = (this.state.score * (100 / Object.keys(this.state.quiestions).length)).toFixed(2);
            console.log("this.state.step " + this.state.step);
            console.log("Object.keys(this.state.quiestions).length " + Object.keys(this.state.quiestions).length);
            //firebaseService.setGradeByCategoryForUser(this.props.location.state, grade);
        }*/
            
    }

    render(){
        if (this.state.step == 0)
            return null;

        let { quiestions, answers, correctAnswer, clickedAnswer, step, score } = this.state;
        var grade = (score * (100 / Object.keys(quiestions).length)).toFixed(2);
        return(
            <GridContainer >

            <GridItem xs={12} sm={12} md={8} direction='row'>
            <Card>
                    {step <= Object.keys(quiestions).length ? 
                        (<>
                            <div className='absolute'>            
                                <CardHeader color="info" >
                                    <Question
                                        question={quiestions[step]}
                                    />
                                </CardHeader>
                            </div>
                            <div className='pt-16'>
                                <Answer
                                    answer={answers[step]}
                                    step={step}
                                    checkAnswer={this.checkAnswer}
                                    correctAnswer={correctAnswer}
                                    clickedAnswer={clickedAnswer}
                                />
                            </div>
                            <CardFooter>
                                <RegularButton 
                                        variant="contained"
                                        color="info"
                                        onClick={() => this.nextStep(step)} 
                                        disabled={
                                            clickedAnswer && Object.keys(quiestions).length >= step
                                            ? false : true
                                        }>
                                    Next
                                </RegularButton>
                            </CardFooter>
                        </>) : (
                            <div className='p-48'>
                            <CardHeader color='info'  >
                                {}
                                <h5>{" סיימת את המבחן! "}</h5>
                                <h5> {" הציון שלך הוא : " + grade + " % "}</h5>
                                <h5>{grade >=90 ? " מצוין! " : grade >=80 ? " טוב מאד! "  : grade >=60 ? " טוב " : " למד שוב את המילים"}</h5>
                            
                            </CardHeader>
                            </div>
                        )
                    }
             
            </Card>
            </GridItem>
            </GridContainer>


        );
    }
}
export default Test;