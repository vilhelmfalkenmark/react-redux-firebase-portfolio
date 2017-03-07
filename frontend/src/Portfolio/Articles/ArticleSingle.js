//////////////////////////////////////////
// Används när man klickat på att läsa artikel
// efter artiklar/kategori/artikel-titel
//////////////////////////////////////////
import React from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
import ArticleFull from './ArticleFull'
import { Redirect} from 'react-router'
const { isLoaded, dataToJS } = helpers
import Loader from "../../GlobalComponents/Loader";
import CommentBox from "../Comment";


class ArticleSingleContainer extends React.Component {
  render () {
   const {articles,categorys,pathname} = this.props;
   let articleURL = pathname.split("/").pop();
   var theArticle = null
   const allArticles = [];

   if(isLoaded(articles) && isLoaded(categorys) ) {
    let article = {};
    for (var key in articles) {
     article = articles[key];
     article.key = key;
     allArticles.push(article)
    }
    theArticle = allArticles.filter(article => articleURL === article.url)
   }
   const articleOutput =
    theArticle === null ?
     <Loader type="Artikel"/>
     : theArticle.length === 0 ?
     <Redirect to={{pathname: '/404'}}/> // <-- 404 redirect
     : <ArticleFull
         key={Date.now()}
         article={theArticle[0]}
         category={categorys[theArticle[0].category].name}
        />
    return (
     <section className="Content-container">
      {articleOutput}
      {theArticle !== null ?
       <CommentBox articleKey={theArticle[0].key} /> : null
       }
     </section>
    )
  }
}
const ArticleSingle = firebase([
  '/articles',
  '/categorys'
])(ArticleSingleContainer)
export default connect(
  ({firebase}) => ({
    articles: dataToJS(firebase, 'articles'),
    categorys: dataToJS(firebase, 'categorys')
  })
)(ArticleSingle)
