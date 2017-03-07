import React from "react";
import ParticleContainer from "../Particles";
import Word from "../Word"
import { connect } from 'react-redux'
import { footer  } from "../../Actions/Footer";

class notFound extends React.Component {

 componentDidMount() {
 this.props.dispatch(footer(true))
 }
 componentWillUnmount() {
  this.props.dispatch(footer(false))
 }
render() {

 return (
   <div className="Landing-container">
    <div className="Landing-about">
     <h1 className="404-title">Det blev en 404, trist!</h1>
     <div className="Word-container">
      <h3>Tänkbara anledningar till att det blev galet</h3>
       <Word words={
        {
         one: {
          word: "Sidan finns inte längre"
         },
         two: {
          word: "Sidan har aldrig funnits"
         },
         three: {
          word: "Något är fel med uppkopplingen"
         },
         four: {
          word: "Hur stor tror du att rymden är?"
         },
         five: {
          word: "Tänk på att alltid bemöta andra som du själv vill bli bemött"
         },
         six: {
          word: "Wakka wakka"
         },
         seven: {
          word: "Har du testat att blanda Saltgurka, vodka, Smetlana och Honung. Alltså wow vilken sjuk smakkombination!"
         }
        }
       } />
     </div>
    </div>
     <ParticleContainer />
   </div>
 )
 }
}

export default connect()(notFound);
