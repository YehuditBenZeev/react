import React from 'react';
import './Answer.css';
import CardBody from '../../../components/Card/CardBody'

const Answer = (props) => {
    let answers = Object.keys(props.answer)
        .map((qAnswer, i) => (
            <li
            className=
            {
                props.correctAnswer === qAnswer ?
                'correct' : 
                props.clickedAnswer === qAnswer ? 
                'incorrect' : ''
            }
            onClick={() => props.checkAnswer(qAnswer)}
            key={qAnswer}>
                {props.answer[qAnswer]}
            </li>
        ));

        return (
            <CardBody>
                <ul disabled={props.clickedAnswer ? true : false} className="Answers">
                    {answers}
                </ul>
                <div>
                    {
                        props.correctAnswer ?
                        'תשובה נכונה!' : 
                        props.clickedAnswer ? 'תשובה שגויה!' : ''
                    }
                </div>
            </CardBody>
        );
}

export default Answer;