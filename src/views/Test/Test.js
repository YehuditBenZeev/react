import React, {Component} from 'react';
import Question from './Question/Question';
import Answer from './Answer/Answer';
import firebaseService from 'firebase_services/firebaseService';
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import CardHeader from '../../components/Card/CardHeader';
import CardFooter from '../../components/Card/CardFooter';
import RegularButton from '../../components/CustomButtons/Button'
import Card from "../../components/Card/Card";
import {getMapSize, getRandomInt} from "../../global.js";


class Test extends Component {
    //initiating the local state
    state = {
        quiestions: {},
        answers: {},
        correctAnswers: {},
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 0,
        grade: 0,
        continueToTest: true,
        lastGrade: 0,
        score: 0
    }

    componentDidMount() {
        var list;
        var quiestions_list = {};
        var answers_list = {1: {}, 2: {}, 3: {}, 4: {}};
        var correctAnswers_list = {};
        var correctRandom = 0;

        //to know if the user already did the test
        const userStatus = firebaseService.user[this.props.location.state];
        if (userStatus.test !== -1){
            this.setState({continueToTest: false});
            this.setState({lastGrade: userStatus.test});
        }

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
                            Object.keys(list.words)[i*3-2], 
                            Object.keys(list.words)[i*3-3] ];
                correctRandom = getRandomInt(3)
                quiestions_list[i] = "בחר את התרגום הנכון של \"" + keys[correctRandom] + "\" לעברית:";
                correctAnswers_list[i] = "" + (correctRandom + 1);
                answers_list[i] = { 1: list.words[keys[0]],
                                    2: list.words[keys[1]],
                                    3: list.words[keys[2]] }
            }
            for (j = 1; j <= ((wordsListLength - (wordsListLength % 3)) / 3 ); j++) {
                keys = [Object.keys(list.words)[j*3-1], 
                            Object.keys(list.words)[j*3-2], 
                            Object.keys(list.words)[j*3-3] ];
                correctRandom = getRandomInt(3)
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
        }else{ //worng answer
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
        //after answering the last qustion, need to update the user grade
        if (this.state.step === getMapSize(this.state.quiestions)){
            var new_grade = (this.state.score * (100 / Object.keys(this.state.quiestions).length)).toFixed(2);
            firebaseService.setGradeByCategoryForUser(this.props.location.state, new_grade)
            this.setState({grade: new_grade});
        }
    }

    render(){
        let { quiestions, answers, correctAnswer, clickedAnswer, step, grade, continueToTest, lastGrade } = this.state;

        //wait till all data is loaded
        if (step === 0)
            return null;

        //if the user alredy did the test at the past
        if (!continueToTest){
            return (
                <div className='p-48'>
                    <CardHeader color='info'  >
                        <h5>נבחנת בקטגוריה זו. הציון שלך הוא: {lastGrade}%  האם ברצונך לעשות שוב את המבחן?</h5>
                        <RegularButton 
                            variant="contained"
                            color="info"
                            onClick={() => {
                                this.setState({continueToTest: true});
                            }} 
                            disabled={false}>
                            כן
                        </RegularButton>
                    </CardHeader>
                </div>
            );
        }
 
        //to do the test
        return(
            <GridContainer > <GridItem xs={12} sm={12} md={8} direction='row'> <Card>
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
                                הבא
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
            </Card></GridItem></GridContainer>
        );
    }
}

export default Test;