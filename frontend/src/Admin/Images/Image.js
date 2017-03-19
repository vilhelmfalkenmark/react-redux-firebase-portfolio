import React from 'react';
export default class Image extends React.Component {
    render() {
        const {image,deleteImage, id} = this.props;
        return (
            <div className="A-col">
              <div className="A-col-content">
                <h4>Filnamn: {image.name}</h4>
              <img src={image.downloadURL} alt={image.name} />
              </div>
              <div className="A-col-actions">
                <button className="A-col-btn--delete" onClick={()=> deleteImage(image, id)}>Radera bild</button>
              </div>
            </div>
        )
    }
}
