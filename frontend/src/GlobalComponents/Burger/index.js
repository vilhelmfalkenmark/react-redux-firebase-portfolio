import React from 'react'
import { connect } from 'react-redux'
import { adminBurger,portfolioBurger } from "../../Actions/Burger";
class Burger extends React.Component {
 constructor() {
  super()
  this.state = {
   open: false
  }
 }
  toggleBurger(state,page) {
   this.setState({
    open: !state
   })
  page === "admin" ?
  this.props.dispatch(adminBurger(state)) :
  this.props.dispatch(portfolioBurger(state))
  }
  render() {
    const { page } = this.props;
    const { open } = this.state;
    return (
      <div className={ open ? "Burger-container is-open" : "Burger-container"} onClick={() => this.toggleBurger(open,page)}>
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
