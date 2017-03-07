import React, { Component } from 'react'
import { firebase } from 'react-redux-firebase';
import Updated from '../Updated'

class Skill extends Component {
constructor(props) {
 super(props)
 this.state = {
  active: false, // Om den här skillen används någonstans
  activePortfolios: [],
  updated: false
 }
}
updated() {
 this.setState({
  updated: true
 })
}
componentDidMount() {
 var portfolios = this.props.portfolios;
 var activePortfolios = [];
 if(portfolios) {
  for (var key in portfolios) {
    portfolios[key].skills.map((skill) => {
     if(skill === this.props.id) {
      activePortfolios.push(portfolios[key].title)
     }
    })
  }
 }
 this.setState({
  activePortfolios: activePortfolios,
  active: activePortfolios.length > 0 ? true : false
 })
}
render(){
    const {firebase, skill, id, portfolios} = this.props
    const {activePortfolios, active, updated} = this.state

    const deleteSkill = (event) => {
       firebase.remove(`/skills/${id}`)
    }
    const incSkill = () => {
       firebase.set(`/skills/${id}/value`, skill.value+= 1)
    }
    const decSkill = () => {
     firebase.set(`/skills/${id}/value`,  skill.value-= 1)
    }

    const updateSkill = () => {
      const {skillText,skillBackgroundColor,skillTextColor } = this.refs;
      firebase.set(`/skills/${id}`, {
       backgroundColor: skillBackgroundColor.value,
       color: skillTextColor.value,
       text: skillText.value,
       value: skill.value
      })
      this.updated()
    }

    const style = {
     backgroundColor: skill.backgroundColor,
     color: skill.color
    }

    var button = active ?
    <button className="A-col-btn--disabled">Kan ej raderas</button> :
    <button onClick={deleteSkill} className="A-col-btn--delete">Radera</button>

    return (
     <div className="A-col--skill">
        <input className="A-col--skill-bar-input"
        type="text"
        ref= "skillText"
        style={style}
        defaultValue={skill.text}
        />
        <label>Nivå:</label>
        <p>{skill.value} / 10</p>
        <label>Bokstavsfärg:</label>
        <input type="text" defaultValue={skill.color}
         ref="skillTextColor"
        />
        <span></span>
        <label>Bakgrundsfärg:</label>
        <input type="text" defaultValue={skill.backgroundColor}
         ref="skillBackgroundColor"
        />
        <span></span>
       {
        activePortfolios.length > 0 ?
        <div className="A-col--skill-list">
        <label>Används i portfolioinlägg:</label>
        <ul>
          {
           activePortfolios.map((portfolio, i) =>
           <li key={i}>{portfolio}</li>
          )
          }
         </ul></div> : null
       }
        <div className="A-col-actions A-col-actions--skill">
           <div className="A-col--skill-edit">
            <button onClick={skill.value < 10 ? incSkill : null} className="Skill-btn--inc">Öka</button>
            <button onClick={skill.value > 0 ? decSkill : null} className="Skill-btn--dec">Minska</button>
           </div>
          <div className="A-col--skill-update">
          <button onClick={updateSkill} className="A-col-btn--edit">Updatera</button>
          </div>
         <div className="A-col--skill-delete">
          {button}
         </div>

         {updated ? <Updated title={skill.text} type={"Färdigheten"} close={() => this.setState({
          updated: false
         })}/> : null}
        </div>
     </div>
    )
  }
}
export default firebase()(Skill)
