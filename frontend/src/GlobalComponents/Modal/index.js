import React from "react";
const Modal = (props) => {
 const {header,message} = props
 return (
  <section className="Modal-outer" onClick={props.closeModal}>
   <div className="Modal-box">
     <i className="Modal-close flaticon-error"></i>
     <div>
       <h2>{header}</h2>
       <p>{message}</p>
     </div>
   </div>
  </section>
 )
}
export default Modal;
