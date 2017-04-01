import React from 'react'
import { Match,Miss } from 'react-router';
import Skills from "./Skills";
import Portfolios from "./Portfolio";
import Experiences from "./Experience";
import Articles from "./Articles";
import ArticleSingle from './Articles/ArticleSingle'
import ArticleCategory from './Articles/ArticleCategory'
import NotFound from './404/NotFound'
import Landing from "./Landing";
import Footer from "./Footer";
import { connect } from 'react-redux';
import Burger from "../GlobalComponents/Burger";
import Menu from "./Menu";

class Portfolio extends React.Component {
render () {
const {adminActive, burger, isFixed} = this.props;
return (
      <div className={(burger && !isFixed ) ? "Portfolio-container menu-open" : isFixed ? "Portfolio-container is-fixed" : "Portfolio-container" }>
       {!adminActive ? <Burger page="portfolio"/> : null }
       {!adminActive ? <Menu />  : null  /* <-- Så att man inte ser menyn i adminvy */ }
         <main className="Main-container">
          <Match exactly pattern={`/`} component={Landing}/>
          <Match pattern={`/fardigheter`} component={Skills}/>
          <Match pattern={`/portfolio`} component={Portfolios}/>
          <Match pattern={`/erfarenheter`} component={Experiences}/>
          <Match exactly pattern={`/artiklar`} component={Articles}/>
          <Match pattern={`/artiklar/:category/:title`} component={ArticleSingle}/>
          <Match exactly pattern={`/artiklar/:category`} component={ArticleCategory}/>
          {
           !adminActive ? <Miss component={NotFound}/> : null
          }
         </main>
         {
          !adminActive ? // <-- Så att man inte ser menyn i adminvy
          <Footer />
          : null
         }
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    adminActive: state.adminActive.adminActive,
    burger: state.burger.portfolioBurger,
    isFixed: state.dom.siteFixed
  }
}
export default connect(mapStateToProps)(Portfolio);
