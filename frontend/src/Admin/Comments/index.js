import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty,dataToJS } = helpers
import Comment from './Comment'
// import Category from './Category'
class CommentsContainer extends Component {
   render() {
    const {comments, articles } = this.props;




    var commentList = (!isLoaded(comments) || !isLoaded(articles))
                              ? 'Laddar'
                              : (isEmpty(comments))
                                ? 'Inga kommentarer inlagda'
                                : Object.keys(comments).map((key) => (
                                 <Comment key={key} id={key} comment={comments[key]}
                                  article={typeof(articles[comments[key].articleKey]) !== "undefined" ?
                                   articles[comments[key].articleKey].title :
                                   "Artikel finns inte längre" }/>
                                ))

   return (
    <div className="A-block">
     <section className="Comments-container">
     <h1>Kommentarer</h1>
      <div className="A-cols">
       {commentList}
      </div>
     </section>
    </div>
   )
   }
}
const Comments = firebase([
  '/articles',
  '/comments'
])(CommentsContainer)
export default connect(
  ({firebase}) => ({
    articles: dataToJS(firebase, 'articles'),
    comments: dataToJS(firebase, 'comments')
  })
)(Comments)
