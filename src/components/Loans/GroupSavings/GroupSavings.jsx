import React, { Component } from "react";
import './GroupSavings.css';




class GroupSavings extends Component {
    constructor() {
        super()
        this.state = {
            center_id: "",
            date: "",
            group_id: "",
            loan_officer_id: ""

        }
    };


    componentWillMount = () => {
        // load Centers List, loan Officers
    };


    render() {
        return (
            <div className="group-savings">
            </div>

        );
    };

};

export default GroupSavings;