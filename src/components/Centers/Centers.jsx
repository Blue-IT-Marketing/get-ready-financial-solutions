
import React ,{ Component} from "react";

import "./Centers.css";
import Axios from "axios";
import * as centers_routes from '../../constants/centers-routes';
import * as Address from '../Addresses';
import * as Utils from '../../constants/utilities';
import ContactDetails, {DisplayContactDetails} from '../ContactDetails/ContactDetails';
import Meetings from '../Meetings/Meetings';

import postal_address_detail from '../Addresses/Postal/Postal';
import physical_address_details from '../Addresses/Physical/Physical';
import contact_details from '../ContactDetails/ContactDetails';
import meeting_details, {DisplayMeetings} from '../Meetings/Meetings';
import InlineError from "../Forms/InlineError";
import InlineMessage from "../Forms/InlineMessage";


export let center_details = {
    center_name : "",
    center_id : "",
    total_groups : ""
};



export class SelectCenter extends Component {
    constructor(props) {
        super(props);
        let centers = this.props.centers;
        this.state = {
            centers: {centers}
        };
        this.onClick = this.onClick.bind(this);
    };

    onClick(center_id) {
        this.props.onSelectedCenter(center_id)
    };

    render() {
        return (
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> Select Center</h3>
                </div>
                <ul>
                    {
                        this.props.centers.map((center, index) => {
                            return (
                                <CenterListItem
                                    key={center.center_id}
                                    center_name={center.center_name}
                                    total_groups={center.total_groups}
                                    center_id={center.center_id}
                                    onSelected={this.onClick.bind(this)}
                                />)
                        })
                    }
                </ul>
            </div>
        );
    };
};

class CenterListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            center_item : "",
        };
        this.onCenterDetails = this.onCenterDetails.bind(this);
        this.onEditCenter = this.onEditCenter.bind(this);
    };

    onCenterDetails(e){
        console.log('On Center Details');
        console.log(e.target.name);

    }

    onEditCenter(e){
        console.log('On Edit Center');
        console.log(e.target.name);
        this.props.editCenter(e.target.name);
    }

    render(){
        return(
                <tr>
                    <td style={{ cursor: 'pointer'}} onClick={e => {
                        let center_id = this.props.center_id;
                        return(
                            this.props.showCenterDetail(center_id)
                        );
                        }}>
                        <button type={"button"} className={"btn btn-outline-success"} >
                            <strong>
                                {this.props.center_name}
                            </strong>
                        </button>
                    </td>
                    <td>{this.props.total_groups}
                    </td>
                    <td><button className={'btn btn-warning'} name={this.props.center_id} onClick={e =>  this.onEditCenter(e)}><strong> <i className={'fa fa-edit'}></i>  Edit</strong></button></td>
                </tr>
        )
    }
}

export class CentersList extends Component{
    constructor(props){
        super(props);
        this.state = {
            centers_list : this.props.centers_list,
            total_centers : 0
        };
        this.onClose = this.onClose.bind(this);
    };

    onClose(e){
        this.props.onClose(e);
    }

    render(){

        // let my_centers = [];
        // this.state.centers_list.forEach((center) => {
        //     my_centers.push(center);
        // });
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <strong> <i className="fa fa-server"> </i> Centers List</strong></h3>
                    {/* Find Me */}
                    <button className="btn btn-box-tool btn-outline-danger pull-right" onClick={e => this.onClose(e)}  ><strong> <i className='fa fa-close'> </i> Close </strong></button>
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td><strong><small>Center Name</small></strong></td>
                            <td><strong><small>Total Groups</small></strong></td>
                            <td><strong><small>Action</small></strong></td>
                        </tr>
                    </thead>
                     <tbody>
                         {
                             this.state.centers_list.map((center,index) =>{
                                 return(
                                            <CenterListItem
                                                center_name={center.center_name}
                                                center_id={center.center_id}
                                               total_groups={center.total_groups}
                                                showCenterDetail={this.props.showCenterDetail}
                                                editCenter={this.props.editCenter}
                                                key={center.center_id + index}
                                            />
                                 );
                             })
                         }

                    </tbody>
                    <tfoot>
                        <tr>
                            <td> <strong><small>Center Name</small></strong></td>
                            <td><strong><small>Total Groups</small></strong></td>
                            <td><strong><small>Action</small></strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}


class DisplayCenterDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            center_detail : {...this.props.center_detail}
        };
    };


    render(){
        return(
            <div className={'box box-body'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong>Center Details</strong></h3>
                </div>

                <div className={'box box-footer'}>
                    <ul className={'list-group'}>
                        <li className={'list-group-item'}><strong>Center Name :</strong> <em> {this.state.center_detail.center_name} </em></li>
                        <li className={'list-group-item'}><strong>Total Groups : </strong> <em> {this.state.center_detail.total_groups}</em></li>
                        <li className={'list-group-item'}><button className={'btn btn-success'}><strong><i className={'fa fa-print'}> </i> Print </strong></button> <button className={'btn btn-info'}><strong><i className={'fa fa-edit'}> </i> Edit </strong></button></li>
                    </ul>
                </div>

            </div>
        )
    }
}

class CenterDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            center_detail :{...this.props.center_detail},
            postal_address : {...postal_address_detail},
            physical_address : {...physical_address_details},
            contact_details : {...contact_details},
            meetings_list : {...meeting_details},
            // notes : {...this.props.notes},

            show_center_detail : true,
            show_postal_address : false,
            show_physical_address : false,
            show_contact_details : false,
            show_meetings_list : false,
            show_print : false
        };
        this.loadPostalAddress = this.loadPostalAddress.bind(this);
        this.loadPhysicalAddress = this.loadPhysicalAddress.bind(this);
        this.loadContactDetails = this.loadContactDetails.bind(this);
        this.loadCenterMeetings = this.loadCenterMeetings.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onClose = this.onClose.bind(this);
    };

    onClose(e){
        console.log('On Close');
        this.props.onClose(e);
    }
    onShow(e){
        switch(e.target.name){
            case 'center-detail' :
                this.setState({
                    show_center_detail : true,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_contact_details : false,
                    show_meetings_list : false,
                    show_print : false
                });break;

            case 'meetings' :
                this.setState({
                    show_center_detail : false,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_contact_details : false,
                    show_meetings_list : true,
                    show_print : false
                });break;
            case 'postal-address' :
                this.setState({
                    show_center_detail : false,
                    show_postal_address : true,
                    show_physical_address : false,
                    show_contact_details : false,
                    show_meetings_list : false,
                    show_print : false
                });break;
            case 'physical-address' :
                this.setState({
                    show_center_detail : false,
                    show_postal_address : false,
                    show_physical_address : true,
                    show_contact_details : false,
                    show_meetings_list : false,
                    show_print : false
                });break;
            case 'contact-details' :
                this.setState({
                    show_center_detail : false,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_contact_details : true,
                    show_meetings_list : false,
                    show_print : false
                });break;
            case 'print-details' :
                this.setState({
                    show_center_detail : false,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_contact_details : false,
                    show_meetings_list : false,
                    show_print : true
                });break;
            default:break;
        }
    }

    loadPostalAddress(e){
        let self = this;

        Axios.get(centers_routes.load_center_postal_address_url+ this.state.center_detail.center_id).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error fetching centers postal address")
            }
        }).then(function(data){
            self.setState({
                postal_address : data
            });
        }).catch(function(err){
            console.log(err.message)
        })

    }

    loadPhysicalAddress(e){
        let self = this;

        Axios.get(centers_routes.load_center_physical_address_url + this.state.center_detail.center_id).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error loading centres physical address");
            }
        }).then(function(data){
            self.setState({
                physical_address : data
            })
        }).catch(function(err){
            console.log(err.message);
        })

    }

    loadContactDetails(e){
        let self = this;

        Axios.get(centers_routes.load_centers_contact_details_url + this.state.center_detail.center_id).then(function(response){

            if (response.status === 200){
                return response.data
            }else{
                throw new  Error("Error loading centers contact details");
            }
        }).then(function(data){
            self.setState({
                contact_details : data
            })
        }).catch(function(err){
            console.log(err.message)
        })
    }

    loadCenterMeetings(e){
        console.log("loading center meetings")
    }

    componentWillMount(e){
        this.loadPostalAddress(e);
        this.loadPhysicalAddress(e);
        this.loadContactDetails(e);
    }


    render (){
        return (
            <div className="box box-body">
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className={'fa fa-building'}></i> Center Details</strong></h3>

                    <button className='btn btn-box-tool btn-outline-danger pull-right'  name={'close'} onClick={e => this.onClose(e)}><strong> <i className={'fa fa-close'}> </i> close</strong></button>
                    <button className='btn btn-box-tool btn-outline-dark pull-right'  name={'print-details'} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-print'}> </i> Print Details</strong></button>
                    <button className='btn btn-box-tool btn-outline-dark pull-right'  name={'contact-details'} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-mobile-phone'}> </i> Contact Details</strong></button>
                    <button className='btn btn-box-tool btn-outline-dark pull-right'  name={'physical-address'} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-map-marker'}> </i> Physical Addresses</strong></button>
                    <button className='btn btn-box-tool btn-outline-dark pull-right'  name={'center-detail'} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-user'}> </i> Center Details</strong></button>
                    <button className='btn btn-box-tool btn-outline-dark pull-right'  name={'postal-address'} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-envelope'}> </i> Postal Addresses</strong></button>
                    <button className='btn btn-box-tool btn-outline-dark pull-right'  name={'meetings'} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-bullhorn'}> </i> Meetings</strong></button>
                </div>

                {
                    (this.state.show_center_detail) ?
                        <DisplayCenterDetails
                            center_detail = {this.state.center_detail}
                        />
                    :""
                }
                {
                    (this.state.show_postal_address) ?
                        <Address.DisplayPostal
                            postal_address = {this.state.postal_address}
                        />
                    :""
                }
                {
                    (this.state.show_physical_address) ?
                        <Address.DisplayPhysical
                            physical_address = {this.state.physical_address}
                        />
                    :""
                }
                {
                    (this.state.show_contact_details) ?
                        <DisplayContactDetails
                            contact_details = {this.state.contact_details}
                        />
                    :""
                }
                {
                    (this.state.show_meetings_list)?
                        <DisplayMeetings
                            center_id = {this.state.center_detail.center_id}
                        />
                    :""
                }




            </div>
        )
    }
}


class UpdateCenterDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            center : {...this.props.center}
        };

        this.onChandeHandler = this.onChandeHandler.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    };


    onChandeHandler(e){
        let center = Object.assign({},this.state.center);
        switch(e.target.name){
            case "center_name" : center.center_name = e.target.value;break;
            default:break;
        }

        this.setState({
            center:center
        });

    }

    onUpdate(e){

        let center = this.state.center;
        console.log("calling on update");
        this.props.onUpdate(center);

    }

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title">Update Center</h3>
                </div>
                <form className="form-horizontal col-md-6">

                    <div className="form-group">
                        <label>Center Name </label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="center_name" value={this.state.center.center_name} onChange={e => this.onChandeHandler(e)} />
                        </div>
                    </div>
                    <div className={'form-group'}>
                        <button type="button" className="btn btn-info btn-outline-dark" onClick={e => this.onUpdate(e)}><strong>Update</strong></button>
                    </div>
                </form>

            </div>
        )
    }
}


class EditCenter extends Component{
    constructor(props){
        super(props);
        this.state = {
            center : {...this.props.center_detail},
            postal_address : {...postal_address_detail},
            physical_address : {...physical_address_details},
            contact_details : {...contact_details},

            load_center : true,
            load_postal: false,
            load_physical : false,
            load_contacts: false
        };

        this.loadPostalAddress = this.loadPostalAddress.bind(this);
        this.loadPhysicalAddress = this.loadPhysicalAddress.bind(this);
        this.loadContactDetails = this.loadContactDetails.bind(this);
        this.loadGroupsList = this.loadGroupsList.bind(this);
        this.onUpdateCenter = this.onUpdateCenter.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onPostalSaved = this.onPostalSaved.bind(this);
        this.onPhysicalSaved = this.onPhysicalSaved.bind(this);
        this.onContactSaved = this.onContactSaved.bind(this);
        this.onClose = this.onClose.bind(this);

    };

    onClose(e){
        this.setState({
            load_center: false,
            load_postal: false,
            load_physical: false,
            load_contacts: false
        });

        this.props.onClose(e);
    }

    loadPostalAddress(e){
        let self = this;

        Axios.get(centers_routes.load_center_postal_address_url+ this.state.center.center_id).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error fetching centers postal address")
            }
        }).then(function(data){
            self.setState({
                postal_address : data
            });
        }).catch(function(err){
            console.log(err.message)
        })

    }

    loadPhysicalAddress(e){
        let self = this;

        Axios.get(centers_routes.load_center_physical_address_url + this.state.center.center_id).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error loading centres physical address");
            }
        }).then(function(data){
            self.setState({
                physical_address : data
            })
        }).catch(function(err){
            console.log(err.message);
        })

    }

    loadContactDetails(e){
        let self = this;

        Axios.get(centers_routes.load_centers_contact_details_url + this.state.center.center_id).then(function(response){

            if (response.status === 200){
                return response.data
            }else{
                throw new  Error("Error loading centers contact details");
            }
        }).then(function(data){
            self.setState({
                contact_details : data
            })
        }).catch(function(err){
            console.log(err.message)
        })
    }

    loadGroupsList(e){

        let self = this;
        Axios.get(centers_routes.load_centers_groups_url + this.state.center.center_id).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error loading groups list")
            }
        }).then(function (data) {
            self.setState({
                groups_list : data
            })
        }).catch(function(err){
            console.log(err.message);
        })
    }


    onShow(e){
        
        switch (e.target.name) {
            case "details":
                this.setState({
                    load_center : true,
                    load_postal: false,
                    load_physical : false,
                    load_contacts: false
                });
                break;
            case "postal":
                this.loadPostalAddress(e);
                this.setState({
                    load_center : false,
                    load_postal: true,
                    load_physical : false,
                    load_contacts: false

                });break;
            case "physical":
                this.loadPhysicalAddress(e);
                this.setState({
                    load_center : false,
                    load_postal: false,
                    load_physical : true,
                    load_contacts: false
                });break;

            case "contact":
                this.loadContactDetails(e);
                this.setState({
                    load_center : false,
                    load_postal: false,
                    load_physical : false,
                    load_contacts: true
                });break;
            default:break;
        }
    }
    onPostalSaved(e){
        // this.setState({
        //     load_center : false,
        //     load_postal: false,
        //     load_physical : false,
        //     load_contacts: false
        // });
        this.loadPostalAddress(e);
        return true;
    };
    onPhysicalSaved(e){
        // this.setState({
        //     load_center : false,
        //     load_postal: false,
        //     load_physical : false,
        //     load_contacts: false
        //
        // });
        this.loadPhysicalAddress(e);
        return true;
    };
    onContactSaved(e){
        // this.setState({
        //     load_center : false,
        //     load_postal: false,
        //     load_physical : false,
        //     load_contacts: false
        // })
        this.loadContactDetails(e);
        return true;
    }
    onUpdateCenter(center){
        this.setState({
            center:center
        })
    };
    componentWillMount(e){

        this.loadPostalAddress(e);
        this.loadPhysicalAddress(e);
        this.loadContactDetails(e);
        this.loadGroupsList(e);
    }
    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <strong>Edit Center</strong> </h3>

                        <button type={'button'}
                            className='btn btn-box-tool btn-outline-danger pull-right'
                            onClick={e => this.onClose(e)}
                            >
                            <strong><i className='fa fa-close'> </i> Close
                            </strong>


                        </button>
                        <button className="btn btn-box-tool btn-outline-dark pull-right" name="contact" onClick={e => this.onShow(e)}><strong> <i className='fa fa-mobile-phone'> </i> Contact Details </strong></button>
                        <button className="btn btn-box-tool btn-outline-dark pull-right" name="physical" onClick={e => this.onShow(e)}><strong> <i className='fa fa-map-pin'> </i>  Physical Address </strong></button>
                        <button className="btn btn-box-tool btn-outline-dark pull-right" name="postal" onClick={e => this.onShow(e)}><strong> <i className='fa fa-envelope'> </i> Postal Address </strong></button>
                        <button className="btn btn-box-tool btn-outline-dark pull-right" name="details" onClick={e => this.onShow(e)}><strong> <i className='fa fa-building-o'> </i> Center  </strong></button>

                </div>
                {
                    (this.state.load_center) ?
                        <UpdateCenterDetails
                            center={this.state.center}
                            onUpdate={this.onUpdateCenter}

                        />
                    :""
                }
                {
                    (this.state.load_postal) ?
                        <Address.Postal
                            postal_id={this.state.center.center_id}
                            onPostalSaved={this.onPostalSaved}
                            postal_address={this.state.postal_address}
                        />
                        :""
                }
                {
                    (this.state.load_physical) ?
                        <Address.Physical
                            physical_id={this.state.center.center_id}
                            onPhysicalSaved={this.onPhysicalSaved}
                            physical_address={this.state.physical_address}
                        />:""
                }
                {
                    (this.state.load_contacts) ?
                        <ContactDetails
                            contact_id={this.state.center.center_id}
                            onContactSaved={this.onContactSaved}
                            contact_details={this.state.contact_details}
                        />:""
                }
            </div>
        )
    }
}


// rewrite center details to just show the details of the center

export class ShowCenterDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            center_detail : {...this.props.center},
            postal_address : {...postal_address_detail},
            physical_address : {...physical_address_details},
            contact_details : {...contact_details},
            meetings : {...meeting_details},
            notes: "",

            show_details : true,
            show_edit_center : false,
            show_meetings : false,
            show_reports_notes : false
            
        };

        this.onShow = this.onShow.bind(this);
        this.onClose = this.onClose.bind(this);
        this.loadMeetings = this.loadMeetings.bind(this);
        this.loadPostalAddress = this.loadPostalAddress.bind(this);
        this.loadPhysicalAddress = this.loadPhysicalAddress.bind(this);
        this.loadContactDetails = this.loadContactDetails.bind(this);
    };

    onClose(e){
        this.setState({
            show_details: false,
            show_edit_center: false,
            show_meetings: false,
            show_reports_notes: false

        })
    }

    loadMeetings(e){

        let self = this;

        Axios.get(centers_routes.load_meetings_url + self.state.center_detail.center_id).then(function (response) {
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error fetching meetings")
            }
        }).then(function(data){
            console.log("Meetings List loaded");
            console.log(data);
            self.setState({
                meetings : data
            })

        }).catch(function(err){
            console.log(err.message)
        })
    }

    loadPostalAddress(e){

        let self = this;
        let client_id = self.state.center_detail.center_id;
        console.log("My Client ID");
        console.log(client_id);

        Axios.get(centers_routes.load_postal_address_byid_url + client_id).then(function (response) {
            if (response.status === 200){
                return response.data
            }else{
                throw new  Error("Error loading postal addresses");
            }
        }).then(function (json_data) {
            self.setState({
                postal_address : json_data
            })
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            })
        })

    }

    loadPhysicalAddress(e){
        let self = this;
        let client_id = self.state.center_detail.center_id;
        console.log("My Client ID");
        console.log(client_id);

        Axios.get(centers_routes.load_physical_address_byid_url + client_id).then(function (response) {
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error loading physical addresses");
            }
        }).then(function (json_data) {
            self.setState({
                physical_address : json_data
            })
        }).catch(function(err){
            let message = err.message;

            self.setState({
                form_response : message
            })
        })
    }

    loadContactDetails(e){
        let self = this;
        let client_id = self.state.center_detail.center_id;
        console.log("My Client ID");
        console.log(client_id);

        Axios.get(centers_routes.load_contact_details_byid_url + client_id).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error loading contact details");
            }
        }).then(function (json_data) {
            self.setState({
                contact_details : json_data
            });
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            });
        })

    }

    onShow(e){
        switch(e.target.name){
        case "details" :
        this.setState({
            show_details: true,
            show_edit_center: false,
            show_meetings: false,
            show_reports_notes: false,
        });break;
        case "edit":
        this.setState({
            show_details: false,
            show_edit_center: true,
            show_meetings: false,
            show_reports_notes: false,
            }); break;

        case "meetings":
            this.setState({
                show_details: false,
                show_edit_center: false,
                show_meetings: true,
                show_reports_notes: false,
            }); break;

        case "reports":
            this.setState({
                show_details: false,
                show_edit_center: false,
                show_meetings: false,
                show_reports_notes: true,
            }); break;

        default : break;
        }
}

    componentWillMount(e){
        this.loadMeetings(e);
        this.loadPostalAddress(e);
        this.loadPhysicalAddress(e);
        this.loadContactDetails(e);
    }

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> Center Details </h3>

                        <button className="btn btn-box-tool btn-outline-dark pull-right" name="reports" onClick={e => this.onShow(e)}> <strong>Reports &amp; Notes</strong></button>
                        <button className="btn btn-box-tool btn-outline-dark pull-right" name="meetings" onClick={e => this.onShow(e)}> <strong>Meetings</strong></button>
                        <button className="btn btn-box-tool btn-outline-dark pull-right" name="edit" onClick={e => this.onShow(e)}> <strong>Edit Center</strong></button>
                        <button className="btn btn-box-tool btn-outline-dark pull-right" name="details" onClick={e => this.onShow(e)}> <strong>Center Details</strong></button>

                </div>

                {
                    (this.state.show_details) ?

                        <CenterDetails
                            center_detail = {this.state.center_detail}
                            postal_address = {this.state.postal_address}
                            physical_address = {this.state.physical_address}
                            contact_details = {this.state.contact_details}
                            meetings = {this.state.meetings}
                            notes = {this.state.notes}
                            onClose={this.onClose}
                        />
                    :""
                }
                {
                    (this.state.show_edit_center) ?
                    <EditCenter
                        center_detail={this.state.center_detail}
                        onClose={this.onClose}
                    />
                    :""
                }
                {
                    (this.state.show_meetings) ?
                        <Meetings
                            center_id={this.state.center_detail.center_id}
                            meetings_list = {this.state.meetings}
                            onClose={this.onClose}

                        />
                    :""
                }
            </div>
        )
    }
}


class CenterDetailsEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            center : {...center_details},
            center_name_error : '',
            form_response : ""
        };
        this.onHandleNameChange = this.onHandleNameChange.bind(this);
        this.createCenter = this.createCenter.bind(this);
        this.onCheckErrors = this.onCheckErrors.bind(this);
    };

    onHandleNameChange(e) {
        let center = Object.assign({}, this.state.center);
        center.center_name = e.target.value;
        console.log(" Prop cneter ID" + this.props.center_id);
        center.center_id = this.props.center_id;
        console.log(center);

        center.total_groups = 0;
        this.setState({ center : center,
                              center_name_error : '',
                              form_response : ''  })
    };

    createCenter(e){
        
        let center = this.state.center;
        
        this.props.onCreateCenter(center);

        console.log(center);
        this.setState({
            form_response : "center created"
        });
    }

    onCheckErrors(){
        let self = this;
        let isError = false;
        let center = Object.assign({},this.state.center);
        if (Utils.isEmpty(center.center_name)){
            this.setState({
                center_name_error : 'Center cannot be empty'
            });
            isError = true;
        }

        return isError
    }

    render(){
        return(

            <div className="box box-body">
                <form className="form-horizontal col-md-6">
                    <div className="form-group">
                        <label>Center Names</label>
                        <input type="text" className="form-control" name="center_name" value={this.state.center.center_name} onChange={e => this.onHandleNameChange(e)} />
                        {(this.state.center_name_error) ? <InlineError message={this.state.center_name_error}/> : ''}

                    </div>
                    <div className="form-group">

                            <button
                                type="button"
                                className="btn btn-success btn-outline-dark"
                                onClick={e => {
                                    if (this.onCheckErrors() === false){
                                        this.createCenter(e)
                                    }
                                }}
                            >
                                <strong> Create Center</strong>
                            </button>

                            <button
                                type={'button'}
                                className={'btn btn-warning btn-outline-dark'}
                                onClick={e => this.setState({
                                    center : {...center_details},
                                    center_name_error : '',
                                    form_response : ""

                                })}
                            ><strong> <i className={'fa fa-eraser'}> </i> Reset </strong>

                            </button>

                    </div>
                    {(this.state.form_response)? <InlineMessage message={this.state.form_response} message_type={'INFO'}/>:""}
                </form>
            </div>

        )
    }
}


export class CreateCenter extends Component {
    constructor(props){
        super(props);

        this.state = {

            center :{...center_details},
            
            form_response : "",

            enable_buttons : false,

            center_created : false, // please turn back to false
            show_center_details: true,
        };

        
        this.onCreateCenter = this.onCreateCenter.bind(this);
        this.fetchNewCenterID = this.fetchNewCenterID.bind(this);
        this.showCenterDetails = this.showCenterDetails.bind(this);
        this.onClose = this.onClose.bind(this);

    }

    fetchNewCenterID(){
        let self = this;

        Axios.get(centers_routes.new_center_id_url).then(function(response){
            if (response.status === 200){
                return response.data;
            }else{
                throw new Error("error fetching new center id");
            }
        }).then(function(data){
            let center = Object.assign({},this.state.center);
            center.center_id = data.center_id;
            self.setState({
                center : center,
                enable_buttons: true
            });
            // return true;
        }).catch(function(err){
            // return false;
            let message = err.message;
            self.setState({
                form_response : message
            });
        });
        //fetch new center id from backend
    };

    showCenterDetails(e){
        this.setState({
            show_center_details: true,
        });
    };

    onCreateCenter(center){

        let self = this;

        Axios.post(centers_routes.create_center_url,"&data="+JSON.stringify(center)).then(
            function(response){
                if (response.status === 200){
                    return response.data;
                }else{
                    throw new Error('Error creating center');
                }
                
        }).then(
            function(json_data)
                {

                    let message = json_data.message;
                    if (message.indexOf("Error") === -1){
                        self.setState({
                            center_created:true,
                            form_response : message
                        });

                    self.props.addCenter(center);                
                }
                else{
                    self.setState({
                        center_created:false,
                        form_response : message
                    });
                }

        }).catch(
            function(err){
                let message = err.message;
                self.setState({
                    center_created: false,
                    form_response: message
                });
            }
        );        
    };

    onClose(e){
        this.props.onClose(e);
    }

    componentWillMount(e){
        this.fetchNewCenterID(e);
    };

    render(){
        //TODO fetch center id from backend

        return (
            
            <div className="center-details">

                <div className="box box-body">
                    <div className="box box-header">
                        <h3 className="box-title"> Create Center</h3>
                            <button className="btn btn-box-tool btn-outline-danger pull-right" onClick={e => this.onClose(e)}  ><strong> <i className='fa fa-close'> </i> Close </strong></button>
                    </div>
                </div>
                {
                    (this.state.show_center_details) ?
                        <CenterDetailsEditor
                            center_id = {this.state.center.center_id}
                            onCreateCenter={this.onCreateCenter}
                        />
                    :""
                }
            </div>
        )
    }
}

export class Centers extends Component {
    constructor(){
        super();
        this.state = {
                centers_list : [],
                center: "",
                doListCenters  : false,
                doCreateCenter : false,  
                doShowCenterDetail : false,
                doEditCenter : false
        };
        this.ListCenters = this.ListCenters.bind(this);
        this.createCenter = this.createCenter.bind(this);
        this.addCenter = this.addCenter.bind(this);
        this.showCenterDetails = this.showCenterDetails.bind(this);
        this.loadCenters = this.loadCenters.bind(this);
        this.onCloseCenterDetail = this.onCloseCenterDetail.bind(this);
        this.editCenter = this.editCenter.bind(this);
        this.onClose = this.onClose.bind(this);

    };

    ListCenters(e){
        this.setState({
            doListCenters       : true,
            doCreateCenter      : false,
            doShowCenterDetail  : false,
            doEditCenter : false

        })
    };

    createCenter(e){
        this.setState({
            doCreateCenter: true,
            doListCenters: false,            
            doShowCenterDetail: false,
            doEditCenter : false
        })        
    };

    addCenter(center){
        let centers_list = [];
        let centers_state = Object.assign([],this.state.centers_list);
        this.state.centers_list.forEach((center) =>{
          console.log(center);
          centers_list.push(center);
          console.log(center.center_name)
        });
        centers_list.push(center);
        console.log(center.center_name);        
        centers_state = centers_list;

        this.setState({ centers_list: centers_state});

        //push center to the backend
    };

    onClose(e){
        this.setState({
            doListCenters: false,
            doCreateCenter: false,
            doShowCenterDetail: false,
            doEditCenter: false
        });
    }

    //enabling state to show center details
    showCenterDetails(center_id){
        let center = this.state.centers_list.find(center => center.center_id === center_id);
        this.setState({
            center : center,
            doShowCenterDetail : true,
            doListCenters: false,
            doCreateCenter: false,
        });
    };

    editCenter(center_id){
        let centers_list = Object.assign([],this.state.centers_list);
        let center_detail = centers_list.find(center => center.center_id === center_id);
        console.log(center_detail);
        console.log("Is this even being called");
        console.log(center_id);
        this.setState({
            center : center_detail
        });
        this.forceUpdate();


        this.setState({
            doListCenters       : false,
            doCreateCenter      : false,
            doShowCenterDetail  : false,
            doEditCenter : true
        });
    }

    onCloseCenterDetail(e){
        this.setState(
            {
                doShowCenterDetail : false,
                doListCenters: false,
                doCreateCenter: false,
                doEditCenter : false

            }
        )
    }

    loadCenters(){
        //fetch centers
        console.log("Loading centers : " +  centers_routes.center);
        let self = this;

        Axios.get(centers_routes.center).then(function(response) {
            if (response.status === 200){
                return response.data;
            }else{
                console.log("Throwing an Error");
                throw new Error(response.statusText);
            }
        }).then(function(response_centers_list) {

            self.setState({
                centers_list : response_centers_list,
                doListCenters : true,
                doCreateCenter: false,
                doShowCenterDetail: false
            });

            self.forceUpdate();

        }).catch(function(e){
            console.log("Error thrown : " + e.message);

            let centers_list = [{
                center_name: "Malamulele",
                center_id: "abcdefghijk123456",
                total_groups: 6
            },{
                center_name: "Tshakhuma",
                center_id: "abcdefghijsdsk123456",
                total_groups: 4

            }];

            self.setState({
                centers_list: centers_list,
                doListCenters: true,
                doCreateCenter: false,
                doShowCenterDetail: false
            });
            self.forceUpdate();
        });
        //store centers in

    }
    componentWillMount(e){
        this.loadCenters(e);
        // this.forceUpdate();
    }

    componentDidMount(e){
        // this.loadCenters(e);
    }
    render(){
    return (
            <div className="box box-footer">
                <div className="box box-header">
                    <h3 className="box-title"> <small><strong> <i className="fa fa-building-o"> </i> Centers</strong></small> </h3>
                                    
                    <button type="button" className="btn btn-box-tool pull-right" onClick={e => this.ListCenters(e)}><strong> <i className="fa fa-server"> </i> List Centers</strong></button>
                    <button type="button" className="btn btn-box-tool pull-right" onClick={e => this.createCenter(e)}><strong> <i className="fa fa-calendar-plus-o"> </i> Create Center</strong></button>            
                </div>
            {
                (this.state.doListCenters === true) ?
                <CentersList
                    centers_list ={this.state.centers_list}
                    showCenterDetail={this.showCenterDetails}
                    editCenter={this.editCenter}
                    onClose={this.onClose}
                    />
                : ""
            }
            {
                (this.state.doCreateCenter === true) ?
                <CreateCenter
                    centers_list={this.state.centers_list}
                    addCenter={this.addCenter}
                    onClose={this.onClose}
                /> : ""
            }
            {
                (this.state.doShowCenterDetail === true)?

                    <CenterDetails

                        center_detail={this.state.center}
                        onClose={this.onCloseCenterDetail}
                    />
                :""
            }
            {
                (this.state.doEditCenter)?
                <EditCenter
                    center_detail = {this.state.center}
                />
                :""
            }

            {
                (!this.state.doListCenters && !this.state.doCreateCenter && !this.state.doShowCenterDetail && 
                    !this.state.doEditCenter ) ?
                <div className="box box-footer">
                    <div className="box box-header">
                            <h3 className={'box-title'}> <strong> Centers Management Module </strong> </h3>
                    </div>

                    <blockquote>
                        <p>
                                This Module is used to manage centers, you can <em><strong>Create</strong></em>, <em><strong>Edit</strong></em>, <em><strong>Update</strong></em> and <em><strong>Print</strong></em> center details directly from this module
                        </p>

                    </blockquote>
                </div>
                :''
            }



            </div>
        )
}
}

export default Centers;


