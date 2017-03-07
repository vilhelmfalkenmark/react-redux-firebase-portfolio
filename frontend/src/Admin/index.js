import React from 'react'
import { Match , Link, Miss } from 'react-router';
import Skills from "./Skills";
import { connect } from 'react-redux'
import Articles from "./Articles";
import Comments from "./Comments";
import Images from "./Images";
import Burger from "../GlobalComponents/Burger";
import Categorys from "./Categorys";
import Portfolios from "./Portfolio";
import Experiences from "./Experiences";
import EditArticle from "./Articles/EditArticle";
import Login from "./Login";
import { checkLoggedIn, logOut } from "../Actions/Login";
import {adminActive} from "../Actions/Admin";
class Admin extends React.Component {
componentDidMount() {
  this.props.dispatch(checkLoggedIn());
  this.props.dispatch(adminActive(true)); // När vi mountar så vill vi inte se menyn från standardsidan
}
componentWillUnmount() {
  this.props.dispatch(adminActive(false));
}

/////////////////////////////////////////////
// LOGGA UT
/////////////////////////////////////////////
logOut(e) {
  e.preventDefault();
 this.props.dispatch(logOut())
}
    render() {
    const {pathname, logIn, dispatch, burger} = this.props
    // console.log(burger);
    return (
      logIn.loggedIn ?
      // true ?
       <div className="A-Container">
            <div className={burger ? "A-Menu-container menu-open" : "A-Menu-container"}>
             <menu className="A-Menu">
               <ul className="A-Menu-list">
                 <li><Link to={`/`}> <i className="flaticon-home"></i>Till Hemsidan</Link></li>
                 <li><Link to={`${pathname}/articles`} activeClassName="is-active"><i className="flaticon-folded-newspaper"></i>Artiklar</Link></li>
                 <li><Link to={`${pathname}/comments`} activeClassName="is-active"><i className="flaticon-folded-newspaper"></i>Kommentarer</Link></li>
                 <li><Link to={`${pathname}/categorys`} activeClassName="is-active"><i className="flaticon-share"></i>Kategorier</Link></li>
                 <li><Link to={`${pathname}/skills`} activeClassName="is-active"><i className="flaticon-plumber"></i>Färdigheter</Link></li>
                 <li><Link to={`${pathname}/images`} activeClassName="is-active"><i className="flaticon-landscape-photo"></i>Bilder</Link></li>
                 <li><Link to={`${pathname}/portfolio`} activeClassName="is-active"><i className="flaticon-briefcase"></i>Portfolio</Link></li>
                 <li><Link to={`${pathname}/experiences`} activeClassName="is-active"><i className="flaticon-list"></i>Erfarenheter</Link></li>
                 <li className="A-Menu-logout-btn"><a href="#" onClick={(e) => this.logOut(e)}><i className="flaticon-exit"></i>Logga ut</a></li>
                 {/* <li onClick={this.registerUser.bind(this)}>Skapa användare</li> */}
               </ul>
              </menu>
            </div>
            <Burger page="admin" />
            <div className={burger ? "A-Content-container menu-open" : "A-Content-container"}>
            <div className="A-Content-container-inner">
              <Match exactly pattern={`${pathname}`} component={Articles}/>
              <Match exactly pattern={`${pathname}/comments`} component={Comments}/>
              <Match exactly pattern={`${pathname}/skills`} component={Skills}/>
              <Match exactly pattern={`${pathname}/images`} component={Images}/>
              <Match exactly pattern={`${pathname}/articles`} component={Articles}/>
              <Match exactly pattern={`${pathname}/categorys`} component={Categorys}/>
              <Match exactly pattern={`${pathname}/portfolio`} component={Portfolios}/>
              <Match exactly pattern={`${pathname}/experiences`} component={Experiences}/>
              <Match exactly pattern={`${pathname}/articles/*`} component={EditArticle}/>
             </div>
            </div>
       </div> : <Login />
    );
    }
};

// export default Admin;
const mapStateToProps = (state) => {
  return {
    logIn: state.logIn,
    burger: state.burger.adminBurger,
    adminActive: state.adminActive.adminActive
  }
}
export default connect(mapStateToProps)(Admin);
