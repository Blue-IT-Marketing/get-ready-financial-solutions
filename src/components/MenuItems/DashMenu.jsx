
import React, {Component} from "react";
import "./MenuItems.css";



class DashMenuItems extends Component { 
    constructor(props){
        super(props);
        this.state = {
            dashMenu : {
                loading : false,
                hideMenu : false,
             }
          };

        this.onSwitch = this.onSwitch.bind(this);
        this.onHideMenu = this.onHideMenu.bind(this);
    };

    onSwitch(e){
        this.props.onSwitch(e);
    };

    onHideMenu(e){
        this.props.onHideMenu(e);

    }

    render(){
        return(
            <div className="col-md-3"> 
                <ul className="list-group">
                    {/*<li className="list-group-item"><button className="btn btn-outline-dark btn-box-tool btn-app btn-block" name="settings" onClick={e => this.onSwitch(e)}> <strong> <i className="fa fa-cogs"> </i>  Settings </strong></button></li>*/}
                    <li className="list-group-item"><button className="btn btn-outline-dark btn-box-tool btn-app btn-block" name="centers" onClick={e => this.onSwitch(e)}> <strong> <i className="fa fa-building-o"> </i> Centers </strong></button></li>
                    <li className="list-group-item"><button className="btn btn-outline-dark btn-box-tool btn-app btn-block" name="groups" onClick={e => this.onSwitch(e)}> <strong> <i className="fa fa-group"> </i> Group Loans &amp; Repayments </strong></button></li>
                    <li className="list-group-item"><button className="btn btn-outline-dark btn-box-tool btn-app btn-block" name="clients" onClick={e => this.onSwitch(e)}> <strong> <i className="fa fa-users"> </i> Clients &amp; Business Evaluations </strong> </button></li>
                    <li className="list-group-item"><button className="btn btn-outline-dark btn-box-tool btn-app btn-block" name="loans" onClick={e => this.onSwitch(e)}> <strong> <i className="fa fa-credit-card-alt"> </i> Loan Manager </strong></button> </li>
                    <li className="list-group-item"><button className="btn btn-outline-dark btn-box-tool btn-app btn-block" name="help" onClick={e => this.onSwitch(e)}> <strong> <i className="fa fa-life-bouy"> </i> Help </strong></button> </li>
                </ul>
            </div>
        )
    }
 }



export default DashMenuItems;