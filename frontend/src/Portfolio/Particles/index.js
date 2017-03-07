import React from "react";
import Particles from 'react-particles-js';
export default class ParticleContainer extends React.Component {
render(){
     const ParticlesjsConfig = {
         particles: {
             number: {
                 value: 50,
                 density: {
                     enable: true,
                     value_area: 800
                 }
             },
             color: {
                 value: "#fff"
             },
             shape: {
                 type: "circle",
                 stroke: {
                     width: 0,
                     color: "#000000"
                 },
                 polygon: {
                     nb_sides: 5
                 },
                 image: {
                     src: "",
                     width: 100,
                     height: 100
                 }
             },
             opacity: {
                 value: .5,
                 random: !1,
                 anim: {
                     enable: !0,
                     speed: 1,
                     opacity_min: .1,
                     sync: !1
                 }
             },
             size: {
                 value: 1,
                 random: !1,
                 anim: {
                     enable: !1,
                     speed: 40,
                     size_min: 0,
                     sync: !1
                 }
             },
             line_linked: {
                 enable: !0,
                 distance: 150,
                 color: "#FFF",
                 opacity: .6,
                 width: 1,
                 shadow: {
                     enable: !1,
                     blur: 5,
                     color: "lime"
                 }
             },
             move: {
                 enable: !0,
                 speed: 3,
                 direction: "none",
                 random: !1,
                 straight: !1,
                 out_mode: "bounce",
                 bounce: !0,
                 attract: {
                     enable: !1,
                     rotateX: 3e3,
                     rotateY: 3e3
                 }
             },
             array: []
         },
         interactivity: {
             detect_on: "canvas",
             events: {
                 onhover: {
                     enable: false,
                     mode: "grab"
                 },
                 onclick: {
                     enable: true,
                     mode: "push"
                 },
                 resize: true
             },
             modes: {
                 grab: {
                     distance:400,
                     line_linked: {
                         opacity: 1
                     }
                 },
                 bubble: {
                     distance: 200,
                     size: 40,
                     duration: 2
                 },
                 repulse: {
                     distance: 200,
                     duration: 0.5
                 },
                 push: {
                     particles_nb: 4
                 },
                 remove: {
                     particles_nb: 2
                 }
             },
             mouse: {}
         },
         retina_detect: true
     };
     const style = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
     }
        return (
         <section className="Particles">
          <Particles
           params={ParticlesjsConfig}
           style={style}  />
         </section>
        );
    };

}
