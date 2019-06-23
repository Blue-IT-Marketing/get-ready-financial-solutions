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
import Dashboard from "./Dashboard";
import DashMenuItems from "../MenuItems/DashMenu";
import Help from "../Help/Help";

class AdminIntro extends Component{
    constructor(){
        super();
        this.state = {

        };
    };

    render(){
        return(
            <div className={'box box-primary'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong>Get Ready Loan Management System</strong></h3>
                </div>


                    <div className={'box box-footer'}>
                        <div className={'box box-header'}>
                                <h3 className={'box-title'}><strong>Get ready loan management system</strong></h3>
                        </div>
                       <ul className={'list-group'}>
                           <li className={'list-group-item'}>Is a web based group loan management system accessible from any device capable
                       of accessing the web, with a web browser.</li>
                           <li className={'list-group-item'}> The web app serves as a one stop management portal for Get Ready Group Loans.</li>
                       </ul>



                    </div>





            </div>
        )
    }
}

class Admin extends Component{
    constructor(){
        super();
        this.state= {
            load_admin : true,
            load_centers : false,
            load_groups : false,
            load_clients: false,
            load_loans: false,
            load_signout : false,

            hide_menu : false,
            hidden_class : 'col-md-12',
            show_class : 'col-md-9',
            menuButtonText : 'Hide Menu'

        };


        this.onSwitch = this.onSwitch.bind(this);
        this.onHideMenu = this.onHideMenu.bind(this);
    };

    onSwitch(e){
         switch(e.target.name){
             case "admin" :
                 this.setState({
                    load_admin : true,
                    load_centers : false,
                    load_groups : false,
                    load_clients: false,
                    load_loans: false,
                    load_signout : false,
                    load_help : false,
                 });break;
             case "centers" :
                 this.setState({
                    load_admin : false,
                    load_centers : true,
                    load_groups : false,
                    load_clients: false,
                    load_loans: false,
                    load_signout : false,
                    load_help : false,
                 });break;

             case "groups" :
                 this.setState({
                    load_admin : false,
                    load_centers : false,
                    load_groups : true,
                    load_clients: false,
                    load_loans: false,
                    load_signout : false,
                    load_help : false,
                 });break;
             case "clients" :
                 this.setState({
                    load_admin : false,
                    load_centers : false,
                    load_groups : false,
                    load_clients: true,
                    load_loans: false,
                    load_signout : false,
                    load_help : false,

                 });break;

             case "loans" :
                 this.setState({
                    load_admin : false,
                    load_centers : false,
                    load_groups : false,
                    load_clients: false,
                    load_loans: true,
                    load_signout : false,
                    load_help : false,

                 });break;

             case  "signout":
                 this.setState({
                    load_admin : false,
                    load_centers : false,
                    load_groups : false,
                    load_clients: false,
                    load_loans: false,
                    load_signout : true,
                    load_help : false,

                 });break;

             case 'help':
                 this.setState({
                    load_admin : false,
                    load_centers : false,
                    load_groups : false,
                    load_clients: false,
                    load_loans: false,
                    load_signout : false,
                    load_help : true,});break;
             default: break;
         }
    }

    onHideMenu(e){
        let hide_menu = Object.assign({},this.state.hide_menu);
        hide_menu = !this.state.hide_menu;
        if (hide_menu){
            this.setState({
                hide_menu: hide_menu,
                show_class : 'col-md-12',
                menuButtonText : 'Show Menu'
            });

        }else{
            this.setState({
                hide_menu: hide_menu,
                show_class: 'col-md-9',
                menuButtonText: 'Hide Menu'
            });

        }
    }
render(){
    return(
        <div className="box box-body admin">
            <Intro />
            <div className="box box-header">
                <h3 className="box-title pull-left"><strong> <i className="fa fa-dashboard"> </i> Dashboard </strong></h3>
                <button name={"signout"} className="btn btn-box-tool btn-outline-danger pull-right" type="button" onClick={e => this.onSwitch(e)}> <strong> <i className="fa fa-sign-out"> </i> Sign Out </strong> </button>
                <button name={'hidemenu'} className="btn btn-box-tool btn-outline-warning pull-right" type="button" onClick={e => this.onHideMenu(e)}><strong> <i className="fa fa-bars"> </i> {this.state.menuButtonText} </strong></button>
            </div>

            <div className="row">
            {
                (!this.state.hide_menu) ?
                        <DashMenuItems
                            onSwitch={this.onSwitch}
                            onHideMenu={this.onHideMenu}
                        />
                :''                        
            }
                <div className={this.state.show_class}>
                    {
                        (this.state.load_centers) ?
                            <Centers />
                        :
                            ""
                    }
                    {
                        (this.state.load_groups) ?
                            <Groups />
                        :
                            ""
                    }

                    {
                        (this.state.load_clients) ?
                            <Clients />
                        :
                            ""
                    }
                    {
                        (this.state.load_loans) ?
                            <Loans />
                        :
                            ""
                    }
                    {
                        (this.state.load_signout) ?
                            <SignoutPage />
                        : ""
                    }
                    {
                        (this.state.load_help)?
                            <Help/>
                        :""
                    }
                    {
                        (this.state.load_admin) ?
                            <AdminIntro/>
                        :""
                    }
                </div>
            </div>
        </div>

    )
}
}


export default Admin;