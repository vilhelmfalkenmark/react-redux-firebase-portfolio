import React from 'react';
import { connect } from 'react-redux'
import { getImages, uploadImage, deleteImage } from "../../Actions/Images";
import Image from "./Image";


class ImagesContainer extends React.Component {

 constructor() {
  super()
  this.state = {
  file: "",
  imagePreviewUrl: "",
  imagePreview: null
 };
 }

 _handleSubmit(e) {
  this.setState({
   imagePreview: null
  })
}

_handleImageChange(e) {
  e.preventDefault();
  let reader = new FileReader();
  let file = e.target.files[0];
  reader.onloadend = () => {
    this.setState({
      file: file,
      imagePreviewUrl: reader.result,
      imagePreview: <img src={reader.result} />
    });
  }
  reader.readAsDataURL(file)
}

//////////////////////////////////////////
// RADERA BILD
//////////////////////////////////////////
deleteImage(image) {
 this.props.dispatch(deleteImage(image));
}
//////////////////////////////////////////
// componentDidMount
//////////////////////////////////////////
 componentDidMount() {
 this.props.dispatch(getImages());
 }
 //////////////////////////////////////////
 // Hämta bilder om de inte redan skett
 //////////////////////////////////////////
 getImages() {
  this.props.dispatch(getImages());
 }

  render () {
    const {images,fetched} = this.props
    let {imagePreviewUrl, imagePreview} = this.state;
    return (
      <div className="A-block">
      <h1>Ladda upp bilder</h1>
      <form className="Images-form" action="/" method="POST" encType="multipart/form-data" onSubmit={(e)=>this._handleSubmit(e)} >
        <div className="Images-file-btn"> Välj fil
         <input type="file" name="image" onChange={(e)=>this._handleImageChange(e)}/>
        </div>
        <input type="submit" value="Ladda upp bild" />
        </form>
        <div className="Images-img-preview">
            {imagePreview}
        </div>
        <button className="Images-fetch-btn" onClick={this.getImages.bind(this)}>Hämta alla bilder</button>
        <div className="A-cols">
        {
          images.fetched ? images.images.map( (image, i) => <Image
          deleteImage = {this.deleteImage.bind(this)}
          key ={i}
          image={image}/> ) : null
        }
       </div>
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images
  }
}
export default connect(mapStateToProps)(ImagesContainer);
