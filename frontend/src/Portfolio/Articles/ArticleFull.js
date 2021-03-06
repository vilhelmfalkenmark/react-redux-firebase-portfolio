import React from 'react'
import CommentBox from "../Comment";

class ArticleFull extends React.Component {
render(){
    const {article, category}=this.props;
   document.title=`${article.title} | Vilhelm Falkenmark`;
    return (
     <article className="Article">
      <header>
       <h1>{article.title}</h1>
       <label>Kategori: {category}</label>
       <label >Skrivet: {article.date}</label>
      </header>
       {
       article.image ? <img src={article.image.downloadURL} alt={article.image.name} /> : null
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
