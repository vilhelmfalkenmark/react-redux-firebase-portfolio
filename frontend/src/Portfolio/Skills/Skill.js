import React from "react";
const Skill = (props) => {
 const {text, value, backgroundColor} = props.skill
 return (
  <li className="Skill">
   <h4 className="u-Center">{text}</h4>
   <p>Nivå: {value} / 10</p>
    <figure className="Skill-pie">
      <svg viewBox="0 0 32 32">
        <circle
         className="Skill-circle"
         r="16" cx="16" cy="16"
         style={
          {
           strokeDasharray: `${value*10} 100`,
           stroke: backgroundColor
          }}
         />
         <circle
          className="Skill-inner-circle"
          r="14" cx="16" cy="16"
         />
      </svg>
     </figure>
  </li>
 )
}
export default Skill;
