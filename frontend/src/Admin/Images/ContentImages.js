///////////////////////////////////////////////
// Den här kompontenten ska läggas överallt där
// man ska kunna välja en bild till inenhåll
// exempelvis portfolio och artiklar
///////////////////////////////////////////////
import React from 'react';
import { connect } from 'react-redux'
import { getImages } from "../../Actions/Images";
class ContentImages extends React.Component {
constructor() {
 super()
 this.state={
  highlighted: null
 }
}
 componentDidMount() {
  this.props.dispatch(getImages());
 }

selectImage(image,highlighted) {
 this.props.selectImage(image)
 this.setState({highlighted})
}

render() {
const {images} = this.props;
const {highlighted} = this.state;
return(
 <div className="A-image-cols">
    {
     images.images.map( (image, i) =>
     <div
     className={ i === highlighted ? "A-image-col A-image-col--highlighted" : "A-image-col "}
     key={i}
     onClick={() => this.selectImage(image,i)}>
       <img src={process.env.PUBLIC_URL+"/uploads/"+image} alt={image}/>
     </div> )
    }
 </div>
)
}
}
const mapStateToProps = (state) => {
  return {
    images: state.images
  }
}
export default connect(mapStateToProps)(ContentImages);
