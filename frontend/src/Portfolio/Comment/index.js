import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded,  dataToJS } = helpers
import Loader from "../../GlobalComponents/Loader";
import Dateify from "../../GlobalComponents/Dateify";
import Modal from "../../GlobalComponents/Modal";
import Comment from "./Comment";

class Comments extends Component {
 constructor() {
  super()
  this.state = {
   name: "",
   comment: "",
   modal: false
  }
 }

 showModal() {
  this.setState({
   modal: true
  })
 }



  render () {
    const { firebase, comments, articleKey } = this.props;
    const { name,comment,modal } = this.state;

    const addComment = () => {
      const { name,comment  } = this.refs
       firebase.push(`/comments`, {
        name: name.value,
        comment: comment.value,
        approved: false,
        timestamp: Date.now(),
        datestring: Dateify(new Date()),
        articleKey: articleKey
       })
       this.showModal(),
       name.value = "";
       comment.value = "";
    }
    let thisComments = [];
    if(isLoaded(comments)) {
     for (var key in comments) {
      if(comments[key].articleKey === articleKey) {
       thisComments.push(comments[key])
      }
     }
     thisComments.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    const commentList = (!isLoaded(comments)) ? <Loader type="Kommentarer"/> :
                        thisComments.length > 0 ? thisComments.map((comment,i) => comment.approved ? <Comment key={i} comment={comment} /> : null) :
                        'Det här inlägget har inga kommentarer'


    const commentBtn = (name!=="" && comment!=="") ?
    <button className="Comment-btn--active" onClick={addComment}>Kommentera</button> :
    <button className="Comment-btn--passive">Kommentera</button>

    return (
      <div className="Comment-container">
        <div className="Comment-form">
          <h3>Kommentera artikel</h3>
           <label>Ditt namn</label>
           <input type="text" ref="name" onChange={(e) => this.setState({name: e.target.value})} />
           <span></span>
         <label>Kommentar</label>
         <textarea ref="comment" onChange={(e) => this.setState({comment: e.target.value})}></textarea>
        {commentBtn}
       </div>
       <div className="Comment-list">
        {commentList}
       </div>
       {
        modal ? <Modal name={name} closeModal={() => this.setState({modal: !modal})}/> : null
       }
      </div>
    )
  }
}
const CommentBox = firebase([
  '/comments'
])(Comments)
export default connect(
  ({firebase}) => ({
    comments: dataToJS(firebase, 'comments')
  })
)(CommentBox)
