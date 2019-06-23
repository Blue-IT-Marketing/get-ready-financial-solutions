
import React from "react";
import {Link} from "react-router-dom";
import "./ContactMenu.css";


const ContactMenu = props => {
    return (
        <div className="contact-menu">
            <div className="box box-primary">
                <div className="box box-header">
                    <h3 className="box box-title"> <i className="fa fa-envelope"> </i> Contact</h3>
                </div>
                <ul className='list-group'>
                    <li className='list-group-item'><button type="button" className="btn btn-block btn-outline-dark btn-app"> <Link to="/contact/details"> <strong> <i className="fa fa-info"> </i> Details </strong> </Link></button></li>
                    <li className='list-group-item'><button type="button" className="btn btn-block btn-outline-dark btn-app"> <Link to="/contact/form"> <i className="fa fa-envelope-square"> </i> Contact Form</Link></button></li>
                </ul>
            
            </div>

        </div>
    )
}


export default ContactMenu