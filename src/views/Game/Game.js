import React, {useState} from 'react'
import Board from './Board'
import backImg from 'assets/img/Game/back.png'
import frontImg from 'assets/img/Game/clipart2.png'
import 'assets/css/Game.css'
import firebaseService from 'firebase_services/firebaseService';
import {Component} from 'react';
import {getMapSize} from "../../global.js";
import LinearProgressWithLabel from 'components/LinearProgress/LinearProgressWithLabel';


class Game extends Component {
    constructor() {
        super();
        this.state = {
            words: {},
            cards: [],
            wordsLength: 0
        };
    }

    componentDidMount() {
        var list
        // TODO: check which arg to move to the service
        firebaseService.getWordsByCategory(this.props.location.state)
        // firebaseService.getWordsByCategory(this.props.category)
        .then(function(list_words) {
            list = list_words; 
        }).then(() => {
            this.setState({words: list.words});      
            buildCards(this.state.words).then(tmpCards => {
                this.setState({cards: tmpCards})
            })
            this.setState({wordsLength: getMapSize(list.words)});
        })        
    }

    render() {
        if (this.state.wordsLength < 8 || !this.state.cards.length) 
            return (
                <LinearProgressWithLabel />
            )        
      
        return ( 
        <div className="Game">
        <Board cards={this.state.cards} category = {this.props.location.state} />
        </div> 
        )
    }
}

async function buildCards(listWords) {
    let id = 0
    var shortDict = copyDictionary(listWords, 8)
    var wordDict = Object.fromEntries(Object.entries(shortDict).slice(0, 16));    
    var newWordsDict = dictionaryToEmptyDict(wordDict)

    const cards = Object.keys(newWordsDict).reduce((result, item) => {
        const getCard = () => ({
        id: id++,
        type: getTipe(id),
        word: item,
        backImg,
        frontImg,
        flipped: false,
        })
        return [...result, getCard()]
    }, [])

    return suffle(cards) 
    return cards
}

function suffle(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let randomIdx = Math.floor(Math.random() * len)
    let copyCurrent = {...arr[i]}
    let copyRandom = {...arr[randomIdx]}
    arr[i] = copyRandom
    arr[randomIdx] = copyCurrent
  }
  return arr
}

function dictionaryToList (dict) {
    var list = []
    Object.keys(dict).forEach(function(key) {
        list.push(key)
        list.push(dict[key])
    });
    return list
}

function dictionaryToEmptyDict (dict) {
    var eDict = {}
    Object.keys(dict).forEach(function(key) {
        eDict[key] = ""
        eDict[dict[key]] = ""
    })

    return eDict
}

function getTipe (id){    
    var type = ((id-1)%2==0) ? id : id-1
    return type
}

function copyDictionary(dict, n) {
    var newDict = {}
    var i = 0
    for (; i < n; i++) {
        var key = Object.keys(dict)[i];
        var value = dict[key]
        newDict[key] = value
    }
    return newDict
}

export default Game


