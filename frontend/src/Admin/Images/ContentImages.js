///////////////////////////////////////////////
// Den här kompontenten ska läggas överallt där
// man ska kunna välja en bild till inenhåll
// exempelvis portfolio och artiklar
///////////////////////////////////////////////
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, helpers, firebase } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers

class ContentImagesContainer extends React.Component {
constructor() {
 super()
 this.state={
  highlighted: null
 }
}

selectImage(imageObject,highlighted) {
 this.props.selectImage(imageObject)
 this.setState({highlighted})
}
render() {
const {images} = this.props;
const {highlighted} = this.state;

return(
 <div className="A-image-cols">
    {
     (!isLoaded(images))
            ? 'Laddar bilder'
            : (isEmpty(images))
              ? 'Inga bilder uppladdade'
              : Object.keys(images).map((key,i) => (
               <div key={i} onClick={() => this.selectImage(images[key],i)}
                className={ i === highlighted ? "A-image-col A-image-col--highlighted" : "A-image-col "}>
                 <img src={images[key].downloadURL} />
               </div>
              ))
    }
 </div>
)
}
}
const ContentImages = firebase([
  'images'
])(ContentImagesContainer)

export default connect(
  ({firebase}) => ({
    images: dataToJS(firebase, "images")
  })
)(ContentImages)
