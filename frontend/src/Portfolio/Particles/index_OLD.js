import React from "react";


class Particles extends React.Component {

constructor() {
 super()
  this.state = {
   windowWidth: window.innerWidth,
   windowHeight: window.innerHeight,
   timer: null // id för timern
  }
}
updateDimensions() {
 this.setState({
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight
 })
}

componentDidMount() {

var test =  Math.floor(Math.random() * (1 - 0)) + 0;
console.log(test);
 window.addEventListener("resize", this.updateDimensions.bind(this));

const {windowWidth,windowHeight} = this.state;
const ctx = this.refs.canvas.getContext('2d');
const white = "rgba(255, 255, 255, 0.5)";
const transWhite = "rgba(255, 255, 255, 0.3)";
const blocks = [];
//////////////////////////////////////////
// Skapa block
//////////////////////////////////////////
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getRandomFloat = (min, max) => {
 return Math.round(Math.random() * (max - min + 1)) + min;
}

function particleBlock(rectX,rectY) {
 this.rectX = rectX;
 this.rectY = rectY;
 this.width = getRandomInt(rectX, windowWidth - rectX);
 this.height = getRandomInt(rectY, windowHeight - rectY);
 this.particles = [];
 for (var j = 0; j < 5; j++) {
  this.particles.push({
   posX: getRandomInt(this.rectX,this.width),
   posY: getRandomInt(this.rectY,this.height),
   speedX: getRandomFloat(-1,1),
   speedY: getRandomFloat(-1,1),
   radius: getRandomFloat(0,2),
   sibling: getRandomInt(0,4)
  })
 }

}

for (var k = 0; k < 10; k++) {

blocks.push(
 new particleBlock(
  getRandomInt(0,windowWidth/2),
  getRandomInt(0,windowHeight/2)
 )
)
}
// console.log(blocks);
function updateCanvas() {
ctx.clearRect(0, 0, windowWidth, windowHeight);

const updateBlock = (block) => {
ctx.rect(block.posX ,block.posY, block.width, block.height);
 block.particles.map((particle, i, self) => {
  updateParticle(
   particle,
   block.rectX,
   block.rectY,
   block.rectX+block.width,
   block.rectY+block.height,
   block.particles,
   i,
   self
  );
 })
}
for (var block in blocks) {
 updateBlock(blocks[block])
}
function updateParticle(particle, minX, minY, maxX, maxY, particles, i, self) {
    particle.posX += particle.speedX;
    particle.posY += particle.speedY;
    // LINJER
    if(i === self.length - 1) {
     // Linje 1
     ctx.beginPath();
     ctx.moveTo(particles[0].posX,particles[0].posY);
     ctx.lineTo(particle.posX,particle.posY);
     ctx.strokeStyle = transWhite;
     ctx.stroke();
     ctx.closePath()
     // Linje 2
     ctx.beginPath();
     ctx.moveTo(particles[particles[i].sibling].posX,particles[particles[i].sibling].posY);
     ctx.lineTo(particle.posX,particle.posY);
     ctx.strokeStyle = transWhite;
     ctx.stroke();
     ctx.closePath()
    } else {
     ctx.beginPath();
     ctx.moveTo(particles[i+1].posX,particles[i+1].posY);
     ctx.lineTo(particle.posX,particle.posY);
     ctx.strokeStyle = transWhite;
     ctx.stroke();
     ctx.closePath()
     // Linje 2
     ctx.beginPath();
     ctx.moveTo(particles[particles[i].sibling].posX,particles[particles[i].sibling].posY);
     ctx.lineTo(particle.posX,particle.posY);
     ctx.strokeStyle = transWhite;
     ctx.stroke();
     ctx.closePath()
    }
    // CIRKLAR
    ctx.beginPath();
    ctx.arc(particle.posX , particle.posY, particle.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = white;
    ctx.fill();
    // STUDS
   if( particle.posX < minX - particle.radius || particle.posX > maxX) {
       particle.speedX = - particle.speedX;
   }
   if(particle.posY < minY || particle.posY > maxY) {
       particle.speedY = -particle.speedY;
   }
}
}
const timer = setInterval(() => {
updateCanvas();

}, 30);

this.setState({timer})

}



componentWillUnmount() {
 clearInterval(this.state.timer)
}

    render() {
         const {windowWidth,windowHeight} = this.state;
         return (
          <canvas className="Particles" ref="canvas" width={windowWidth} height={windowHeight}/>
         );
    }
}
export default Particles;
