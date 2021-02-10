import React from "react";
import firebaseService from 'firebase_services/firebaseService';
import {Component} from 'react';
import Speech from 'react-speech';

class LearnWords extends Component {
    state = {
        words: []
    }
   
    componentDidMount() {
        var list;
        firebaseService.getWordsByCategory(this.props.category)
        .then(function(list_words) {
            list = list_words;
        }).then(() => {
            this.setState({words: list.words});
        })
    }

    render() {
        return (
            <ul className="word-container">
                <h2>לימוד מילים</h2>
                { 
                    Object.keys(this.state.words).map((key) => ( 
                        <li>
                            <Speech text={key}
                                    voice="Google UK English Female" 
                                    textAsButton={true}/>
                            &nbsp; = &nbsp;  
                            {this.state.words[key]} 
                        </li>
                    ))
                }
            </ul>
          );
      }
  }


export default LearnWords