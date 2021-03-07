import React, {useState, useEffect} from 'react'
import GCard from './GCard'
import 'assets/css/Board.css'
import firebaseService from '../../firebase_services/firebaseService';


var obj = {flippedCards: 0}

const Board = props => {
  const [cards, setCards] = useState(props.cards)
  const [checkers, setCheckers] = useState([])
  const [completed, setCompleted] = useState([])  

  const onCardClick = card => () => {    
    if (checkersFull(checkers) || cardAlreadyInCheckers(checkers, card)) return
    const newCheckers = [...checkers, card]
    setCheckers(newCheckers)
    const cardsInCheckersMatched = validateCheckers(newCheckers)
    if (cardsInCheckersMatched) {  
      updateFlippedCounter(obj, cards) 
      setCompleted([...completed, newCheckers[0].type])
    }
    if (checkersFull(newCheckers)) {
      resetCheckersAfter(1000)
    }
    function validateCheckers(checkers){
      return checkers.length === 2 &&
      checkers[0].type === checkers[1].type
    }
    function cardAlreadyInCheckers(checkers, card){
      return checkers.length === 1 && checkers[0].id === card.id
    }
    function checkersFull(checkers){
      return checkers.length === 2
    }
    function resetCheckersAfter(time) {
      setTimeout(() => {
        setCheckers([])
      }, time)
    }
    function updateFlippedCounter(obj, cards) {
      obj.flippedCards=0
      Object.keys(cards).forEach(function(key) {
        if(cards[key].flipped)
          obj.flippedCards++
      })
      checkWin(obj)
    }
    
    function checkWin(obj){
        if(obj.flippedCards == 15) {
          alert("(:ניצחת")
          firebaseService.setHoldingGameByCategoryForUser(props.category, true)
        }
    }
  }

  useEffect(() => {
    const newCards = cards.map(card => ({
      ...card,
      flipped:
        checkers.find(c => c.id === card.id) ||
        completed.includes(card.type),
    }))
    setCards(newCards)
  }, [checkers, completed])
  return (
    <div className="Board">
      {cards.map(card => (
        <GCard {...card} onClick={onCardClick(card)} key={card.id} />
      ))}
    </div>
  )
}

export default Board
