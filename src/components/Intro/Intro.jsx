
import React from "react";

import "./Intro.css";
import { Link } from "react-router-dom";


const Intro = props => {
    return (
        <div>
            <div className="box box-header">
                
                <h1 className="box-title"> 
                    <i className="fa fa-globe"> </i> 
                        Welcome to Get Ready Investments 
                </h1>

                <div className="container-fluid">
                <blockquote className="pull-left">
                    <small><strong>Caring for the development of people</strong></small>
                </blockquote>
                <blockquote className="pull-right">
                        <Link to='/about'> <img src={'/static/images/logo.jpg'} width='50' height='50' alt={'Get ready Center'} title={'Get Ready Investments'}/></Link>
                </blockquote>
                </div>
            </div>
        </div>
    )
};

export default Intro