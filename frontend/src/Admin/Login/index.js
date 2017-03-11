import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  logIn } from "../../Actions/Login";

class Login extends Component {
 constructor() {
  super()
  this.state = {
   email: "",
   password: ""
  }
 }
 /////////////////////////////////////////////
 // LOGGA IN
 /////////////////////////////////////////////
 logIn(e) {
  e.preventDefault();
  this.props.dispatch(logIn(this.state))
 }
  render () {
   const {email,password} = this.state;
    return (
     <div className="A-Login-container">
      <div className="A-Login-inner">
      <h1>Du måste logga in för att hantera innehållet</h1>
      <form className="A-Login-form" action="/" onSubmit={(e)=>this.logIn(e)}>
       <label>Användarnamn/E-postadress</label>
       <input type="email" value={email} onChange={(e) => this.setState({email: e.target.value}) } required/>
       <span></span>
       <label>Lösenord</label>
       <input type="password" value={password} onChange={(e) => this.setState({password: e.target.value})} required/>
       <span></span>
       <button type="submit">Logga in</button>
      </form>
      </div>
     </div>
    )
  }
}
// export default Login;
const mapStateToProps = (state) => {
  return {
    logIn: state.logIn
  }
}
export default connect(mapStateToProps)(Login);
