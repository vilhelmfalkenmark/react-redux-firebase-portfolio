import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
import Regexify from "../../GlobalComponents/Regexify";
const { isLoaded, isEmpty, pathToJS, dataToJS } = helpers
import Category from './Category'


class CategorysContainer extends Component {
   render() {
    const { firebase, articles, categorys } = this.props;

    const addCategory = () => {
     const { newCategory } = this.refs
      firebase.push('/categorys', {
       name: newCategory.value,
       url: Regexify(newCategory.value),
       count: 0
       })
      newCategory.value = ''
    }

    var editCategoryList = (!isLoaded(categorys))
                        ? 'Loading'
                        : (isEmpty(categorys))
                          ? 'Inga kategorier skapade'
                          : Object.keys(categorys).map((key) => (
                           <Category key={key} id={key} category={categorys[key]} articles = {articles} />
                          ))
   return (
    <div className="A-block">
     <section className="Categorys-container">
     <h1>Kategorier</h1>
       <div className="A-input-row">
          <div className="A-input-row-icon">
          <i className="flaticon-share"></i>
          </div>
          <div className="A-input-row-input">
            <label>Titel på ny kategori</label>
            <input type='text' ref='newCategory'/>
            <span></span>
          </div>
       </div>
       <div className="A-input-row">
          <div className="A-input-row-icon"></div>
        <div className="A-input-row-input">
          <button className="A-btn--add" onClick={addCategory}>Skapa kategori</button>
        </div>
       </div>
      </section>
      <h2 className="A-block-header-2">Befintliga kategorier</h2>
      <div className="A-cols">
       {editCategoryList}
      </div>
    </div>
   )
   }
}
const Categorys = firebase([
  '/articles',
  '/categorys'
])(CategorysContainer)
export default connect(
  ({firebase}) => ({
    articles: dataToJS(firebase, 'articles'),
    categorys: dataToJS(firebase, 'categorys')
  })
)(Categorys)


{/* <div className="Comment-container">
 <h3>Kommentarer på artikel med nyckel {articleKey}</h3>
  <label>Ditt namn</label>
  <input type="text" ref="name" onChange={(e) => this.setState({name: e.target.value})} />
  <span></span>
  <label>Kommentar</label>
  <textarea ref="comment" onChange={(e) => this.setState({comment: e.target.value})}></textarea>
  {button}
  <div className="Comment-list">
   {commentList}
  </div>
</div> */}
