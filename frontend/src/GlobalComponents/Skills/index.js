import React from "react";
const Skill = (props) => {
 const {backgroundColor,color,text} = props.skill;
 return (
 <div className={props.className} style={{backgroundColor: backgroundColor, color: color}}>
   {text}
 </div>
 )
}
export default Skill;
