
import React from "react";
import ContactMenu from "../ContactMenu/ContactMenu";


import Intro from "../../Intro/Intro";

const ContactDetails = props => {
    return (
        <div className="contact">
            <Intro />
            <div className="row">
                <div className="col-md-3">
                    <ContactMenu />
                </div>
                <div className="col-md-9">
                    <h3 className="box box-title">Contact Details</h3>
                </div>
            </div>
        </div>
    )
};


export default ContactDetails