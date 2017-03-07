import React, { Component } from 'react'
import { firebase, helpers } from 'react-redux-firebase'
import Warning from '../Warning'
import Updated from '../Updated'

class Experience extends Component {
 constructor() {
  super()
  this.state = {
   sure: false,
   updated: false
  }
 }
 updated() {
  this.setState({
   updated: true
  })
 }
render(){
    const {firebase, experience, id} = this.props
    const {sure, updated} = this.state;
    const deleteExperience = (experience) => {
       firebase.remove(`/experiences/${id}`)
    }

    const editExperience = (experience) => {
      const { title, content,position,link,start,end,order } = this.refs
       firebase.set(`/experiences/${id}/`, {
        title: title.value,
        content: content.value,
        position: position.value,
        link: link.value,
        start: start.value,
        end: end.value,
        order: parseInt(order.value)
       })
       this.updated();
    }
    var button = sure ?
    <button onClick={deleteExperience} className="A-col-btn--delete">Ja, Radera</button> :
    <button onClick={() => {this.setState({sure: true })}} className="A-col-btn--delete">Radera</button>
    return (
      <div className="A-col--wide">
        <label>Erfarenhet</label>
        <input type="text" defaultValue={experience.title} ref="title"/>
        <span></span>
        <label>Innehåll</label>
        <textarea type='text' ref='content' defaultValue={experience.content}></textarea>
        <label>Befattning</label>
        <input type="text" defaultValue={experience.position} ref="position"/>
        <span></span>
        <label>Länk</label>
        <input type="text" defaultValue={experience.link} ref="link"/>
        <span></span>
        <label>Startdatum</label>
        <input type="text" defaultValue={experience.start} ref="start"/>
        <label>Slutdatum</label>
        <input type="text" defaultValue={experience.end} ref="end"/>
        <label>Ordning</label>
        <input type="number" defaultValue={experience.order} ref="order"/>
        <span></span>
         <div className="A-col-actions ">
         <div className="A-col-actions--two-col">
           <button onClick={editExperience} className="A-col-btn--edit">Uppdatera</button>
          </div>
          <div className="A-col-actions--two-col">
          { sure  ? <Warning type={"erfarenheten"} title={experience.title} /> : null }
           {button}
          </div>
          {updated ? <Updated title = {experience.title} type={"Erfarenheten"} close={ () => this.setState({
           updated: false
          })}/> : null}
         </div>
      </div>
    )
  }
}
export default firebase()(Experience)
