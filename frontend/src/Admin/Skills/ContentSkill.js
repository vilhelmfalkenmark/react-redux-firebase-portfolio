import React from 'react'

export default class ContentSkill extends React.Component {

 constructor() {
  super()
  this.state = {
   selected: false
  }
 }

 selected() {
   this.setState({
    selected: !this.state.selected
   })
   this.props.selectSkill(this.props.id, !this.state.selected)
 }

 render() {
  const {selected} = this.state
  const {skill} = this.props;
  const style = {
   color: skill.color,
   backgroundColor: skill.backgroundColor
  }

  return (
   <div className={selected ? "A-content-skill A-content-skill--selected" : "A-content-skill"}
   style={style}
   onClick={this.selected.bind(this)}>
   {skill.text}</div>
  )


 }

}
