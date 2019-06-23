import React from "react";
import "../SideDrawer/ToggleButton";
import { Link } from "react-router-dom";
import './Toolbar.css';
import ToggleButton from "../SideDrawer/ToggleButton";
import MenuItems from "../MenuItems/MenuItems";

const Toolbar = props => (

    <header className="toolbar">
        <nav className="toolbar_nav">

            <div className="toolbar_toggle"> 
                <ToggleButton click={props.drawerClickHandler} />
            </div>

            <div className="toolbar_logo spacer"> <img src='/static/images/logo.jpg' width='25' height='25' /></div>
            <div className="toolbar_logo"> <Link to='/'> <strong> Get Ready Investments</strong></Link></div>
            
            <div className="spacer"></div>
            <div className="toolbar_nav_items">
                <MenuItems props={props} />
            </div>
        </nav>
    </header>
);


export default Toolbar;