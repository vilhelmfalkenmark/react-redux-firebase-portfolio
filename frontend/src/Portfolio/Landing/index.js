import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
import { footer  } from "../../Actions/Dom";
const { isLoaded, isEmpty, pathToJS, dataToJS } = helpers
import ParticleContainer from "../Particles";
import Word from "../Word"

class LandingContainer extends Component {
 constructor(props) {
  super(props)
  this.state = {
   words: {
    a: {
     word: "Webb utvecklare"
    },
    t: {
     word: "Front-End utvecklare"
    },
    b: {
     word: "Javascript utvecklare"
    },
    c: {
     word: "React & Redux utvecklare"
    },
    d: {
     word: "Node.js utvecklare"
    },
    f: {
     word: "Express Rest API utvecklare"
    },
    c: {
     word: "Angular utvecklare"
    },
    g: {
     word: "SASS utvecklare"
    },
    e: {
     word: "Wordpress utvecklare"
    },
    f: {
     word: "PHP & MySQL utvecklare"
    },
    h: {
     word: "Git utvecklare"
    },
    l: {
     word: "Firebase utvecklare"
    },
    l: {
     word: "MongoDB utvecklare"
    }
   }
  }
 }

componentDidMount() {
this.props.dispatch(footer(true))
}

componentWillReceiveProps() {

}

componentWillUnmount() {
 this.props.dispatch(footer(false))
}
  render () {
   const {words} = this.state;
   document.title=`Vilhelm Falkenmark`;
    return (
      <div className="Landing-container">
       <div className="Landing-about">
        <h1>Vilhelm Falkenmark</h1>
        <div className="Word-container">
          <Word words={words} />
        </div>
       </div>
        <ParticleContainer />
      </div>
    )
  }
}
const Landing = firebase([
  '/skills'
])(LandingContainer)
export default connect(
  ({firebase}) => ({
    skills: dataToJS(firebase, 'skills')
  })
)(Landing)
