export default function images(state = {
  images: [],
  fetched: false
}, action) {
    //////////////////////////////////////////
    // INITIAL FETCH OF DATA
    //////////////////////////////////////////
    if (action.type === "IMAGES_FETCHED") {
      return {
        ...state,
        images: action.payload.images,
        fetched: true
      }
    } else if(action.type === "IMAGES_REJECTED") {
     return {
      ...state,
      fetched: false
     }
    }
    else if(action.type === "IMAGE_DELETED") {
     return {
      ...state,
      images: action.payload.images
     }
    }

    return state;
}
