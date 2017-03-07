import React from "react";
const Loader = (props) => {
 const {type} = props
 return (
  <section className="Loader-outer">
   <div className="Loader-inner">
    <h3>Laddar {type}</h3>
     <figure className="Loader-folding-cube">
       <div className="Loader-cube1 Loader-cube"></div>
       <div className="Loader-cube2 Loader-cube"></div>
       <div className="Loader-cube4 Loader-cube"></div>
       <div className="Loader-cube3 Loader-cube"></div>
    </figure>
   </div>
  </section>
 )
}
export default Loader;
