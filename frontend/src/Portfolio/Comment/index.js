import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';
const { isLoaded,  dataToJS } = helpers;
import Loader from "../../GlobalComponents/Loader";
import Dateify from "../../GlobalComponents/Dateify";
import Comment from "./Comment";
import {siteFixed} from "../../Actions/Dom";

class Comments extends Component {
 constructor() {
  super()
  this.state = {
   name: "",
   comment: "",
   shown: false,
   slideleft: false,
   display: "none",
   opacity: 0
  }
 }



 slideLeft() {
  this.setState({ slideleft: true, name: "", comment: "" })
  }

  showModal() {
   this.props.dispatch(siteFixed(true));
   this.setState({shown:!this.state.shown, slideleft: false, display: "flex",opacity: 1})
  }
  hideModal() {
   this.props.dispatch(siteFixed(false));
   this.setState({shown:!this.state.shown, slideleft: false,opacity: 0})

   window.setTimeout(
    () => {
      this.setState({display: "none"})
      },500)
    }

  render () {
    const { firebase, comments, articleKey } = this.props;
    const { name,comment,modal,shown,slideleft, display, opacity} = this.state;

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
       this.slideLeft()
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
                        thisComments.length > 0 ? thisComments.map((comment,i) => comment.approved ?
                        <Comment key={i} comment={comment} /> : null) : ''

    const commentBtn = (name!=="" && comment!=="") ?
    <button className="Comment-btn--active" onClick={addComment}>Kommentera</button> :
    <button className="Comment-btn--passive">Kommentera</button>

    return (
      <section className="Comment-container">
       <span onClick={this.showModal.bind(this)} className="Comment-button">
        <i className="flaticon-chat"></i>Kommentera inlägg</span>

       <div className={shown ? "Comment-container-fixed is-visible" : "Comment-container-fixed"} style={{display: display, opacity: opacity}}>
         <div className="Comment-container-clickarea" onClick={this.hideModal.bind(this)}></div>

       <div className={slideleft ? "Comment-container-inner u-Overflow-Hidden" : "Comment-container-inner"}>
        <i className="Comment-close" onClick={this.hideModal.bind(this)}></i>

        <div className={slideleft ? "Comment-container-slider slide-left":"Comment-container-slider"}>

         <div className="Comment-form">
            <h3>Kommentera artikel</h3>
             <label>Ditt namn</label>
             <input type="text" ref="name" onChange={(e) => this.setState({name: e.target.value})} />
             <span></span>
           <label>Kommentar</label>
           <textarea ref="comment" onChange={(e) => this.setState({comment: e.target.value})}></textarea>
          {commentBtn}
        </div>

         <div className="Comment-confirmation">
          <div>
           <h2>Tack för ditt meddelande {name}</h2>
           <p>För ordningens skull måste den bli godkänd innan den publiceras</p>
           </div>
        </div>

        </div>

        </div>


        </div>

        <div className="Comment-list">
         {commentList}
        </div>
      </section>
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
