import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router';
import {throttle, debounce} from "lodash";
import {portfolioBurger} from "../../Actions/Burger";
import {connect} from 'react-redux';

class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            pageTop: true,
            previousTop: window.pageYOffset,
            scrollReference: null
        }
         this.scrollyMacScrollFace = this.scrollyMacScrollFace.bind(this)
    }

    componentDidMount() {

      document.addEventListener('scroll', this.scrollyMacScrollFace, true)
      // ReactDOM.findDOMNode(this).addEventListener('scroll', throttle( () => { this.scrollyMacScrollFace.bind(this)() }, 250), false)
        // document.addEventListener('scroll', throttle( () => { this.scrollyMacScrollFace() }, 250));
    }

    componentWillUnmount() {
     document.removeEventListener('scroll',this.scrollyMacScrollFace,true)
     // document.removeEventListener('scroll', throttle( () => { this.scrollyMacScrollFace.bind(this)() }, 250),false)
     // ReactDOM.findDOMNode(this).removeEventListener('scroll', throttle( () => { this.scrollyMacScrollFace.bind(this)() }, 250),false)
     console.log(this.state.scrollReference,"scrollReference");

    }



    scrollyMacScrollFace() {
     // throttle( () => {
      const { previousTop } = this.state;

     console.log("scrollyMacScrollFace kallas!");
      if (window.pageYOffset > 0) { // <-- Man är inte högst upp på sidan
          var currentOffTop = window.pageYOffset;
          if (currentOffTop > previousTop && window.pageYOffset > 130) {
              this.setState({pageTop: false})
          } else {
              this.setState({pageTop: true})
          }
          this.setState({ previousTop: currentOffTop })
      } else {
          this.setState({pageTop: true})
      // }}, 300)
     }
    }




    closeMenu() {
        if (this.props.burger) {
            this.props.dispatch(portfolioBurger(true))
        }
    }

    render() {
        const {pageTop} = this.state;

        return (
            <header className={pageTop ? "Header" : "Header is-hidden"}>
                <menu className="Menu">
                    <ul className="Menu-list" onClick={this.closeMenu.bind(this)}>
                        <li>
                            <Link to={`/`} activeOnlyWhenExact activeClassName="is-active">Hem</Link>
                        </li>
                        <li>
                            <Link to={`/artiklar`} activeClassName="is-active">Artiklar</Link>
                        </li>
                        <li>
                            <Link to={`/fardigheter`} activeClassName="is-active">Färdigheter</Link>
                        </li>
                        <li>
                            <Link to={`/portfolio`} activeClassName="is-active">Portfolio</Link>
                        </li>
                        <li>
                            <Link activeClassName="is-active" to={`/erfarenheter`}>Erfarenheter</Link>
                        </li>
                    </ul>
                    <Link to={`/`} className="Header-logo" onClick={this.closeMenu.bind(this)}></Link>
                </menu>
            </header>
        )
    }

}

export default connect(state => ({burger: state.burger.portfolioBurger}))(Menu);
