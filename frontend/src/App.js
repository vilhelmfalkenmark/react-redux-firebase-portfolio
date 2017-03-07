import React from "react";
import { BrowserRouter as Router,  Match } from 'react-router';
import Admin from "./Admin";
import Portfolio from "./Portfolio";

const App = () => {
 return (
  <Router>
   <div>
    <Match pattern="/" component={Portfolio}/>
    <Match pattern="/admin" component={Admin}/>
   </div>
  </Router>
 )
}
export default App;
