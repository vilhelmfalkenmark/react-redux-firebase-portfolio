import React from "react";
import Skill from "../../GlobalComponents/Skills"

const Portfolio = (props) => {
 const {title,content, image, link, objectSkills} = props.portfolio;
 return (
 <section className="Portfolio-row">
  <div className="Portfolio-col-left">
   <div className="Portfolio-computer">
    <img src={`${process.env.PUBLIC_URL}/uploads/${image}`} alt={`${title}`} />
   </div>
   {/* <div className="Portfolio-computer-bottom"></div> */}
  </div>
  <div className="Portfolio-col-right">
    <article className="Portfolio-info">
     <h3>{title}</h3>
     <p>{content}</p>
     <h4>Använda Tekniker</h4>
     <div className="Portfolio-skills">
     {
      objectSkills.map((skill,i) => <Skill skill={skill} key={i} className="Portfolio-skill" />)
     }
     </div>
     <div className="Portfolio-link">
      <a  href={link} target="_blank">
       <span>Till {title}</span>
       <i className="flaticon-next"></i>
      </a>
     </div>
    </article>
   </div>
 </section>

 )
}
export default Portfolio;
