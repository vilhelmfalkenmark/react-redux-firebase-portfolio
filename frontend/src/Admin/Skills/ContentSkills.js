///////////////////////////////////////////////
// Den här kompontenten ska läggas överallt där
// man ska kunna välja en färdighet/skill/teknik till inenhåll
// exempelvis portfolio och artiklar
///////////////////////////////////////////////
import React from 'react';
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers
import ContentSkill from './ContentSkill';

class ContentSkillsContainer extends React.Component {
constructor() {
 super()
 this.state= {
  selectedSkills: []
 }
}


selectSkill(skill,action) {
let selectedSkills = [];
if(action) {
 selectedSkills = this.state.selectedSkills.concat(skill)
} else {
 selectedSkills = this.state.selectedSkills.filter( (i) => i!==skill)
}
this.setState({selectedSkills})
this.props.selectedSkills(selectedSkills)
}

render() {
const {skills} = this.props;
// const {selectedSkills} = this.state;
var contentSkillList = (!isLoaded(skills))
                    ? 'Laddar!'
                    : (isEmpty(skills))
                      ? 'Inga portfolio-prylar skapade'
                      : Object.keys(skills).map((key) => (
                        <ContentSkill key={key} id={key}
                        skill={skills[key]}
                        selectSkill={this.selectSkill.bind(this)} />
                      ))

return(
 <div className="A-content-skills-cols">
  {contentSkillList}
 </div>
)
}
}
const ContentSkills = firebase([
  '/skills'
])(ContentSkillsContainer)
export default connect(
  ({firebase}) => ({
    skills: dataToJS(firebase, 'skills')
  })
)(ContentSkills)
