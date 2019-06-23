
import React from "react";
import {Link} from "react-router-dom";
import "./MenuItems.css";
import * as routes from '../../constants/routes';
import AuthUserContext from '../withAuthentication/AuthUserContext';
const AuthItems = (props) => {
    return (
    <div>
        <ul>
            <li><Link to={routes.landing}><strong> <i className="fa fa-home"> </i> Home </strong></Link></li>
            <li><Link to={routes.about}><strong> <i className="fa fa-info"> </i> About</strong></Link></li>
            <li><Link to={routes.contact}><strong> <i className="fa fa-envelope"> </i> Contact</strong></Link></li>
            <li><Link to={routes.admin}> <strong> <i className="fa fa-dashboard"> </i> Dashboard</strong></Link></li>
        </ul>
    </div>
    )
};

const NonAuthItems = () => {
    return (
        <div>
            <ul>
                <li><Link to={routes.landing}><strong> <i className="fa fa-home"> </i> Home </strong></Link></li>
                <li><Link to={routes.about}><strong> <i className="fa fa-info"> </i> About</strong></Link></li>
                <li><Link to={routes.contact}><strong> <i className="fa fa-envelope"> </i> Contact</strong></Link></li>
                <li><Link to={routes.signin}><strong> <i className="fa fa-sign-in"> </i> Login</strong></Link></li>
            </ul>

        </div>
    )

};


const MenuItems = props => {
    
    return (
        <div>
            <AuthUserContext.Consumer>
                {authUser => authUser ? <AuthItems /> : <NonAuthItems />}
            </AuthUserContext.Consumer>            
        </div>
    );
}

export default MenuItems;
