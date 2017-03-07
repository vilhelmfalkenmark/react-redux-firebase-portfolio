import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
import { footer  } from "../../Actions/Footer";
const { isLoaded, isEmpty, pathToJS, dataToJS } = helpers
import ParticleContainer from "../Particles";
import Word from "../Word"

class LandingContainer extends Component {
 constructor(props) {
  super(props)
  this.state = {
   words: {
    one: {
     word: "Webbutvecklare"
    },
    two: {
     word: "Front-End entusiast"
    },
    three: {
     word: "Javascript fanboy"
    },
    four: {
     word: "React & Reduxare"
    },
    five: {
     word: "Gulpare"
    },
    six: {
     word: "SASS haxxor"
    },
    seven: {
     word: "Wordpresser"
    },
    eight: {
     word: "Node.js fan"
    },
    nine: {
     word: "PHP:are"
    },
    ten: {
     word: "Gitarrknäppare"
    },
    eleven: {
     word: "Och säkert massa fler saker"
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
