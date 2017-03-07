import React from "react";

const Warning = (props) => {
 return (
  <div className="Warning-container">
   <p>Är du helt säker på att du vill radera {props.type} <span className="u-Italic">{props.title}</span></p>
  </div>
 )
}
export default Warning;
