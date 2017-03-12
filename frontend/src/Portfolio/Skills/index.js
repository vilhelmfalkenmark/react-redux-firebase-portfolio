import React, { Component } from 'react'
import Skill from './Skill'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers
import Loader from "../../GlobalComponents/Loader";

class SkillsContainer extends Component {
  render () {
    const { firebase, skills} = this.props
    document.title=`Färdigheter | Vilhelm Falkenmark`;
    const skillList = (!isLoaded(skills))
                        ? <Loader type="Färdigheter"/>
                        : (isEmpty(skills))
                          ? 'Inga färdigheter tillagda'
                          : Object.keys(skills).map((key) => (
                            <Skill key={key} id={key} skill={skills[key]} />
                          ))
    return (
     <div className="Content-container">
       <h1 className="u-Center">Mina färdigheter</h1>
       <ul className="Skill-list">
        {skillList}
       </ul>
     </div>
    )
  }
}
const Skills = firebase([
  '/skills'
])(SkillsContainer)
export default connect(
  ({firebase}) => ({
    skills: dataToJS(firebase, 'skills')
  })
)(Skills)
