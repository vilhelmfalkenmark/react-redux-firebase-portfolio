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
    one: {
     word: "Jag är en Webbutvecklare"
    },
    a: {
     word: "& Front-End Entusiast"
    },
    b: {
     word: "Född och uppvuxen i Stockholm."
    },
    c: {
     word: "Jag tycker Javascript och ES6..."
    },
    d: {
     word: "är roligast att skriva kod i."
    },
    e: {
     word: "Och just nu blir det mest React-redux"
    },
    // f: {
    //  word: "Men har inget emot att utveckla mot lamp-stacken"
    // },
    g: {
     word: "har svart bälte i SASS"
    },
    h: {
     word: "Wordpressare"
    },
    i: {
     word: "& PHP-utvecklare"
    },
    j: {
     word: "Men just nu känns Node.js roligare"
    },
    k: {
     word: "Notorisk Gitarrknäppare"
    },
    l: {
     word: "Cyklar jättesnabbt"
    },
    // m: {
    //  word: "Cyklar jättesnabbt"
    // },
    n: {
     word: "Föredrar att kallas 'Ville'"
    },
    o: {
     word: "Kul att du är här!"
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
