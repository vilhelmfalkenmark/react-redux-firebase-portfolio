import React from 'react'
import Scroll from 'react-scroll';
import { connect } from 'react-redux'

class Footer extends React.Component {
 scrollTop() {
  Scroll.animateScroll.scrollTo(0, {
   duration: 300
  });
 }
  render () {
   const {landingPage} = this.props;
    return (
     <footer className={landingPage ? "Footer Footer--white" : "Footer Footer--color" }>
       <div className="Footer-inner">
        <div onClick={this.scrollTop} className="Footer-backtotop">
         <span><i className="flaticon-next"></i>Tillbaka till toppen</span>
        </div>
        <div className="Footer-columns">
        <div className="Footer-left">
         <div>
          <h3>Kontakt</h3>
          <ul>
           <li><a href="tel:0705580198" target="_blank"><i className="flaticon-technology"></i> 0705580198</a></li>
           <li><a href="mailto:info@vilhelmfalkenmark.se" target="_blank"><i className="flaticon-mail"></i> info@vilhelmfalkenmark.se</a></li>
           <li><a href="https://sv.wikipedia.org/wiki/Stockholm" target="_blank"><i className="flaticon-placeholder"></i> Stockholm</a></li>
          </ul>
          <div className="Footer-icons">
            <a href="https://www.facebook.com/ville.falkenmark" target="_blank"><figure className="Footer-icon Footer-icon--facebook"></figure></a>
            <a href="https://www.linkedin.com/hp/?dnr=imMPcqK9gJcQP8xvipIrB9S5l_wiHx3Mk5-f&trk=nav_responsive_tab_home" target="_blank"><figure className="Footer-icon Footer-icon--linkedin"></figure></a>
            <a href="https://open.spotify.com/user/vilhelmfalkenmark" target="_blank"><figure className="Footer-icon Footer-icon--spotify"></figure></a>
            <a href="https://www.instagram.com/villefalkenmark/" target="_blank"><figure className="Footer-icon Footer-icon--instagram"></figure></a>
            <a href="https://github.com/vilhelmfalkenmark" target="_blank"><figure className="Footer-icon Footer-icon--github"></figure></a>
          </div>
         </div>
        </div>
        <div className="Footer-right">
         <div className="Footer-face"></div>
         <p>
          Jag är född uppvuxen i Stockholm och har alltid varit
           väldigt intresserad av teknik och kreativa processer. För tillfället arbetar jag hos <a href="https://wunderkraut.se/" target="_blank">Wunderkraut</a> som
           webbutvecklare. När jag inte skriver kod spenderar jag min tid åt gejming, cykling,
           gitarrspelande, musik i allmänhet och min snälla flickvän.
           Carpe Diem. &#x1F60D;
         </p>
        </div>
       </div>
       <p className="Footer-copy">
        Den här sidan är byggd på React,
        Redux och Firebase av Vilhelm Falkenmark
        i december 2016 - mars 2017. <a href="https://github.com/vilhelmfalkenmark/react-redux-firebase-portfolio" target="_blank">Till projektet på Github.</a>&nbsp;
        Ikoner kommer från Flat-icon. Följande NPM-paket har använts i produktion: Particles.js, React-select, Draft.js, Draft-js-export-html. Så tack till dess uppehovsmän för deras
        fantastiska Open-source arbete.
       </p>
       </div>
     </footer>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    landingPage: state.dom.landingPage
  }
}
export default connect(mapStateToProps)(Footer);
