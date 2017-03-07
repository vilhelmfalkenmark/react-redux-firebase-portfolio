import React, { Component } from 'react'
import { firebase, helpers } from 'react-redux-firebase'
import Warning from '../Warning'
import Updated from '../Updated'

class Comment extends Component {
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
    const {firebase, comment, id,article} = this.props
    const {sure, updated} = this.state;
    const deleteComment= (experience) => {
       firebase.remove(`/comments/${id}`)
    }


    const approveComment = () => {

       const status = `/comments/${id}/approved`;
       console.log(status);

       firebase.set(`/comments/${id}/approved`, !comment.approved)
       this.updated();
    }

    const button = sure ?
    <button onClick={deleteComment} className="A-col-btn--delete">Ja, Radera</button> :
    <button onClick={() => {this.setState({sure: true })}} className="A-col-btn--delete">Radera</button>
    const approved = comment.approved ? <p className="u-Green">Publicerad</p> : <p className="u-Red">Ej publicerad</p>

    return (
      <div className="A-col--wide A-col--wide-comment">
        <label>Person</label>
         <h4>{comment.name}</h4>
         <label>Kommentar</label>
         <p>{comment.comment}</p>
         <label>Datum</label>
         <p>{comment.datestring}</p>
         <label>Artikel</label>
         <p>{article}</p>
         <label>Status</label>
         {approved}
         <div className="A-col-actions ">
          <div className="A-col-actions--two-col">
           <div className={comment.approved ? "A-col--radiobtn is-active" :"A-col--radiobtn not-active"} onClick={approveComment}>
             <span></span>
           </div>
          </div>
          <div className="A-col-actions--two-col">
           {button}
          </div>
          { sure  ? <Warning type={"den här kommentaren"} title={""} /> : null }
          {updated ? <Updated title = {"Kommentarens status"} type={""} close={ () => this.setState({
           updated: false
          })}/> : null}
         </div>
      </div>
    )
  }
}
export default firebase()(Comment)
