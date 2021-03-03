import React, {useState} from 'react'
import Board from './Board'
import backImg from 'assets/img/Game/back.png'
import frontImg from 'assets/img/Game/clipart2.png'
import 'assets/css/Game.css'
import firebaseService from 'firebase_services/firebaseService';
import {Component} from 'react';
import {getMapSize} from "../../global.js";


class Game extends Component {


    constructor() {
        super();
        console.log("INSIDE CONSTRUCTOR")
        this.state = {
            words: {},
            cards: [],
            wordsLength: 0
        };
    }

    componentDidMount() {
        console.log("INSIDE componentDidMount words = ", this.state.words)
        console.log("INSIDE componentDidMount props = ", this.props)
        
        var list
        // TODO: check which arg to move to the service
        firebaseService.getWordsByCategory(this.props.location.state)
        // firebaseService.getWordsByCategory(this.props.category)
        .then(function(list_words) {
            list = list_words; 
        }).then(() => {
            this.setState({words: list.words});
            console.log("INSIDE componentDidMount AFTER read from DB, words = ", this.state.words)      
            buildCards(this.state.words).then(tmpCards => {
                this.setState({cards: tmpCards})
                console.log(this.state.cards)})
            this.setState({wordsLength: getMapSize(list.words)});
            console.log("INSIDE componentDidMount AFTER read from DB, LIST length = ", this.state.wordsLength)
        })        
    }


    render() {
        if (this.state.wordsLength < 8 || !this.state.cards.length) 
            return (
                <p>המשחק לא מוכן...</p>
            )        
        console.log("IN RENDER. LIST length = ", this.state.wordsLength)
        console.log("IN RENDER. cards: ", this.state.cards)
        return ( 
        <div className="Game">
        <Board cards={this.state.cards} category = {this.props.location.state} />
        </div> 
        )
    }
}


async function buildCards(listWords) {
    let id = 0
    console.log("INSIDE buildCards FUNC. words: ", listWords)

    var shortDict = copyDictionary(listWords, 8)
    console.log("INSIDE buildCards FUNC. SHORT DICT: ", shortDict)

    var wordDict = Object.fromEntries(Object.entries(shortDict).slice(0, 16));
    console.log("INSIDE buildCards FUNC. wordDict: ", (wordDict))
    
    var newWordsDict = dictionaryToEmptyDict(wordDict)
    console.log("newWordsDict Words", newWordsDict, newWordsDict.length)

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

    console.log("INSIDE buildCards FUNC. cards: ", cards)

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


