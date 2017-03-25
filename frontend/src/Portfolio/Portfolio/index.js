import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers

import Portfolio from "./Portfolio";
import Loader from "../../GlobalComponents/Loader";

class PortfolioContainer extends Component {
   render() {
   const { firebase, portfolios, skills} = this.props;
   document.title=`Portfolio | Vilhelm Falkenmark`;
   var sortPortfolioArray = []
   var sortedPortolios = {};
   if(isLoaded(portfolios) && isLoaded(skills)) {
    for (var key in portfolios) {
     portfolios[key].key = key;
     sortPortfolioArray.push(portfolios[key])
    }
    // Sortera arry
    sortPortfolioArray.sort((a,b) => a.order - b.order )
    // Skapa nytt objekt utifrån array
    sortPortfolioArray.map((portfolio) => {
    sortedPortolios[portfolio.key] = portfolio;
    sortedPortolios[portfolio.key].objectSkills = [];
    // Lägg till skills som snygga objekt
    sortedPortolios[portfolio.key].skills.map((skillKey) => {
     sortedPortolios[portfolio.key].objectSkills.push(skills[skillKey])
    })
   })

   }
    var portfolioList = (!isLoaded(portfolios))
                        ? <Loader type="Portfolio"/>
                        : (isEmpty(portfolios))
                          ? 'Inga portfolio-prylar skapade'
                          : Object.keys(sortedPortolios).map((key) => (
                           <Portfolio key={key} id={key} portfolio={portfolios[key]} />
                          ))
   return (
    <div className="Content-container">
     <h1 className="u-Center">Portfolio</h1>
     <h3 className="u-Center">Ett urval av saker jag gjort</h3>
     {portfolioList}
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
