import React, { Component } from 'react'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty } = helpers
import Warning from '../Warning'
import Updated from '../Updated'

class Portfolio extends Component {

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
    const {firebase, portfolio, id, skills} = this.props;
    const {sure, updated} = this.state;

    const deletePortfolio = (portfolio) => {
       firebase.remove(`/portfolios/${id}`)
    }
    const editPortfolio = (portfolio) => {
      const { title, content, link, order } = this.refs
       firebase.set(`/portfolios/${id}/`, {
         title: title.value,
         content: content.value,
         link: link.value,
         order: order.value,
         image: this.props.portfolio.image,
         skills: this.props.portfolio.skills
       })
       this.updated();
    }

    var skillList = (!isLoaded(skills))
                        ? 'Laddar!'
                        : (isEmpty(skills))
                          ? 'Tomt!'
                          : portfolio.skills.map((skill, i) =>
                               <div className="A-content-skill" key={i} style={
                               {color: skills[skill].color, backgroundColor: skills[skill].backgroundColor}
                             }> {skills[skill].text}</div>
                            )



    var button = sure ?
    <button onClick={deletePortfolio} className="A-col-btn--delete">Ja, Radera</button> :
    <button onClick={() => {this.setState({sure: true })}} className="A-col-btn--delete">Radera</button>

    var skillBox;

    return (
      <div className="A-col--wide A-col--wide-portfolio">
        <label>Bild</label>
         <img src={portfolio.image.downloadURL} alt={portfolio.image.name}/>
         <label>Titel</label>
         <input type="text" defaultValue={portfolio.title} ref="title"/>
         <span></span>
         <label>Innehåll</label>
         <textarea type='text' ref='content' defaultValue={portfolio.content}></textarea>
         <label>Länk</label>
         <input type='text' ref='link' defaultValue={portfolio.link} />
         <span></span>
         <label>Ordning</label>
         <input type='text' ref='order' defaultValue={portfolio.order} />
         <span></span>
         <label>Tekniker</label>
         <div className="A-content-skills-cols">
         {skillList}
         </div>
         <div className="A-col-actions">
          <div className="A-col-actions--two-col">
           <button onClick={editPortfolio} className="A-col-btn--edit">Uppdatera</button>
          </div>
          <div className="A-col-actions--two-col">
          { sure  ? <Warning type={"portfolion"} title={portfolio.title} /> : null }
          {button}
          </div>
         {updated ? <Updated title = {portfolio.title} type={"Portfolion"} close={ () => this.setState({
          updated: false
         })}/> : null}
         </div>
      </div>
    )
  }
}
//HOC Adds this.props.firebase
export default firebase()(Portfolio)
