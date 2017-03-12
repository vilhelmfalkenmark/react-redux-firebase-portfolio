import React from 'react'
import { Match , Link, Miss } from 'react-router';
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
// import {throttle, debounce} from "lodash";

class Portfolio extends React.Component {
constructor() {
 super()
 this.state = {pageTop: true}
}
componentDidMount() {
  // var previousTop = window.pageYOffset;
  //    document.addEventListener('scroll',
  //    throttle( () => {
  //     if(window.pageYOffset > 0) { // <-- Man är inte högst upp på sidan
  //     var currentOffTop = window.pageYOffset;
  //     if(currentOffTop > previousTop && window.pageYOffset > 130) {
  //      this.setState({ pageTop: false})
  //     } else {
  //      this.setState({ pageTop: true})
  //     }
  //     previousTop = currentOffTop;
  //   } else {
  //    this.setState({ pageTop: true})
  //   }}, 250)
  //  );
 }

// componentWillUnmount() {document.removeEventListener('scroll', throttle());}
render () {

const {adminActive, burger,isFixed} = this.props
const {pageTop} = this.state
return (
      <div className={(burger && !isFixed ) ? "Portfolio-container menu-open" : isFixed ? "Portfolio-container is-fixed" : "Portfolio-container" }>
       {!adminActive.adminActive ? <Burger page="portfolio"/> : null }
        {
         !adminActive.adminActive ? // <-- Så att man inte ser menyn i adminvy
         <header className={pageTop ? "Header" : "Header is-hidden"} >
           <menu className="Menu">
             <ul className="Menu-list">
               <li><Link to={`/`} activeOnlyWhenExact activeClassName="is-active">Hem</Link></li>
               <li><Link to={`/artiklar`} activeClassName="is-active">Artiklar</Link></li>
               <li><Link to={`/fardigheter`} activeClassName="is-active">Färdigheter</Link></li>
               <li><Link to={`/portfolio`} activeClassName="is-active">Portfolio</Link></li>
               <li><Link to={`/erfarenheter`}activeClassName="is-active" >Erfarenheter</Link></li>
             </ul>
             <Link to={`/`} className="Header-logo">VF</Link>

            </menu>
         </header> : null
        }
         <main className="Main-container">
          <Match exactly pattern={`/`} component={Landing}/>
          <Match pattern={`/fardigheter`} component={Skills}/>
          <Match pattern={`/portfolio`} component={Portfolios}/>
          <Match pattern={`/erfarenheter`} component={Experiences}/>
          <Match exactly pattern={`/artiklar`} component={Articles}/>
          <Match pattern={`/artiklar/:category/:title`} component={ArticleSingle}/>
          <Match exactly pattern={`/artiklar/:category`} component={ArticleCategory}/>
          {
           !adminActive.adminActive ? <Miss component={NotFound}/> : null
          }
         </main>
         {
          !adminActive.adminActive ? // <-- Så att man inte ser menyn i adminvy
          <Footer />
          : null
         }
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    adminActive: state.adminActive,
    burger: state.burger.portfolioBurger,
    isFixed: state.dom.siteFixed
  }
}
export default connect(mapStateToProps)(Portfolio);
