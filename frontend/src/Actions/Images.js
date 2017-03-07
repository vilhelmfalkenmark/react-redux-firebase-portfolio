import axios from "axios";
//////////////////////////////////////////
// Get images
//////////////////////////////////////////
export function getImages() {
  return function(dispatch) {
    axios.get("/api/images/fetch-all")
    .then((response) => {
      dispatch({type: "IMAGES_FETCHED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "IMAGES_REJECTED", payload: err})
    })
  }
}
export function uploadImage(file) {
 console.log(file);
  return function(dispatch) {
    axios({
     method: 'post',
     url: '/api/images/upload',
     data: file
   });
  }
}
//////////////////////////////////////////
// Delete images
//////////////////////////////////////////
export function deleteImage(image) {
 console.log(image);
  return function(dispatch) {
   axios.get("/api/images/delete-image", {
      params: {
        image: image
      }
    }
    )
    .then((response) => {
      dispatch({type: "IMAGE_DELETED",  response: response.data })
    })
    .catch((err) => {
      dispatch({type: "IMAGE_NOT_DELETED", payload: err})
    })

  }
}
