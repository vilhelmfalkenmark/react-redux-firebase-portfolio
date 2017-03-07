import React from 'react'
import { firebase, helpers } from 'react-redux-firebase'
import CommentBox from "../Comment";

class ArticleFull extends React.Component {
render(){
    const {article,category}=this.props;
    document.title=`${article.title} | Vilhelm Falkenmark`;
    return (
     <article>
       <h1>{article.title}</h1>
       <h4>Kategori: {category}</h4>
       {
        article.image ? <img src={process.env.PUBLIC_URL+"/uploads/"+article.image} alt={process.env.PUBLIC_URL+article.image} /> : null
       }

       <div dangerouslySetInnerHTML={{
        __html: article.rawHTML
         }}>
       </div>
     </article>
    )
  }
}
export default ArticleFull;
// export default firebase()(ArticleFull)
//<CommentBox articleKey={theArticle[0].key} />