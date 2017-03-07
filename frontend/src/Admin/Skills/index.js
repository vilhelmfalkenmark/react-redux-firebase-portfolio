import React, { Component } from 'react'
import Skill from './Skill'
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers

class SkillsContainer extends Component {

 constructor() {
  super()
  this.state = {
   range: 4,
   skillText: "",
   backgroundColor: "#fff",
   color: "#fff"
  }
 }

  backgroundComplete = (color) => {
    this.setState({ backgroundColor: color.hex });
  };
  colorComplete = (color) => {
    this.setState({ color: color.hex });
  };

  render () {
    const { firebase, skills, portfolios } = this.props;
    const { range, skillText, backgroundColor, color } = this.state;

    const handleAdd = () => {
      const { skillText, skillValue } = this.refs
      firebase.push('/skills', {
       text: skillText.value,
       value: parseInt(skillValue.value),
       color,
       backgroundColor
      })
      skillText.value = ''
      skillValue.value = ''
    }
    const previewStyle = {
     width: range*10+"%",
     color: color,
     backgroundColor: backgroundColor
    }

    const skillList = (!isLoaded(skills && portfolios))
                        ? 'Loading'
                        : (isEmpty(skills))
                          ? 'Du har inte lagt till några färdigheter'
                          : Object.keys(skills).map((key) => (
                            <Skill key={key} id={key} portfolios={portfolios} skill={skills[key]} />
                          ))



    return (
      <div className="A-block">
      <section className="Skills-container">
      <h1>Färdigheter</h1>
        <div className="A-input-row">
         <div className="A-input-row-icon">
          <i className="flaticon-design-skills"></i>
         </div>
         <div className="A-input-row-input">
            <label>Namn på färdighet</label>
           <input type='text' ref='skillText' value={skillText} onChange={(e) => this.setState({ skillText: e.target.value})} />
           <span></span>
          </div>
        </div>

        <div className="A-input-row">
         <div className="A-input-row-icon">
          <i className="flaticon-controls"></i>
         </div>
         <div className="A-input-row-input">
           <label>Hur grym är du på skala 1 - 10</label>
           <input type="range" min="1" max="10" defaultValue={range} onChange={(e) => this.setState({ range: e.target.value})} ref='skillValue'/>
           <h4 className="u-Grey">Nuvarande värde: {range}</h4>
          </div>
        </div>

        <div className="A-input-row">
         <div className="A-input-row-icon">
          <i className="flaticon-controls"></i>
         </div>
         <div className="A-input-row-input A-skills-color-cols">
           <div className="A-skills-color-col">
           <label>Bakgrundsfärg {this.state.backgroundColor}</label>
           <SketchPicker
           color={this.state.backgroundColor }
           onChangeComplete={this.backgroundComplete }
           />
           </div>
           <div className="A-skills-color-col">
           <label>Bokstavsfärg {this.state.color}</label>
           <SketchPicker
           color={this.state.color }
           onChangeComplete={this.colorComplete }
           />
           </div>
          </div>
        </div>

        <div className="A-input-row">
         <div className="A-input-row-icon">
          <i className="flaticon-controls"></i>
         </div>
         <div className="A-input-row-input">
         <label>Förhandsvisning</label>
          <div className="A-skill-preview" style={previewStyle}>{skillText}</div>
          </div>
        </div>

        <div className="A-input-row">
         <div className="A-input-row-icon">
         </div>
         <div className="A-input-row-input">
           <button className="A-btn--add" onClick={handleAdd}>Lägg till</button>
          </div>
        </div>

          <div className="A-cols">
           {skillList}
          </div>
          </section>
      </div>
    )
  }
}
const Skills = firebase([
  '/skills',
  '/portfolios'
])(SkillsContainer)
export default connect(
  ({firebase}) => ({
    skills: dataToJS(firebase, 'skills'),
    portfolios: dataToJS(firebase, 'portfolios')
  })
)(Skills)
