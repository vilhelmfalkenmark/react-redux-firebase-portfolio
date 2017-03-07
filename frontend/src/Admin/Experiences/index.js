import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, pathToJS, dataToJS } = helpers
import Experience from './Experience'
// import Category from './Category'
class ExperiencesContainer extends Component {
   render() {
    const { firebase, experiences } = this.props;
    const addExperience = () => {
     const { expTitle, expContent, expPosition ,expLink, expStarting, expEnding, order } = this.refs
      firebase.push('/experiences', {
       title: expTitle.value,
       content: expContent.value,
       position: expPosition.value,
       link: expLink.value,
       start: expStarting.value,
       end: expEnding.value,
       order: parseInt(order.value)
       })
      expTitle.value = ''
      expContent.value = ''
      expLink.value = ''
      expStarting.value = ''
      expEnding.value = ''
      expPosition.value = ''
      order.value = ''
    }

    var editExperienceList = (!isLoaded(experiences))
                              ? 'Loading'
                              : (isEmpty(experiences))
                                ? 'Inga erfarenheter skapade'
                                : Object.keys(experiences).map((key) => (
                                 <Experience key={key} id={key} experience ={experiences[key]} />
                                ))
   return (
    <div className="A-block">
     <section className="Categorys-container">
     <h1>Erfarenheter</h1>

       <div className="A-input-row">
          <div className="A-input-row-icon">
          <i className="flaticon-header"></i>
          </div>
          <div className="A-input-row-input">
            <label>Företag/Skola/Praktik</label>
            <input type='text' ref='expTitle' />
            <span></span>
          </div>
       </div>

       <div className="A-input-row">
          <div className="A-input-row-icon">
          <i className="flaticon-folded-newspaper"></i>
          </div>
          <div className="A-input-row-input">
            <label>Innehåll</label>
            <textarea type='text' ref='expContent'></textarea>
          </div>
       </div>
       <div className="A-input-row">
          <div className="A-input-row-icon">
          <i className="flaticon-user"></i>
          </div>
          <div className="A-input-row-input">
            <label>Befattning</label>
            <input type='text' ref='expPosition' />
            <span></span>
          </div>
       </div>

       <div className="A-input-row">
          <div className="A-input-row-icon">
          <i className="flaticon-unlink"></i>
          </div>
          <div className="A-input-row-input">
            <label>Länk</label>
            <input type='text' ref='expLink' />
            <span></span>
          </div>
       </div>

       <div className="A-input-row">
          <div className="A-input-row-icon">
          <i className="flaticon-share"></i>
          </div>
          <div className="A-input-row-input">
            <label>Startdatum</label>
            <input type='text' ref='expStarting' />
            <span></span>
            <label>Slutdatum</label>
            <input type='text' ref='expEnding' />
            <span></span>
          </div>
       </div>

       <div className="A-input-row">
          <div className="A-input-row-icon">
          <i className="flaticon-list"></i>
          </div>
          <div className="A-input-row-input">
            <label>Ordning</label>
            <input type='number' ref='order' />
            <span></span>
          </div>
       </div>
       <div className="A-input-row">
          <div className="A-input-row-icon"></div>
        <div className="A-input-row-input">
          <button className="A-btn--add" onClick={addExperience}>Skapa Erfarenhet</button>
        </div>
       </div>
      </section>
      <h2 className="A-block-header-2">Befintliga erfarenheter</h2>
      <div className="A-cols">
       {editExperienceList}
      </div>
    </div>
   )
   }
}
const Experiences = firebase([
  '/experiences'
])(ExperiencesContainer)
export default connect(
  ({firebase}) => ({
    experiences: dataToJS(firebase, 'experiences')
  })
)(Experiences)
