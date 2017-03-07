import React, {  Component } from 'react'
import {  Link } from 'react-router';
import { firebase } from 'react-redux-firebase'
import Warning from '../Warning'
class Article extends Component {
constructor() {
 super()
 this.state = {
  sure: false
 }
}
render(){
    const {firebase, article, id, categorys} = this.props
    const {sure} = this.state
    const deleteArticle = () => {
     typeof(categorys[article.category]) !== "undefined" ?
      firebase.set(`/categorys/${article.category}/count`,categorys[article.category].count -=1 ) : null
      firebase.remove(`/articles/${article.key}`)
    }
    var button = sure ?
    <button onClick={deleteArticle} className="A-col-btn--delete">Ja, Radera</button> :
    <button onClick={() => {this.setState({sure: true })}} className="A-col-btn--delete">Radera</button>
    return (
      <div className="A-col">
       <div className="A-col-content">
         <label>Rubrik</label>
         <h4>{article.title}</h4>
         <label>Bild</label>
         <p>{ typeof(article.image) !== "undefined" ? article.image : "Ingen bild" }</p>
         <label>Kategori</label>
         <p>{article.categoryName} </p>
         <label>Skrivet</label>
         <p>{article.date}</p>
       </div>
       <div className="A-col-actions">
          <div className="A-col-actions--two-col">
           <Link className="A-col-btn--edit" to={`/admin/articles/${article.url}` }>Redigera</Link>
          </div>
          <div className="A-col-actions--two-col">
          { sure  ? <Warning type={"artikeln"} title={article.title} /> : null }
          {button}
          </div>
       </div>
      </div>
    )
  }
}
//HOC Adds this.props.firebase
export default firebase()(Article)
