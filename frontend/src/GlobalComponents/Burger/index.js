import React from 'react'
import { connect } from 'react-redux'
import { adminBurger,portfolioBurger } from "../../Actions/Burger";
class Burger extends React.Component {
  toggleBurger(state,page) {
  page === "admin" ?
  this.props.dispatch(adminBurger(state)) :
  this.props.dispatch(portfolioBurger(state))
  }
  render() {
    const { page, burger } = this.props;
    const state = page === "portfolio" ? burger.portfolioBurger : page === "admin" ? burger.adminBurger : null
    return (
      <div className={ state ? "Burger-container is-open" : "Burger-container"} onClick={() => this.toggleBurger(state,page)}>
        <div className="Burger-inner">
          <div className="Burger"></div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    burger: state.burger
  }
}
export default connect(mapStateToProps)(Burger);
