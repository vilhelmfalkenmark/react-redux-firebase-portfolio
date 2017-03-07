import React from 'react';
export default class Image extends React.Component {

deleteImage(image) {
  this.props.deleteImage(image)
 }

render() {

const {image} = this.props;

return(
 <div className="A-col">
 <div className="A-col-content">
   <h4>Filnamn: {image}</h4>
   <img src={process.env.PUBLIC_URL+"../uploads/"+image} />
  </div>
  <div className="A-col-actions">
   <button className="A-col-btn--delete" onClick={ () => this.deleteImage(image) }>Radera bild</button>
  </div>
 </div>
)


}



}
