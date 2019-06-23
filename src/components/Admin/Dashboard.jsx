import React, { Component } from "react";
import "./Admin.css";
import Intro from "../Intro/Intro";
import User from "../User/User";
import Axios from "axios";
import Ionicon from 'react-ionicons';
import Centers from "../Centers/Centers";
import Groups from "../Groups/Groups";
import Clients from "../Clients/Clients";
import Loans from "../Loans/Loans";
import SignoutPage from "../User/SignOut/SignOut";
import Help from "../Help/Help";



class CenterDashboard extends Component{
    constructor(){
        super();
        this.state = {
            show_centers_manager : true,
            show_reports : false,
        };


    };

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <strong> <i className={"fa fa-building-o"}> </i> Center Dashboard </strong> </h3>
                </div>

                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-building-o"> </i> Manage Centers </strong></button>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-envelope"> </i> Center Messaging </strong></button>
                    </div>
                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-file-archive-o"> </i> Center Reports </strong></button>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-file-excel-o"> </i> Center Meetings Reports </strong></button>
                    </div>

                </div>


            </div>
        )
    }
}


class GroupDashboard extends Component{
    constructor(){
        super();
        this.state = {
            show_group_manager : true,
            show_group_reports : false
        };
    };

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <strong> <i className={"fa fa-users"}> </i> Groups Dashboard </strong></h3>
                </div>

                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-building-o"> </i> Manage Groups </strong></button>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-building-o"> </i> Group Messaging </strong></button>
                    </div>
                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-building-o"> </i> Group Reports </strong></button>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-building-o"> </i> Group Meetings Reports </strong></button>
                    </div>

                </div>
            </div>
        )
    }
}


class ClientsDashboard extends Component{
    constructor(){
        super();
        this.state = {
            show_clients_manager : true,
            show_reports_manager : false,

        };
    };


    render(){
        return(
            <div className={"box box-body"}>
                <div className={"box box-header"}>
                    <h3 className={"box-title"}> <strong> <i className={"fa fa-users"}> </i> Clients Dashboard </strong></h3>
                </div>

                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-wrench"> </i> Manage Clients </strong></button>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-envelope"> </i> Clients Messaging </strong></button>
                    </div>
                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-file-archive-o"> </i> Clients Reports </strong></button>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-file-code-o"> </i> Clients Meetings Reports </strong></button>
                    </div>
                </div>
            </div>
        )
    }
}



class LoansDashboard extends Component{
    constructor(){
        super();
        this.state = {
            show_manage_loans : true,
            show_loans_reports : false,
        };
    };

    render(){
        return(
            <div className={"box box-body"}>
                <div className={"box box-header"}>
                    <h3 className={"box-title"}> <strong> <i className={"fa fa-arrow-right"}> </i> Loans Dashboard </strong></h3>
                </div>

                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-building-o"> </i> Manage Groups </strong></button>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-building-o"> </i> Group Messaging </strong></button>
                    </div>
                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-building-o"> </i> Group Reports </strong></button>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-building-o"> </i> Group Meetings Reports </strong></button>
                    </div>

                </div>
            </div>
        )
    }
}

class ContactMessagesDashboard extends Component{
    constructor(){
        super();
        this.state = {
            show_contacts : true
        };
    };

    render(){
        return(
            <div className={"box box-body"}>
                <div className={"box box-header"}>
                    <h3 className={"box-title"}> <strong> <i className={"fa fa-send"}> </i> Contact Messages Dashboard</strong></h3>
                </div>

                <div className={"row"}>

                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-envelope-o"> </i> New Messages </strong></button>
                    </div>
                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-envelope-square"> </i> Messages Archives </strong></button>
                    </div>
                </div>
            </div>
        )
    }
}

class UsersRightsDashboard extends Component{
    constructor(){
        super();
        this.state = {
            users : [],
            user : "",
            userRights : [],
        };
    };

    render(){
        return(
            <div className={"box box-body"}>
                <div className={"box box-header"}>
                    <h3 className={"box-title"}> <strong> <i className={"fa fa-user-md"}> </i> Users Rights </strong></h3>
                </div>

                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-user-md"> </i> Manage Users </strong></button>
                    </div>
                    <div className={"col-md-6"}>
                        <button className={"btn btn-app btn-block btn-outline-dark"}> <strong> <i className="fa fa-file"> </i> User Reports </strong></button>
                    </div>
                </div>
            </div>
        )
    }
}

class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            form_response : "",
            load_centers : true,
            load_groups : false,
            load_clients : false,
            load_loans : false,
            load_help : false,
            load_contacts : false,
            load_users : false,
        };

        this.onShow = this.onShow.bind(this);
    }


    onShow(e){
        switch (e.target.name) {

            case "centers" :
                this.setState({
                    load_centers : true,
                    load_groups : false,
                    load_clients : false,
                    load_loans : false,
                    load_help : false,
                    load_contacts : false,
                    load_users : false,
                }); break;

            case "groups" :
                this.setState({
                    load_centers : false,
                    load_groups : true,
                    load_clients : false,
                    load_loans : false,
                    load_help : false,
                    load_contacts : false,
                    load_users : false,
                }); break;

            case "clients" :
                this.setState({
                    load_centers : false,
                    load_groups : false,
                    load_clients : true,
                    load_loans : false,
                    load_help : false,
                    load_contacts : false,
                    load_users : false,
                }); break;

            case "loans" :
                this.setState({
                    load_centers : false,
                    load_groups : false,
                    load_clients : false,
                    load_loans : true,
                    load_help : false,
                    load_contacts : false,
                    load_users : false,
                }); break;

            case "help" :
                this.setState({
                    load_centers : false,
                    load_groups : false,
                    load_clients : false,
                    load_loans : false,
                    load_help : true,
                    load_contacts : false,
                    load_users : false,
                }); break;

            case "contacts" :
                this.setState({
                    load_centers : false,
                    load_groups : false,
                    load_clients : false,
                    load_loans : false,
                    load_help : false,
                    load_contacts : true,
                    load_users : false,
                }); break;

            case "users" :
                this.setState({
                    load_centers : false,
                    load_groups : false,
                    load_clients : false,
                    load_loans : false,
                    load_help : false,
                    load_contacts : false,
                    load_users : true,
                }); break;

            default: break;


        }
    }


    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">

                    <h3 className="box-title"> <strong> <i className="fa fa-dashboard"> </i> Dashboard </strong> </h3>


                    <div className="row pull-right">
                        <button name={"centers"} className="btn btn-box-tool btn-outline-dark" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-building-o"> </i> Centers</strong></button>
                        <button name={"groups"} className="btn btn-box-tool btn-outline-dark" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-users"> </i> Groups</strong></button>
                        <button name={"clients"} className="btn btn-box-tool btn-outline-dark" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-users"> </i> Clients</strong></button>
                        <button name={"loans"} className="btn btn-box-tool btn-outline-dark" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-arrow-right"> </i> Loans</strong></button>
                        <button name={"contacts"} className="btn btn-box-tool btn-outline-dark" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-arrow-right"> </i> Contact Messages</strong></button>
                        <button name={"users"} className="btn btn-box-tool btn-outline-dark" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-arrow-right"> </i> Users &amp; User Rights</strong></button>
                        {/*<button name={"help"} className="btn btn-box-tool btn-outline-dark" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-life-bouy"> </i> Help</strong></button>*/}
                    </div>
                </div>

                {
                    (this.state.load_centers) ?
                        <CenterDashboard />
                    :""
                }
                {
                    (this.state.load_groups) ?
                        <GroupDashboard />
                    :""
                }

                {
                    (this.state.load_clients) ?
                        <ClientsDashboard/>
                    :""
                }

                {
                    (this.state.load_loans) ?
                    <LoansDashboard />
                    :""
                }

                {
                    (this.state.load_contacts) ?
                        <ContactMessagesDashboard />
                    :""
                }

                {
                    (this.state.load_users) ?
                        <UsersRightsDashboard/>
                    :""
                }

                {
                    (this.state.load_help)?
                        <Help/>
                    : ''
                }

            </div>
        )
    }
}


export default Dashboard;