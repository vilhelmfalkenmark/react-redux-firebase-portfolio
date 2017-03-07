import React from "react";
const Comment = (props) => {
 const {comment} = props;
 return (
  <div className="Comment-list-comment">
   <h4>Av: {comment.name}</h4>
   <span>Skrivet: {comment.datestring}</span>
   <p>{comment.comment}</p>
  </div>
 )
}
export default Comment;
