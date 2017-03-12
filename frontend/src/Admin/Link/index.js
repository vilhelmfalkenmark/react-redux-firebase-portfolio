import React from "react";

class Link extends React.Component {

 constructor() {
  super()
  this.state = {
   url: "http://",
   text: ""
  }
 }


 render() {
  const {url,text} = this.state;
  return(
   <section className="Link-container ">
    <div className="A-row">
     <div className="A-col--two">
      <label>URL</label>
      <input type="text" placeholder="URL" value={url} onChange={(e) => this.setState({url: e.target.value})}/>
      <span></span>
     </div>
     <div className="A-col--two">
      <label>Länktext</label>
      <input type="text" placeholder="Länktext" value={text} onChange={(e) => this.setState({text: e.target.value})}/>
      <span></span>
    </div>
   </div>

   {
    (url!=="" || text!=="") ?
    <div className="A-row">
     <div className="A-col--two">
      <label>Copy/paste</label>
      <a href={url} target="_blank">{text}</a>
     </div>
     <div className="A-col--two">
      <label>Rå html</label>
       <code>{`<a href=${url} target="_blank">${text}</a>`}</code> :
     </div>
    </div> : null
   }




   </section>
  )
 }
}
export default Link;
