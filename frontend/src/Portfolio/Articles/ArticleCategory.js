//////////////////////////////////////////
// Används när man klickat på att läsa artikel
// efter artiklar/kategori
//////////////////////////////////////////
import React from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
import ArticleFull from './ArticleFull'
import ArticleTeaser from './ArticleTeaser'
import CategoryTeaser from './CategoryTeaser'
const { isLoaded, isEmpty, dataToJS } = helpers
import Loader from "../../GlobalComponents/Loader";
import { Redirect} from 'react-router'
import CommentBox from "../Comment";


class ArticleCategoryContainer extends React.Component {
  render () {
   const {articles, categorys, pathname} = this.props;
   let categoryURL = pathname.split("/").pop();
   let categoryKey = null;
   let categoryHeader = "";
   let articlesByCategory = [];
   let categoryArray = [];
   let otherCategorys = [];
   let newestArticleInCategory = null;

   if(isLoaded(articles) && isLoaded(categorys)) {
     for (var key in categorys) {
       categoryArray.push(categorys[key]);
      if(categorys[key].url === categoryURL) {
       categoryKey = key;
       // console.log(key);
       // console.log(categoryHeader,"categoryHeader");
       categoryHeader = categorys[key].name;
      }
     }

     let article = {};
     for (var key in articles) {
      if(articles[key].category === categoryKey) {
        article = articles[key];
        article.key = key;
       articlesByCategory.push(article)
      }
     }
     // Senaste artikeln
     newestArticleInCategory = articlesByCategory.pop();
     // Alla andra kategorier
     otherCategorys = categoryArray.filter((category) => category.url !== categoryURL)
   }

   const categoryOutput =
    newestArticleInCategory === null ?
     <Loader type="Kategorier"/>
     : categoryKey === null ?
     <Redirect to={{pathname: '/404'}}/> // <-- 404 redirect
     :
     <div> {
            newestArticleInCategory !== null ?
            <ArticleFull
             key={Date.now()}
             article={newestArticleInCategory}
             category={categorys[newestArticleInCategory.category].name}
            /> : "Ingen artikel skapad"
           }
           <CommentBox articleKey={newestArticleInCategory.key} />

           <section>
            <h4>
             {
              articlesByCategory.length > 0 ?
              `Fler artiklar i kategori ${categoryHeader}` : null
             }
            </h4>
            <div className="Articles-teasers">
             {
              articlesByCategory.length > 0 ?
              articlesByCategory.map( (teaser, i) =>
              <ArticleTeaser key={i}
               teaser={teaser}
               categorys={categorys}
              />
             ) : null
             }
            </div>
           </section>

           <section>
           <h4>Andra kategorier</h4>
           <div className="Articles-category-teasers">
            {
             otherCategorys.length > 0 ?
             otherCategorys.map( (category, i) =>
             <CategoryTeaser
              key={i}
              category={category}
             />
            ) : "Inga kategorier skapade"
            }
          </div>
         </section>
        </div>
    return (
      <div className="Content-container">
        {categoryOutput}
      </div>
    )
  }
}
const ArticleCategory = firebase([
  '/articles',
  '/categorys'
])(ArticleCategoryContainer)
export default connect(
  ({firebase}) => ({
    articles: dataToJS(firebase, 'articles'),
    categorys: dataToJS(firebase, 'categorys')
  })
)(ArticleCategory)
