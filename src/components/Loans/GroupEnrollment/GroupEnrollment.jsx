import React, { Component } from "react";
import './GroupEnrollment.css';




class GroupEnrollment extends Component {
    constructor() {
        super()
        this.state = {
            group_name: "",
            area_name: "",
            area_code: ""
        }
    };

    onChange(e){
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentWillMount ()  {
        // load Centers List, loan Officers
    };


    render () {
        return (
            <div>

            </div>

        );
    };

};

export default GroupEnrollment;