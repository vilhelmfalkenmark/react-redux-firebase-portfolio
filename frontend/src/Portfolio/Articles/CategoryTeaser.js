import React from "react";
import { Link } from 'react-router';
const CategoryTeaser = (props) => {
 const {name, url, count} = props.category;
 return (
  count > 0 ?
  <Link to={`/artiklar/${url}`} className="Articles-category-teaser">
    <div>
     <span>{name}</span>
     <span>{count} inlägg</span>
    </div>
  </Link> : null
 )
}
export default CategoryTeaser;
