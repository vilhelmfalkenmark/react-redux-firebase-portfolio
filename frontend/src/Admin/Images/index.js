import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, helpers, firebase } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers
import Dropzone from 'react-dropzone'
import Image from "./Image";
const filesPath = 'images'

class ImagesContainer extends Component {

  constructor() {
   super()
   this.state = {
    loading: false
   }
  }

  static propTypes = {
    firebase: PropTypes.object.isRequired,
    images: PropTypes.object
  }

  onFilesDrop = (files) => {
    // Uploads files and push's objects containing metadata to database at dbPath
    // uploadFiles(storagePath, files, dbPath)
    this.props.firebase.uploadFiles(filesPath, files, filesPath)

  }

  deleteImage(file, key) {
   // Deletes file and removes metadata from database
   // deleteFile(storagePath, dbPath)
   this.props.firebase.deleteFile(file.fullPath, `${filesPath}/${key}`)
  }


  render () {
    const { images } = this.props;
    var imageList = (!isLoaded(images))
                              ? 'Laddar bilder'
                              : (isEmpty(images))
                                ? 'Inga bilder uppladdade'
                                : Object.keys(images).map((key) => (
                                 <Image key={key} id={key} image ={images[key]} deleteImage={this.deleteImage.bind(this)} />
                                ))



    return (
      <div className="A-block">
        <Dropzone onDrop={this.onFilesDrop} className="Images-dropzone">
          <h4> Släpp filer här eller klicka för att välja </h4>
        </Dropzone>
        <div className="A-cols">
         {
          imageList
          }
        </div>
      </div>
    )
  }
}

const Images = firebase([
  filesPath
])(ImagesContainer)

export default connect(
  ({firebase}) => ({
    images: dataToJS(firebase, "images")
  })
)(Images)
