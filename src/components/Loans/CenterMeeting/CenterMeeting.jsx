import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './CenterMeeting.css';
import Intro from '../../Intro/Intro';
import LoansMenu from '../LoansMenu/LoansMenu';


import { center_details,CenterListItem,SelectCenter} from '../../Centers/Centers';

let group_details = {
    center_id : "",
    group_id : "",
    group_name: "",    
};

let addressDetails = {
    stand_number : "",
    street_name : "",
    city_town : "",
    province: "",
    country: "",
    postal_code: "",
};

let meeting_details = {
    date_meeting : "",
    number_present : "",
    number_absent : "",
    savings_balance : "",
    date_paid: "",
    installment_amount : "",
    current_paid: "",
    total_due: "",
    remarks : "",
    address: { ...addressDetails },
    group_details: { ...group_details },        
};




//
// const MeetingListItem = props => {
//     return (
//         <tr>
//             <td>{props.date}</td>
//             <td>{props.present}</td>
//             <td>{props.absent}</td>
//             <td>{props.balance}</td>
//             <td>{props.date_paid}</td>
//             <td>{props.installment}</td>
//         </tr>
//     );
// };

class MeetingListItem extends Component{
    constructor(props){
        super(props);

    };

    render(){
        return(
            <tr>
                <td>{this.props.date}</td>
                <td>{this.props.present}</td>
                <td>{this.props.absent}</td>
                <td>{this.props.balance}</td>
                <td>{this.props.date_paid}</td>
                <td>{this.props.installment}</td>
            </tr>
        )
    }
}

class PreviousMeetings extends Component{
    constructor(props){
        super(props);
        this.state = {
            meetings_list : [] // {...props.Meetings}
        }
    };

    componentWillMount(e){
        this.setState({meetings_list : this.props.Meetings})
    };

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-header"> <small><strong>Previous Meetings</strong></small></h3>
                </div>

                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <td><strong>Date</strong></td>
                            <td><strong>Present</strong></td>
                            <td><strong>Absent</strong></td>
                            <td><strong>Balance</strong></td>
                            <td><strong>Date Paid</strong></td>
                            <td><strong>Installment Amount</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.meetings_list.map((meeting,index) =>{
                                return(
                                    <MeetingListItem
                                        date={meeting.date_meeting }
                                        present={meeting.number_present}
                                        absent={meeting.number_absent}
                                        balance={meeting.savings_balance}
                                        date_paid={meeting.date_paid}
                                        installment={meeting.installment_amount}
                                    />
                                );
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Date</strong></td>
                            <td><strong>Present</strong></td>
                            <td><strong>Absent</strong></td>
                            <td><strong>Balance</strong></td>
                            <td><strong>Date Paid</strong></td>
                            <td><strong>Installment Amount</strong></td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        );
    }
}

class MeetingEditor extends Component {
    constructor(props){
        super(props);
        this.state = { ...this.props.Meeting}        
    };

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSaveMeeting(e){
        e.preventDefault();
        let Meeting = JSON.stringify(this.state);
        this.props.MeetingEdited(Meeting);
    };

    render(){
            
        return (
            <div className="box box-body">
            <div className="box box-header">
                <h3 className="box-title"> Meeting Editor</h3>
            </div>
            <form className="form-horizontal" onSubmit={e => this.onSaveMeeting(e)}>
                <div className="form-group">
                    <label className="label label-default">Date Meeting</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Enter Date the meeting Took Place" name="date_meeting" value={this.state.date_meeting} onChange={e => this.onChange(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="label label-default">Number Present</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Total Members in Attendance" name="number_present" value={this.state.number_present} onChange={e => this.onChange(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="label label-default">Number Absent</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Total Number Absent" name="number_absent" value={this.state.number_absent} onChange={e => this.onChange(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="label label-default">Savings Balance</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Total Savings Balance" name="savings_balance" value={this.state.savings_balance} onChange={e => this.onChange(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="label label-default">Date Paid</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Date Payment Made" name="date_paid" value={this.state.date_paid} onChange={e => this.onChange(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="label label-default">Installment Amount</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Installment Amount" name="installment_amount" value={this.state.installment_amount} onChange={e => this.onChange(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="label label-default">Current Paid</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Current Paid" name="current_paid" value={this.state.current_paid} onChange={e => this.onChange(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="label label-default">Total Due / Balance</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Total Due" name="total_due" value={this.state.total_due} onChange={e => this.onChange(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="label label-default">Remarks</label>
                    <div className="input-group">
                        <textarea className="form-control" name="remarks" value={this.state.remarks} onChange={e => this.onChange(e)}>Remarks...</textarea>
                    </div>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary btn-block" onClick={ e => this.onSaveMeeting(e)}><strong> Save Meeting</strong></button>
                </div>

            </form>
            </div>
        )
    }
};

const GroupListItems = props => {
    return(
        <li className="list-group-item" key={props.key} onClick={ e => { 
            let group_id = props.group_id;
            return (                
                props.groupSelected(group_id)
            )

        }} style={{ cursor : "pointer" }}>{props.group_name}</li>
    )
};


class GroupSelector extends Component{
    constructor(props){
        super(props);
        this.state = {group_list :[]
        };
    };

    GroupSelected(group_id){
        let present_group_list = Object.assign([],this.state.group_list);
        let group = present_group_list.find(group => group.group_id === group_id);
        this.props.OnSelectedGroup(group);

    };

    componentWillMount = (e) =>{
        this.setState({
            group_list : this.props.group_list
        })
    };

    render(){
        return (
            <ul className="list-group">
                    {
                        this.state.group_list.map((group,index) => {
                            return(
                                <GroupListItems
                                    key={group.group_id}
                                    group_name = {group.group_name}
                                    group_id = {group.group_id}
                                    groupSelected={this.GroupSelected.bind(this)}
                                />
                            );
                        })
                    }                
            </ul>

        )
    }
}

class GroupEditor extends Component{
    constructor(props){
        super(props);
        this.state = { center : {...this.props.Center},
                       group_selected : "",
                       group_list : [{
                           group_id: "23487ydh8723",
                           group_name: "Malamulele John Group"
                       },{
                           group_id: "eahrf98h3249834",
                           group_name: "Mavambe Group 3"
                       }], 
                    }
        };

    
    onSelectGroup(group){
        this.setState({
            group_selected : group
        })

    };        

    componentWillMount = (e) =>{
        //load group list if found change default groups
        
    };

    render(){
        return (
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> Group Editor</h3>
                </div>
                <GroupSelector 
                    group_list={this.state.group_list}
                    OnSelectedGroup={this.onSelectGroup.bind(this)}
                />
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="label label-default"> <strong>Selected Group</strong></label>
                        <div className="input-group">
                            <input type="text" className="form-control" value={this.state.group_selected.group_name}/>
                        </div>
                    </div>
                </form>
                
            </div>
        );
    };
};

class AddressEditor extends Component{
    constructor(props){
        super(props);
        this.state = {...this.props.Address}
    };

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    };

    onSaveAddress(e){
        e.preventDefault();
        let Address = JSON.stringify(this.state)
        this.props.AddressEdited(Address);
    };

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> Address Editor</h3>
                </div>

                <form className="form-horizontal" onSubmit={e => this.onSaveAddress(e)}>
                    <div className="form-group">
                        <label className="label label-default"><strong> Stand #</strong></label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="stand_number" placeholder="Stand Number" value={this.state.stand_number} onChange={e => this.onChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label label-default"><strong> Street Name</strong></label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="street_name" placeholder="Street Name" value={this.state.street_name} onChange={e => this.onChange(e)} />
                        </div>                    
                    </div>
                    <div className="form-group">
                        <label className="label label-default"><strong> City Town</strong></label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="city_town" placeholder="City Town" value={this.state.city_town} onChange={e => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label label-default"><strong> Province</strong></label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="province" placeholder="Limpopo" value={this.state.province} onChange={e => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label label-default"><strong> Country</strong></label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="country" placeholder="South Africa" value={this.state.country} onChange={e => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label label-default"><strong> Postal Code</strong></label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="postal_code" placeholder="Postal Code" value={this.state.postal_code} onChange={e => this.onChange(e)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="button" className="btn btn-primary btn-block" onClick={ e => this.onSaveAddress(e)}><strong>Save Address</strong></button>
                    </div>

                </form>
            </div>
        )
    }
}

class CreateMeeting extends Component{
    constructor(props){
        super(props);
        this.state = {
            center_details : {...this.props.Center},
            Meeting : {...meeting_details},
            show_meeting_editor: false,
            show_group_editor: false,
            show_address_editor : false                        
        };

        this.onChange = this.onChange.bind(this);
        this.showMeetingEditor = this.showMeetingEditor.bind(this);
        this.showAddressEditor = this.showAddressEditor.bind(this);
        this.MeetingEdited  = this.MeetingEdited.bind(this);
        this.GroupEdited = this.GroupEdited.bind(this);
        this.AddressEdited = this.AddressEdited.bind(this);
    };

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    showMeetingEditor(e){
        this.setState({
            show_meeting_editor: true,
            show_group_editor : false,
            show_address_editor: false,
        })
    };

    showGroupEditor(e){

        this.setState({
            show_group_editor: true,
            show_meeting_editor: false,
            show_address_editor: false
        });
    };

    showAddressEditor(e){
        this.setState({
            show_address_editor: true,
            show_group_editor: false,
            show_meeting_editor: false
        });
    };

    MeetingEdited(Meeting){
        let thisMeeting = JSON.parse(Meeting);
        console.log(thisMeeting);
        this.setState({Meeting : thisMeeting})
    };

    GroupEdited(Group){
        let thisGroup = JSON.parse(Group);
        console.log(thisGroup)
        let Meeting = Object.assign([], this.state.Meeting);
        Meeting.group_details = thisGroup;
        this.setState({
            Meeting : Meeting
        });

    };

    AddressEdited(Address){
        let thisAddress = JSON.parse(Address);
        console.log(thisAddress);        
        let Meeting = Object.assign([],this.state.Meeting);
        Meeting.address = thisAddress;
        this.setState({Meeting : Meeting});
    };

    render(){
        return <div className="box box-body">
            <div className="box box-header">
                <h3 className="box-title"> Create Meeting</h3>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="box box-primary">
                        <ul className="list-group">
                            <li className="list-group-item" style={{cursor: "pointer", color: "blue"}}><strong>Center
                                Name : </strong> {this.state.center_details.center_name}</li>
                            <li className="list-group-item">
                                <button className="btn btn-primary btn-block"
                                        onClick={e => this.showGroupEditor(e)}> Select Group
                                </button>
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-primary btn-block"
                                        onClick={e => this.showAddressEditor(e)}> Address Editor
                                </button>
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-primary btn-block"
                                        onClick={e => this.showMeetingEditor(e)}> Meeting Editor
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-8">
                    {(this.state.show_meeting_editor) ?
                        <MeetingEditor Meeting={this.state.Meeting} MeetingEdited={this.MeetingEdited} /> : ""}

                    {
                        (this.state.show_group_editor) ? <GroupEditor Center={this.state.center_details} GroupEdited={this.GroupEdited.bind(this)} /> : ""
                    }

                    {
                        (this.state.show_address_editor) ? <AddressEditor Address={this.state.Meeting.address} AddressEdited={this.AddressEdited.bind(this)} /> : ""
                    }

                </div>
                    </div>
        </div>
                        )}
                    }







class CenterMeeting extends Component {
        constructor() {
        super();
        this.state = {
                    center_details : {...center_details},
                    meeting : {...meeting_details},
                    center_list: [{
                    center_id : "908sd0f8s0d9f",
                    center_name:"Malamulele"}],
                    meetings_list : [] // load meetings list on Component will mount
                };
            };


            onSelectedCenter(center_id){
                    console.log(center_id);
                    let centers_list = Object.assign([],this.state.center_list);
                    let this_center = centers_list.find(center => center.center_id === center_id);
                    this.setState({center_details : this_center});
                }

            componentWillMount = () => {
                    // load Centers List, loan Officers, and meetings list, also define a handler to search for previous meetings
                };

                    render() {
                    return (
                    <div className="center-meeting">
                    <Intro />
                    <div className="row">
                    <div className="col-md-3">
                    <LoansMenu />
                    </div>

                    <div className="col-md-8">
                    <div className="box box-body">
                    <div className="box box-header">
                    <h3 className="box-title"><small> Center Meetings </small></h3>
                    </div>

                    <div className="box box-footer">
                    <Tabs>
                    <TabList>
                    <Tab>Create Meeting</Tab>
                    <Tab>Previous Meetings</Tab>
                    </TabList>
                    <TabPanel>
                    <SelectCenter Centers={this.state.center_list} onSelectedCenter={this.onSelectedCenter.bind(this)} />
                    {
                        (this.state.center_details.center_id !== "") ? <CreateMeeting
                            Center={this.state.center_details}/> : `Please Select a center to Cnter Meeting Details `
                    }
                    </TabPanel>

                    <TabPanel>
                    <PreviousMeetings Meetings={this.state.meetings_list}/>

                    </TabPanel>
                    </Tabs>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    );
                };
                };
                    export default CenterMeeting;

                    // {
// //TODO- make sure this works properly it presently renders AddPPI wrongly for testing
// (this.state.client.client_id) ? <AddPPI client={this.state.client} /> : `
//                                         Please Select Center then Group and then the Client to Complete PPI for

//                                     `
// }      )
                }