import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers
import Loader from "../../GlobalComponents/Loader";
import Experience from "./Experience";
import {throttle} from "lodash";

class ExperienceContainer extends Component {
   constructor() {
    super()
    this.state = {
     scrollHandler: null,
     pageYOffset: 0
    }
   }
   componentDidMount() {
    // const scrollHandler = throttle((e)=>{
    //     this.setState({ pageYOffset: window.pageYOffset})
    //    }, 200);
    //    this.setState({scrollHandler})
    //     document.addEventListener('scroll',scrollHandler,false)
    }
   componentWillUnmount() {
    // document.removeEventListener('scroll',this.state.scrollHandler,false);
   }
   render() {
    const { firebase, experiences} = this.props;
    const {pageYOffset, hasScrolled} = this.state;
    document.title=`Erfarenheter | Vilhelm Falkenmark`;

    var sortExperienceArray = []
    var sortedExperiences = {};
    if(isLoaded(experiences)) {
     for (var key in experiences) {
      experiences[key].key = key;
      sortExperienceArray.push(experiences[key])
     }
     // Sortera arry
     sortExperienceArray.sort((a,b) => a.order - b.order )
     // Skapa nytt objekt utifrån array
     sortExperienceArray.map((experience) => {
     sortedExperiences[experience.key] = experience;
    })
    }
     var experienceList = (!isLoaded(experiences))
                         ? <Loader type="Erfarenheter"/>
                         : (isEmpty(experiences))
                           ? 'Inga erfarenheter-prylar skapade'

                           : Object.keys(sortedExperiences).map((key) => (
                            <Experience key={key}
                             id={key}
                             experience={experiences[key]}
                             pageYOffset={pageYOffset}
                            />
                           ))


   return (
    <div className="Content-container">
     <h1 className="u-Center">Erfarenheter</h1>
     {experienceList}
    </div>
   )
   }
}
const Experiences = firebase([
  '/experiences'
])(ExperienceContainer)
export default connect(
  ({firebase}) => ({
    experiences: dataToJS(firebase, 'experiences')
  })
)(Experiences)
