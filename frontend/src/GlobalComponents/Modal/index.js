import React from "react";
const Modal = (props) => {
 const {name} = props
 return (
  <section className="Modal-outer" onClick={props.closeModal}>
   <div className="Modal-box">
     <i className="Modal-close flaticon-error"></i>
     <div>
       <h2>Tack för din kommentar {name}!</h2>
       <p>För ordningens skull måste den godkännas innan den pupliceras.</p>
     </div>
   </div>
  </section>
 )
}
export default Modal;
