import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";


import Toolbar from "../toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../Backdrop/Backdrop";


import About from "../About/About";
import Home from "../Home/Home";
import Contact from "../Contact/Contact";


//routes
import * as routes from "../../constants/routes";

import SignInPage from "../User/SignIn/SignIn";

import withAuthentication from '../withAuthentication/withAuthentication';
import Admin from '../Admin/Admin';
import Print from '../Print/Print';


class App extends Component {
  constructor (){
    super();
    this.state = {
      sidedrawerOpen: false      
    };
    this.drawerToggleHandler = this.drawerToggleHandler.bind(this);
    this.BackDropClickHandler = this.BackDropClickHandler.bind(this);
  };

  drawerToggleHandler(e){
    this.setState((prevState) => {
      return { sidedrawerOpen: !prevState.sidedrawerOpen }
    });

  }

  BackDropClickHandler(e){
    this.setState({ sidedrawerOpen: false });
  }
  render() {
    let backdrop_show;
    if (this.state.sidedrawerOpen) {
      backdrop_show = <BackDrop click={this.BackDropClickHandler}  />;
    };

    return (
      <div className='container-fluid'>
      <Router>                   
          <div>
            <Toolbar drawerClickHandler={this.drawerToggleHandler} />  
            <SideDrawer show={this.state.sidedrawerOpen} />            
            {backdrop_show}

            <div>
              <Route exact path={routes.landing} component={Home}/>
              <Route exact path={routes.home} component={Home} />
              <Route exact path={routes.about} component={About} />
              <Route exact path={routes.contact} component={Contact} />
              <Route exact path={routes.admin} component={Admin} />
              <Route exact path={routes.signin} component={SignInPage} />
              <Route path={routes.print_route} component={Print} />

            </div>
          </div>            
      </Router>
      </div>
    );
  }
}

export default  withAuthentication(App);
