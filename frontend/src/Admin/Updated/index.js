import React from "react";
const Updated = (props) => {
 return (
  <div className="Updated-container" onClick={props.close}>
   {/* <span className="flaticon-error"></span> */}
   <p>{props.type} <span className="u-Italic">{props.title}</span> är uppdaterad!</p>
  </div>
 )
}
export default Updated;
