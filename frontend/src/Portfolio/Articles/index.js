import React from 'react'
import ArticleFull from './ArticleFull'
import ArticleTeaser from './ArticleTeaser'
import CategoryTeaser from './CategoryTeaser'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
import { Link } from 'react-router';
const { isLoaded, isEmpty, dataToJS } = helpers
import Loader from "../../GlobalComponents/Loader";
import CommentBox from "../Comment";

class ArticlesContainer extends React.Component {
  render () {
    const { firebase, articles, categorys, images } = this.props
    let articleLatest = null;
    let articleTeasers = null;
    let articleArray = [];
    let categoryArray = [];
    // console.log(articleLatest,"articleLatest");
    // console.log(articleArray,"articleArray");
    if(
     (isLoaded(articles) && !isEmpty(articles)) &&
     (isLoaded(categorys) && !isEmpty(categorys))
     ) {
     for(var key in articles) {
      articleArray.push(Object.assign({},articles[key],{key}))
     }

     articleArray.sort((a,b) => new Date(b.created) - new Date(a.created));
     // console.log(articleArray);
     articleLatest = articleArray.shift();
     articleTeasers = articleArray.filter((teaser, index) => index < 3);
     for (var category in categorys) {
      categoryArray.push(categorys[category]);
     }
    }
    return (
      <div className="Content-container">
         {
          (!isLoaded(articles) && !isLoaded(categorys)) ?
           <Loader type="Artiklar"/> : null
         }
         {/* SENAST SKAPADE ARTIKLAR */}
         {
          articleLatest !== null ?
          <section>
          <ArticleFull
           key={Date.now()}
           article={articleLatest}
           category={categorys[articleLatest.category].name}

          />

          <CommentBox articleKey={articleLatest.key} />
         </section> : "Ingen artikel skapad"
         }
         <section>
          <h4>Senaste artiklarna</h4>
           <div className="Articles-teasers">
           {
            articleTeasers !== null ?
            articleTeasers.map( (teaser, i) =>
            <ArticleTeaser key={i}
             teaser={teaser}
             categorys={categorys}
            />
           ) : null
           }
          </div>
         </section>
         <section>
          <h4>Alla kategorier</h4>
          <div className="Articles-category-teasers">
          {
           categoryArray.length > 0 ?
           categoryArray.map( (category, i) =>
           <CategoryTeaser
            key={i}
            category={category}
           />
          ) : "Inga kategorier skapade"
          }
         </div>
        </section>

      </div>
    )
  }
}
const Articles = firebase([
  '/articles',
  '/categorys'
])(ArticlesContainer)
export default connect(
  ({firebase}) => ({
    articles: dataToJS(firebase, 'articles'),
    categorys: dataToJS(firebase, 'categorys')
  })
)(Articles)
