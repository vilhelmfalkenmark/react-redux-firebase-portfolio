import React from "react";
import { Link } from 'react-router';
const ArticleTeaser = (props) => {
 const {teaser, categorys} = props;
 const style = teaser.image ? {
  backgroundImage: `url(${process.env.PUBLIC_URL}/uploads/${teaser.image})`
 } : {
  backgroundImage: `url(${process.env.PUBLIC_URL}/images/404.jpg`
 }

 return (
    <Link to={`/artiklar/${categorys[teaser.category].url}/${teaser.url}`} className="Articles-teaser">
        <div className="Article-teaser-header">
         <span>Läs mer</span>
        </div>
        <div className="Article-teaser-image" style={style}></div>
        <div className="Article-teaser-info">
         <h4>{teaser.title}</h4>
         <span>Skrivet {teaser.date}</span>
         <span>Kategori {categorys[teaser.category].name}</span>
        </div>
        <span className="Article-teaser-border"></span>
       </Link>
 )
}
export default ArticleTeaser;
