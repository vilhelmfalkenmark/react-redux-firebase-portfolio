import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers
import Portfolio from './Portfolio'
import ContentImages from '../Images/ContentImages'
import ContentSkills from '../Skills/ContentSkills'
class PortfolioContainer extends Component {
  constructor() {
   super()
   this.state = {
    image: null,
    selectedSkills: []
   }
  }
  selectImage(image) {
   this.setState({image})
  }
  selectedSkills(selectedSkills) {
   this.setState({selectedSkills})
  }

   render() {
    const { firebase, portfolios, skills} = this.props;
    const { image, selectedSkills } = this.state;

   var sortPortfolioArray = []
   var sortedPortolios = {};
   if(isLoaded(portfolios)) {
    for (var key in portfolios) {
     portfolios[key].key = key;
     sortPortfolioArray.push(portfolios[key])
    }
    // Sortera arry
    sortPortfolioArray.sort((a,b) => a.order - b.order )
    // Skapa nytt objekt utifrån array
    sortPortfolioArray.map((portfolio) => {
    sortedPortolios[portfolio.key] = portfolio;
   })
   }
    const addPortfolio = () => {
     const { portfolioTitle, portfolioContent, portfolioLink, portfolioOrder } = this.refs;
      firebase.push('/portfolios', {
        title: portfolioTitle.value,
        content: portfolioContent.value,
        link: portfolioLink.value,
        order: parseInt(portfolioOrder.value),
        image: image,
        skills: selectedSkills
       })
       portfolioTitle.value = "";
       portfolioContent.value  = "";
       portfolioLink.value  = "";
       portfolioOrder.value  = "";
    }

    var editPortfolioList = (!isLoaded(portfolios))
                        ? 'Laddar!'
                        : (isEmpty(portfolios))
                          ? 'Inga portfolio-prylar skapade'
                          : Object.keys(sortedPortolios).map((key) => (
                           <Portfolio key={key} id={key} skills={skills} portfolio={portfolios[key]} />
                          ))



   return (
    <div className="A-block">
     <section className="Portfolio-container">
     <h1>Portfoliogalleri</h1>

       <div className="A-input-row">
          <div className="A-input-row-icon">
            <i className="flaticon-header"></i>
          </div>
          <div className="A-input-row-input">
            <label>Titel portfolio</label>
            <input type='text' ref='portfolioTitle' />
            <span></span>
          </div>
       </div>

       <div className="A-input-row">
          <div className="A-input-row-icon">
            <i className="flaticon-folded-newspaper"></i>
          </div>
          <div className="A-input-row-input">
            <label>Innehåll</label>
            <textarea type='text' ref='portfolioContent'></textarea>
          </div>
       </div>

       <div className="A-input-row">
          <div className="A-input-row-icon">
            <i className="flaticon-unlink"></i>
          </div>
          <div className="A-input-row-input">
            <label>Länk</label>
            <input type='text' ref='portfolioLink' />
            <span></span>
          </div>
       </div>

       <div className="A-input-row">
        <div className="A-input-row-icon">
         <i className="flaticon-list"></i>
        </div>
        <div className="A-input-row-input">
        <label>Ordning</label>
        <input type='number' min="1" ref='portfolioOrder' />
        <span></span>
         </div>
       </div>

       <div className="A-input-row">
        <div className="A-input-row-icon">
         <i className="flaticon-landscape-photo"></i>
        </div>
        <div className="A-input-row-input">
        <label>Tillgängliga bilder</label>
        <ContentImages selectImage={this.selectImage.bind(this)}/>
         </div>
       </div>

       <div className="A-input-row">
        <div className="A-input-row-icon">
         <i className="flaticon-landscape-photo"></i>
        </div>
        <div className="A-input-row-input">
        <label>Tekniker</label>
        <ContentSkills selectedSkills = {this.selectedSkills.bind(this)}/>
         </div>
       </div>

       <div className="A-input-row">
          <div className="A-input-row-icon"></div>
        <div className="A-input-row-input">
          <button className="A-btn--add" onClick={addPortfolio}>Skapa portfolio</button>
        </div>
       </div>

      </section>
      <h2 className="A-block-header-2">Redigera portfolioinlägg</h2>
      <div className="A-cols">
       {editPortfolioList}
      </div>
    </div>
   )
   }
}
const Portfolios = firebase([
  '/portfolios',
  '/skills'
])(PortfolioContainer)
export default connect(
  ({firebase}) => ({
    portfolios: dataToJS(firebase, 'portfolios'),
    skills: dataToJS(firebase, 'skills')
  })
)(Portfolios)
