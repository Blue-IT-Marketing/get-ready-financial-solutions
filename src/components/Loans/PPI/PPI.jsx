import React, { Component } from "react";
import 'react-tabs/style/react-tabs.css';
import './PPI.css';
import Axios from "axios";


let household_res = {
        grand_parents : "",
        parents : "",
        children : "",
        grand_children : "",
        other : "",
};
let household_energy = {
    none: false,
    firewood: false,
    solar: false,
    parrafin: false,
    coal: false,
    electricity: false,
};

let client_info  = {
        
        client_id: "",
        name: "",
        id_number: "",        
    };


let center_info = {
        center_name : "",
        center_id: "",
    
    
};

let group_info  = {
        group_name : "",
        group_id : "",
        total_clients : "",
};


const HouseHRes = props => {

    return(

        <form className = "form-horizontal">
                <div className="box box-header">
                    <h3 className="box-title">House Hold Residence</h3><br/>
                    <small><strong>How many people live in the client's Household</strong></small>
                    
                </div>            
                <div className="form-group">
                <div className="input-group">
                    <label className="label label-default"><strong>Grand Parents</strong></label>
                </div>
                    <input type="number" className="form-control" name="grand_parents" placeholder="Grand Parents" value={props.Residence.grand_parents} onChange={e => props.onResidenceChange(e)} />
                </div>
                <div className="form-group">
                <div className="input-group">
                    <label className="label label-default"><strong>Parents</strong></label>
                </div>
                <input type="number" className="form-control" name="parents" placeholder="Parents" value={props.Residence.parents} onChange={e => props.onResidenceChange(e)} />
                </div>
                <div className="form-group">
                <div className="input-group">
                    <label className="label label-default"><strong>Children</strong></label>
                </div>
                <input type="number" className="form-control" name="children" placeholder="Children" value={props.Residence.children} onChange={e => props.onResidenceChange(e)} />
                </div>
                <div className="form-group">
                <div className="input-group">
                    <label className="label label-default"><strong>Grand Children</strong></label>
                </div>
                <input type="number" className="form-control" name="grand_children" placeholder="Grand Children" value={props.Residence.grand_children} onChange={e => props.onResidenceChange(e)} />
                </div>
                <div className="form-group">
                <div className="input-group">
                    <label className="label label-default"><strong>Other</strong></label>
                </div>
                    <input type="number" className="form-control" name="other" placeholder="Other" value={props.Residence.other} onChange={e => props.onResidenceChange(e)} />
                </div>
        </form>
    )
};


const EnergySource = props => {
    return (
        <form className="form-horizontal">
            <div className="box box-header">
                <h3 className="box-title"> Energy Source</h3><br />
                <small><strong>Energy Sources for the household </strong></small>
            </div>

            <div className="form-group">            
                <div className="input-group">
                    <label className="label label-default"><strong>Other</strong></label>
                </div>
                <select className="form-control" name="none" value={props.Energy.none} onChange={e => props.onEnergyChange(e)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            <div className="form-group">
                <div className="input-group">
                    <label className="label label-default"><strong>Firewood</strong></label> 
                </div>
                <select className="form-control" name="firewood" value={props.Energy.firewood} onChange={e => props.onEnergyChange(e)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>        

            <div className="form-group">
                <div className="input-group">
                    <label className="label label-default"><strong>Parrafin</strong></label> 
                    
                </div>
                <select className="form-control" name="parrafin" value={props.Energy.parrafin} onChange={e => props.onEnergyChange(e)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            <div className="form-group">
                <div className="input-group">
                    <label className="label label-default"><strong>Coal</strong></label> 
                </div>

                <select className="form-control" name="coal" value={props.Energy.coal} onChange={e => props.onEnergyChange(e)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            <div className="form-group">
                <div className="input-group">
                    <label className="label label-default"><strong>Electricity</strong></label> 
                </div>

                <select className="form-control" name="electricity" value={props.Energy.electricity} onChange={e => props.onEnergyChange(e)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

            </div>

            <div className="form-group">
                <div className="input-group">
                    <label className="label label-default"><strong>Solar</strong></label>
                </div>

                <select className="form-control" name="solar" value={props.Energy.solar} onChange={e => props.onEnergyChange(e)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

            </div>

        </form>
        
    )

};

class AddPPI extends Component{
    constructor(props){
        super(props);
        this.state = {
            client : {...this.props.client}, //passed as parameter
            month : "", //ppi for this month
            date_taken: "", // date ppi taken

            //ppi data
            new_members : false, //true or false
            total_rooms : "",
            have_you_moved : false, //true or false
            combined_annual_income : "", //value

            household_energy_source : {...household_energy},
            household_residents: {...household_res}
        };        
    };

    onChange(e){
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
        

    };

    onClick(e){
        console.log(e.target.name)
    };

    onResChange(e){
        console.log("Save Residence");
        console.log(e.target.name + "  " + e.target.value);
        let house_res = Object.assign([],this.state.house_hold_residents);
        switch(e.target.name){
            case "grand_parents" : house_res.grand_parents = e.target.value; break;
            case "parents" : house_res.parents = e.target.value; break;
            case "children" : house_res.children = e.target.value;break;
            case "grand_children" : house_res.grand_children = e.target.value;break;
            case "other" : house_res.other = e.target.value;break;
            default : break;
        }

        this.setState({household_residents : house_res});

    };

    onEnergyChange(e){
        let energy_change = Object.assign([],this.state.household_energy_source);
        switch(e.target.name){
            case "none" : energy_change.none = e.target.value; break;
            case "firewood" : energy_change.firewood = e.target.value; break;
            case "parrafin" : energy_change.parrafin = e.target.value; break;
            case "coal" : energy_change.coal = e.target.value; break;
            case "electricity" : energy_change.electricity = e.target.value;break;
            case "solar": energy_change.solar = e.target.value; break;
            default : break;
        };
        this.setState({ household_energy_source : energy_change});
    };

    componentWillMount = () => {
            this.setState({state:this.props.client});
    };



    render(){

        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <small><strong> Add PPI </strong></small></h3><br />
                    <small>Client PPI Form for the month</small>
                </div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <input type="text" className="form-control" name="month" placeholder="Month" value={this.state.month} onChange={e => this.onChange(e)} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="date_taken" placeholder="Date Taken" value={this.state.date_taken} onChange={e => this.onChange(e)} />
                    </div>
                    <div className="form-group"> 
                        <label><strong>New Members Since Last Visit</strong></label>                       
                        <select name="new_members" className="form-control" value={this.state.new_members} onChange={e => this.onChange(e)}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>                           
                    </div>
                    <div className="form-group">
                        <label><strong>Total Rooms in Household</strong></label>
                        <input type="number" className="form-control" value={this.state.total_rooms} onChange={e => this.onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label title="click yes if user has recently changed residences"><strong>Any Recent Move ?</strong></label>
                        <select name="have_you_moved" className="form-control" value={this.state.have_you_moved} onChange={e => this.onChange(e)}> 
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label><strong>Combined Annual Income</strong></label>
                        <input type="number" className="form-control" name="combined_annual_income" value={this.state.combined_annual_income} onChange={e => this.onChange(e)} />
                    </div>
                    <EnergySource Energy={this.state.household_energy_source} onEnergyChange={this.onEnergyChange.bind(this)}/>
                    <HouseHRes Residence={this.state.household_residents} onResidenceChange={this.onResChange.bind(this)}/>
                </form>
            </div>
        )
    }
}

const Group = props =>{
    return (
        <option value={props.group_id} onClick={e => props.onClick(e)}> {props.group_name} - {props.total_clients}</option>
    )

};

const Center = props =>{
    return (
        <option value={props.center_id} onClick={e => props.onClick(e)}> {props.center_name} </option>
    )
}

const Client = props => {
    return(
        <option value={props.client_id} onClick={e => props.onClick(e)}> {props.name} - {props.id_number}</option>
    )
};

class PPI extends Component {
    constructor() {
        super();
        this.state = {
            center: {...center_info},//passed as parameter
            group: {...group_info}, //passed as parameter
            client: {...client_info}, //passed as parameter

        
            centers : [],
            groups : [],
            clients : [],            
            ppis : [],

            load_ppi : true,
            load_clients : false,

        };

        this.onCentersClick = this.onCentersClick.bind(this);
        this.onGroupsClick = this.onGroupsClick.bind(this);
        this.onClientsClick = this.onClientsClick.bind(this);
        this.onSwitch = this.onSwitch.bind(this);
        this.onClose = this.onClose.bind(this);

    };

    onClose(e){
        this.props.onClose(e);
    }
    
    onSwitch(e){
        switch (e.target.name) {
            case "ppi" :
                this.setState({
                    load_ppi: true,
                    load_clients : false,
                });break;
            case "clients" :
                this.setState({
                    load_ppi: false,
                    load_clients : true,
                });break;
            default:break;

        }
    }

    onCentersClick(e){

        let center_id = e.target.value;
        console.log(center_id);
        //fetching group list from centers
        let center_endpoint = "/centers/" + center_id + "/groups";

        Axios.get(center_endpoint).then(function(response){

            if (response.ok){
                return response.json();
            }else{
                throw new Error("error fetching center groups");                
            }

        }).then( data => {
            let data_array = JSON.parse(data);
            this.setState({data : data_array});
        });
    };

    onGroupsClick(e){
        let group_id = e.target.value;
        console.log(group_id);

        let group_endpoint = "/groups/" + group_id + '/clients';

        Axios.get(group_endpoint).then(function(response){
            if(response.ok){
                return response.json();
            }else{
                throw new Error("Error fetching group clients");
            }
        }).then (data => {
            let client_array = JSON.parse(data);
            this.setState({clients : client_array});
        })
    };

    onClientsClick(e){
        let client_id = e.target.value;
        let clients_state = Object.assign([],this.state.clients);
        let client = clients_state.find( client => client.client_id === client_id);
        this.setState({client:client});
    };

    componentWillMount = () => {
        // load Centers List, loan Officers, and clients
    };
    render() {
        return (

            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <small>Progress out of Poverty Index (PPI)</small></h3>


                        <button type={'button'} className={'btn btn-box-tool btn-outline-danger pull-right'}
                                name={'close'}
                                onClick={ e => this.onClose(e)}
                        > <strong><i className={'fa fa-close'}> </i> Close </strong>

                        </button>
                        <button className="btn btn-box-tool btn-outline-dark pull-right" name="ppi"
                                onClick={e => this.onSwitch(e)}
                        >
                            <strong> <i className={'fa fa-plus-circle'}> </i> PPI</strong>
                        </button>

                        <button className="btn btn-box-tool btn-outline-dark pull-right" name="clients"
                                onClick={e => this.onSwitch(e)}>
                            <strong> <i className={'fa fa-users'}> </i> Clients</strong>
                        </button>

                </div>
                <div className="box box-footer">

                    <AddPPI />

                </div>
            </div>
        );
    };
};
export default PPI;