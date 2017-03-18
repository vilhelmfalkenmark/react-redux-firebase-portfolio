import React, { Component } from 'react'
class Word extends Component {
 constructor(props) {
  super(props)
  this.state = {
   words: props.words,
   word: "",
   rotate: false,
   wordIntervalID: null,
   rotateIntervalID: null
  }
 }
 componentDidMount() {
  const {words} = this.state;
  const getWord = index => words[Object.keys(words)[index]].word

  this.setState({
   word: getWord(0)
  })

  let counter = 1;
  const wordIntervalID = window.setInterval(()=> {
   if (counter < Object.keys(words).length) {
     this.setState({
      word: getWord(counter)
     })
   }
   else if(counter === Object.keys(words).length) {
    this.setState({
     word: getWord(0)
    })
    counter = 0;
   }
   counter++;
  }, 5000);

  let rotateCounter = 1;
  const rotateIntervalID = window.setInterval(()=> {
   rotateCounter++;
   if(rotateCounter > 9) {
    this.setState({
     rotate: true
    })
   } else {
    this.setState({
     rotate: false
    })
   }
   if (rotateCounter === 10) {
     rotateCounter = 0;
   }
  }, 500);
  this.setState({
   wordIntervalID: wordIntervalID,
   rotateIntervalID: rotateIntervalID
  })
 }
 componentWillUnmount() {
  window.clearInterval(this.state.wordIntervalID);
  window.clearInterval(this.state.rotateIntervalID);
 }

  render () {
    const {word,rotate,hardCoded} = this.state;
    const {hardCodedWord} = this.props;
    const splittedWord = word.split("");

    const letters = splittedWord.map((letter,i) => {
     if(letter!==" ") {
      return <span className="Word-letter" key={i}>{letter}</span>
     } else {
      return <span className="Word-blank" key={i}></span>
     }
    })
    // const hardCodedWordHTML = hardCodedWord.split("").map((letter,i) => <span key={i}>{letter}</span>);
    return (
      <div className={rotate ? "Word-container Word-container--rotate":"Word-container"}>
       {letters}
      </div>
    )
  }
}
export default Word;
