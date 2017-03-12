import React from "react";
class Experience extends React.Component {

constructor() {
 super()
 this.state = {
  offsetTop: 0,
  slideIn: true
 }
}
componentDidMount() {
  // this.setState({
  //  offsetTop: ReactDOM.findDOMNode(this).offsetTop
  // })
}
componentWillReceiveProps(props) {
 // const {offsetTop,slideIn} = this.state;
 // const {pageYOffset} = props;
 //  if(slideIn === false) {
 //   if((pageYOffset + 350 > offsetTop) &&  (this.props.pageYOffset !== 0)) {
 //    this.setState({slideIn: true })
 //   }
 //  }
}
render() {
 const {content,link,start,end,position,title} = this.props.experience;
 const {slideIn} = this.state;

 return (
 <section className="Experience-row">
  <div className={ slideIn ?
    "Experience-card slide-in":"Experience-card"}>
    <div className="Experience-title">
     <h2 className="Experience-ribbon">
      <span><span>{title}</span></span>
     </h2>
    </div>
    <h3>{position}</h3>
    <p className="Experience-period">{start} - {end}</p>
   <p>{content}</p>
   <div className="Experience-link">
    <a href={`http://${link}`} target="_blank">{link}</a>
   </div>

  </div>
  <div className="Expierience-line">
   <div className="Experience-circle">
    <div>
     <span>{start}</span>
     <span>-</span>
     <span>{end}</span>
     </div>
   </div>
  </div>

 </section>

 )
 }
}
export default Experience;
