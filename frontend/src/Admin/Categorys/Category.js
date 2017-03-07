import React, { Component } from 'react'
import { firebase } from 'react-redux-firebase'
import Updated from '../Updated'
import Regexify from "../../GlobalComponents/Regexify";
class Category extends Component {
 constructor() {
  super()
  this.state = {
   updated: false
  }
 }
 updated() {
  this.setState({
   updated: true
  })
 }
render(){
    const {firebase, category, id, articles} = this.props
    const {updated} = this.state
    const deleteCategory = (category) => {
       firebase.remove(`/categorys/${id}`)
    }
    const editCategory = (category) => {
      const { name, count } = this.refs
       firebase.set(`/categorys/${id}/`, {
        name: name.value,
        url: Regexify(name.value),
        count: parseInt(count.value)
       })
       this.updated();
    }
     const articleList = [];
     for (var key in articles) {
      articles[key].category === id ? articleList.push(articles[key].title) : null
     }

    var button = category.count === 0 ?
    <button onClick={deleteCategory} className="A-col-btn--delete">Radera</button> :
    <button className="A-col-btn--disabled">Radera</button>
    return (
      <div className="A-col">
        <label>Namn på kategori</label>
        <input type="text" defaultValue={category.name} ref="name"/>
        <span></span>
        <input type="hidden" defaultValue={category.count} ref="count"/>
        <h4>{category.count} inlägg</h4>
        <ul >
          {
            articleList.length > 0 ? articleList.map( (article,index) => {
             return <li key={index}>{article}</li>
            }) : null
         }
        </ul>
         <div className="A-col-actions ">
          <div className="A-col-actions--two-col">
           <button onClick={editCategory} className="A-col-btn--edit">Uppdatera</button>
          </div>
          <div className="A-col-actions--two-col">
           {button}
          </div>
          {updated ? <Updated title = {category.name} type={"Kategorin"} close={ () => this.setState({
           updated: false
          })}/> : null}
         </div>
      </div>
    )
  }
}
//HOC Adds this.props.firebase
export default firebase()(Category)
