
import React, { Component } from "react";
import "./Clients.css";
import Axios from "axios";
import * as Address from '../Addresses';
import * as centers_routes from '../../constants/centers-routes';
import * as Utils from '../../constants/utilities';

import ContactDetails, {DisplayContactDetails} from '../ContactDetails/ContactDetails';
import Banking,{DisplayBanking,banking_details} from "../Banking/Banking";
import postal_address_detail from '../Addresses/Postal/Postal';
import physical_address_details from '../Addresses/Physical/Physical';
import contact_details from '../ContactDetails/ContactDetails';
import InlineError from "../Forms/InlineError";
import InlineMessage from "../Forms/InlineMessage";
import BusinessEvaluation,{BusinessValuation} from '../Loans/BusinessEvaluation/BusinessEvaluation';



// const styles = theme => ({
//     root: {
//         width : '100%',
//         marginTop: theme.spacing.unit * 3,
//         overflowX: 'auto',

//     },
//     table: {
//         minWidth: 700,
//     },
// });

export let clients_details = {
    client_id : "",
    group_id : "",
    client_name : "",
    surname : "",
    id_number : "",
    gender : "",
    business_type: "",    
};


class DisplayClient extends Component{
    constructor(props){
        super(props);
        this.state = {

            client_details :clients_details,
            postal_address : postal_address_detail,
            physical_address :physical_address_details,
            contact_details : contact_details,
            banking_details : banking_details,

            show_client_details : true,
            show_postal_address : false,
            show_physical_address : false,
            show_contact_details : false,
            show_banking_details : false
        };
        this.setClientDetail = this.setClientDetail.bind(this);
        this.load_postal_address = this.load_postal_address.bind(this);
        this.load_physical_address = this.load_physical_address.bind(this);
        this.load_contact_details = this.load_contact_details.bind(this);
        this.load_banking_details = this.load_banking_details.bind(this);
        this.onShow = this.onShow.bind(this);
    };

    onShow(e){
        switch (e.target.name) {
            case "personal-details":
                this.setState({
                    show_client_details : true,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_contact_details : false,
                    show_banking_details : false
                });break;

            case "postal-address":
                this.setState({
                    show_client_details : false,
                    show_postal_address : true,
                    show_physical_address : false,
                    show_contact_details : false,
                    show_banking_details : false
                });break;

            case "physical-address":
                this.setState({
                    show_client_details : false,
                    show_postal_address : false,
                    show_physical_address : true,
                    show_contact_details : false,
                    show_banking_details : false
                });break;

            case "contact-details":
                this.setState({
                    show_client_details : false,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_contact_details : true,
                    show_banking_details : false
                });break;
            case "banking-details":
                this.setState({
                    show_client_details : false,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_contact_details : false,
                    show_banking_details : true
                });break;

            case "close":
                this.props.onCloseDisplay(e);break;
            default:break;
        }
    }

    setClientDetail(e){
        let client_details = Object.assign({},this.state.client_details);
        if (this.props.client_details !== undefined){
            client_details = this.props.client_details
        }
        this.setState({
            client_details : client_details
        });
    }

    load_postal_address(e){
        let self = this;
        let client_id = this.props.client_details.client_id;
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

    load_physical_address(e){
        let self = this;
        let client_id = this.props.client_details.client_id;
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

    load_contact_details(e){
        let self = this;
        let client_id = this.props.client_details.client_id;
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

    load_banking_details(e){
        let self = this;
        let client_id = this.props.client_details.client_id;

        Axios.get(centers_routes.load_banking_byid_url + client_id).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                let message = response.statusText;
                throw new Error(message)
            }
        }).then(function (json_data) {
            self.setState({
                banking_details : json_data
            })
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            });
        })
    }

    componentWillMount(e){

        this.setClientDetail(e);
        this.load_postal_address(e);
        this.load_physical_address(e);
        this.load_contact_details(e);
        this.load_banking_details(e);

    }


    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>

                    <h3 className={'box-title'}> <strong> 
                        <i className={'fa fa-user'}> </i> Client Details </strong>
                    
                    </h3>

                    <button className={'btn btn-box-tool btn-outline-danger pull-right'} name={'close'} onClick={e => this.onShow(e)}><strong><i className={'fa fa-close'}> </i> Close </strong></button>
                    <button className={'btn btn-box-tool btn-outline-dark pull-right'} name={'banking-details'} onClick={e => this.onShow(e)}><strong><i className={'fa fa-building'}> </i> Banking Details </strong></button>
                    <button className={'btn btn-box-tool btn-outline-dark pull-right'} name={'contact-details'} onClick={e => this.onShow(e)}><strong><i className={'fa fa-mobile-phone'}> </i> Contact Details  </strong></button>
                    <button className={'btn btn-box-tool btn-outline-dark pull-right'} name={'physical-address'} onClick={e => this.onShow(e)}><strong><i className={'fa fa-map'}> </i> Physical Address  </strong></button>
                    <button className={'btn btn-box-tool btn-outline-dark pull-right'} name={'postal-address'} onClick={e => this.onShow(e)}><strong><i className={'fa fa-envelope'}> </i> Postal Address  </strong></button>
                    <button className={'btn btn-box-tool btn-outline-dark pull-right'} name={'personal-details'} onClick={e => this.onShow(e)}><strong><i className={'fa fa-user'}> </i> Personal Details  </strong></button>
                </div>

                {
                    (this.state.show_client_details) ?
                        <div className={'box box-footer'}>
                            <div className={'box box-header'}>
                                <h3 className={'box-title'}> Personal Information</h3>
                            </div>

                            <ul className={'list-group'}>
                                <li className={'list-group-item'}><strong> Firstname : </strong> {this.state.client_details.client_name}</li>
                                <li className={'list-group-item'}><strong> Surname : </strong> {this.state.client_details.surname}</li>
                                <li className={'list-group-item'}><strong> ID Number : </strong> {this.state.client_details.id_number} </li>
                                <li className={'list-group-item'}><strong> Gender : </strong> {this.state.client_details.gender}</li>
                                <li className={'list-group-item'}><strong> Business Type : </strong> {this.state.client_details.business_type} </li>
                                <li className={'list-group-item'}><button className={'btn btn-success'}><strong> <i className={'fa fa-print'}> </i>  Print</strong></button> <button className={'btn btn-info'}><strong> <i className={'fa fa-edit'}> </i>  Edit</strong></button></li>
                            </ul>
                        </div>
                    :""

                }
                {
                    (this.state.show_postal_address) ?
                        <Address.DisplayPostal
                            postal_address = {this.state.postal_address}
                            postal_id = {this.state.client_details.client_id}
                        />
                    :""
                }
                {
                    (this.state.show_physical_address) ?
                        <Address.DisplayPhysical
                            physical_address = {this.state.physical_address}
                            physical_id={this.state.client_details.client_id}
                        />
                    :''
                }
                {
                    (this.state.show_contact_details) ?
                        <DisplayContactDetails
                            contact_details = {this.state.contact_details}
                        />
                        :""
                }
                {
                    (this.state.show_banking_details)?
                        <DisplayBanking
                            banking_details = {this.state.banking_details}
                        />
                    :""
                }
            </div>
        )
    }
}

class ClientDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            client_details : {...clients_details},

            client_name_error : '',
            surname_error : '',
            id_number_error : '',
            gender_error : '',
            business_type_error : '',


            group_list : [],
            form_response : "",
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.setClientDetail = this.setClientDetail.bind(this);
        this.onUpdateClientHandler = this.onUpdateClientHandler.bind(this);
        this.onCheckErrors = this.onCheckErrors.bind(this);
    };

    onCheckErrors(){
        let isError = false;
        let client_details = Object.assign({},this.state.client_details);

        if (Utils.isEmpty(client_details.client_name) === true){
            this.setState({
                client_name_error : 'Client Name field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(client_details.surname) === true){
            this.setState({
                surname_error : 'Surname field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isIDNumber(client_details.id_number) === false){
            this.setState({
                id_number_error : 'ID Number is not valid'
            });
            isError = true;
        }

        if (Utils.isEmpty(client_details.gender) === true){
            this.setState({
                gender_error : 'Please select gender'
            });
            isError = true;
        }

        if (Utils.isEmpty(client_details.business_type) === true){
            this.setState({
                business_type_error : 'Business Type field cannot be empty'
            });
            isError = true;
        }

        return isError;
    }

    onChangeHandler(e){
        let client_details = Object.assign({},this.state.client_details);

        switch (e.target.name) {
            case 'client_name' : client_details.client_name = e.target.value;break;
            case 'surname' : client_details.surname = e.target.value;break;
            case 'id_number' : client_details.id_number = e.target.value;break;
            case 'gender' : client_details.gender = e.target.value;break;
            case 'business_type' : client_details.business_type = e.target.value;break;
            default: break;
        };

        this.setState({
            client_details : client_details
        })
    }

    setClientDetail(e){
        let client_details = Object.assign({},this.state.client_details);
        if (this.props.client_details !== undefined){
            client_details = this.props.client_details
        }
        this.setState({
            client_details : client_details
        });
    }

    onUpdateClientHandler(e){
        let self = this;
        let client_details = Object.assign({},this.state.client_details);

        Axios.post(centers_routes.update_clients_url,'&data=' + JSON.stringify(client_details)).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new  Error('Error updating client details')
            }
        }).then(function(json_data){
            let message = json_data.message;
            self.setState({
                form_response : message
            })
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            })
        })
    }

    componentWillMount(e){
        this.setClientDetail(e);
    }

    render(){
        return(
             <form className="form-horizontal col-md-8">
                <div className="form-group">
                    <label><strong> <i className={'fa fa-user-secret'}> </i> Group ID</strong></label>
                    <div className="input-group">
                        <input type={'text'} className={'form-control'} name={'group_id'} value={this.state.client_details.group_id} readOnly={true} />
                    </div>
                </div>

                <div className="form-group">
                    <label> <strong> <i className={'fa fa-user-plus'}> </i> Client Name </strong></label>
                    <input type="text" className="form-control" name="client_name" value={this.state.client_details.client_name} onChange={e => this.onChangeHandler(e)}/>
                    {(this.state.client_name_error) ? <InlineError message={this.state.client_name_error}/> : ''}
                </div>

                <div className="form-group">
                    <label> <strong> <i className={'fa fa-user-md'}> </i> Surname </strong></label>
                    <input type="text" className="form-control" name="surname" value={this.state.client_details.surname} onChange={e => this.onChangeHandler(e)}/>
                    {(this.state.surname_error) ? <InlineError message={this.state.surname_error}/> : ''}
                </div>

                <div className="form-group">
                    <label>  <strong> <i className='fa fa-unlock-alt'> </i> ID Number </strong></label>
                    <input type="text" className="form-control" name="id_number" value={this.state.client_details.id_number} onChange={ e => this.onChangeHandler(e) }/>
                    {(this.state.id_number_error)? <InlineError message={this.state.id_number_error}/> : '' }
                </div>

                <div className="form-group">
                    <label> <strong> <i className={'fa fa-male'}> </i> Gender</strong></label>
                    <select name="gender" className="form-control" value={this.state.client_details.gender} onChange={e => this.onChangeHandler(e)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {(this.state.gender_error) ? <InlineError message={this.state.gender_error}/> : ''}
                </div>

                <div className="form-group">
                    <label> <strong> <i className={'fa fa-shopping-basket'}> </i> Business Type </strong></label>
                    <input type="text" name="business_type" className="form-control" value={this.state.client_details.business_type} onChange={ e => this.onChangeHandler(e)}/>
                    {(this.state.business_type_error)? <InlineError message={this.state.business_type_error}/> : '' }
                </div>

                <div className="form-group">

                        <button type="button" className="btn btn-success btn-outline-dark"
                            onClick={e =>
                                {
                                    if (this.onCheckErrors() === false){this.onUpdateClientHandler(e)}
                                }}
                        >
                            <strong> <i className={'fa fa-save'}> </i> Save Client Details</strong>
                        </button>
                        <button
                            type={'button'}
                            className={'btn btn-warning btn-outline-dark'}
                            onClick={e => this.setState({
                                client_details : {...clients_details},

                                client_name_error : '',
                                surname_error : '',
                                id_number_error : '',
                                gender_error : '',
                                business_type_error : '',

                                form_response: '',

                            })}>
                            <strong> <i className='fa fa-eraser'> </i> Reset </strong>

                        </button>

                </div>
                <div className={"form-group"}>
                    {(this.state.form_response) ? <InlineMessage message={this.state.form_response}/> : '' }
                </div>

            </form>

        )
    }
}

class EditClient extends Component{
    constructor(props){
        super(props);
        this.state = {
            client_detail : {...clients_details},
            postal_address : {...postal_address_detail},
            physical_address : {...physical_address_details},
            contact_details: {...contact_details},
            banking_details: {...banking_details},
            form_response : "",

            show_client_details : true,
            show_postal : false,
            show_physical : false,
            show_contacts : false,
            show_banking : false,
            show_business_evaluation : false,
            close : false


        };
        this.onShow = this.onShow.bind(this);
        this.onClose = this.onClose.bind(this);
        this.setClient = this.setClient.bind(this);
        this.loadPostalAddress = this.loadPostalAddress.bind(this);
        this.loadPhysicalAddress = this.loadPhysicalAddress.bind(this);
        this.loadContactDetails = this.loadContactDetails.bind(this);
        this.loadBankingDetails = this.loadBankingDetails.bind(this);
    };

    setClient(e){
        let client_details = Object.assign({},this.state.client_detail);
        if (this.props.client_details !== undefined){
            client_details = this.props.client_details
        }
        this.setState({
            client_detail : client_details
        });
    }

    onClose(e){
        this.props.onClose(e)
    }

    onShow(e){
        switch (e.target.name) {

            case 'client-detail' :
                this.setState({
                    show_client_details : true,
                    show_postal : false,
                    show_physical : false,
                    show_contacts : false,
                    show_banking : false,
                    show_business_evaluation : false,
                    close : false
                });break;

            case 'client-postal' :
                this.setState({
                    show_client_details : false,
                    show_postal : true,
                    show_physical : false,
                    show_contacts : false,
                    show_banking : false,
                    show_business_evaluation: false,
                    close : false
                });break;

            case 'client-contacts' :
                this.setState({
                    show_client_details : false,
                    show_postal : false,
                    show_physical : false,
                    show_contacts : true,
                    show_banking : false,
                    show_business_evaluation: false,
                    close : false
                });break;

            case 'client-physical' :
                this.setState({
                    show_client_details : false,
                    show_postal : false,
                    show_physical : true,
                    show_contacts : false,
                    show_banking : false,
                    show_business_evaluation: false,
                    close : false
                });break;

            case 'client-banking' :
                this.setState({
                    show_client_details : false,
                    show_postal : false,
                    show_physical : false,
                    show_contacts : false,
                    show_banking : true,
                    show_business_evaluation: false,
                    close : false
                });break;

            case 'business-evaluation':
                this.setState({
                    show_client_details: false,
                    show_postal: false,
                    show_physical: false,
                    show_contacts: false,
                    show_banking: false,
                    show_business_evaluation: true,
                    
                    close: false

                });break;

            default: break;

        }
    }

    loadPostalAddress(e){

        let self = this;
        let client_id = this.props.client_details.client_id;
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
        let client_id = this.props.client_details.client_id;
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
        let client_id = this.props.client_details.client_id;
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

    loadBankingDetails(e){
        let self = this;
        let client_id = this.props.client_details.client_id;

        Axios.get(centers_routes.load_banking_byid_url + client_id).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                let message = response.statusText;
                throw new Error(message)
            }
        }).then(function (json_data) {
            self.setState({
                banking_details : json_data
            })
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            });
        })
    }

    componentWillMount(e){
        this.setClient(e);
        this.loadPostalAddress(e);
        this.loadPhysicalAddress(e);
        this.loadContactDetails(e);
        this.loadBankingDetails(e);
    }

    render(){
        return(
            <div className={'box box-body'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}> <strong> <i className='fa fa-user-md'> </i> Edit Client </strong></h3>

                    <button type={'button'} className='btn btn-outline-danger btn-box-tool pull-right' name={'close'} onClick={e => this.onClose(e)}><strong> <i className={'fa fa-close'}> </i> Close</strong></button>
                    <button type={'button'} className='btn btn-outline-dark btn-box-tool pull-right' name={'business-evaluation'} onClick={e => this.onShow(e)}><strong> <i className='fa fa-shopping-basket'> </i> Business Evaluation</strong></button>
                    <button type={'button'} className='btn btn-outline-dark btn-box-tool pull-right' name={'client-banking'} onClick={e => this.onShow(e)}><strong> <i className='fa fa-bank'> </i> Banking Details</strong></button>
                    <button type={'button'} className='btn btn-outline-dark btn-box-tool pull-right' name={'client-contacts'} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-send'}> </i> Contact Details</strong></button>
                    <button type={'button'} className='btn btn-outline-dark btn-box-tool pull-right' name={'client-physical'} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-envelope'}> </i> Physical Address</strong></button>
                    <button type={'button'} className='btn btn-outline-dark btn-box-tool pull-right' name={'client-postal'} onClick={e => this.onShow(e)}><strong> <i className='fa fa-envelope-square'> </i> Postal Address</strong></button>
                    <button type={'button'} className='btn btn-outline-dark btn-box-tool pull-right' name={'client-detail'} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-user'}> </i> Client Details</strong></button>
                </div>
                <div className={"col-md-12"}>
                {
                    (this.state.show_client_details) ?
                        <ClientDetails
                            client_details = {this.state.client_detail}
                        />
                        :""
                }
                {
                    (this.state.show_postal) ?
                        <Address.Postal
                            postal_id = {this.state.client_detail.client_id}
                            postal_address = {this.state.postal_address}
                        />
                    :""
                }
                {
                    (this.state.show_physical) ?
                        <Address.Physical
                            physical_id = {this.state.client_detail.client_id}
                            physical_address = {this.state.physical_address}
                        />
                    :""
                }
                {
                    (this.state.show_contacts)?
                        <ContactDetails
                            contact_id={this.state.client_detail.client_id}
                            contact_details = {this.state.contact_details}
                        />
                    :""
                }
                {
                    (this.state.show_banking) ?
                        <Banking
                            banking_id={this.state.client_detail.client_id}
                            banking_details = {this.state.banking_details}
                        />
                    :""
                }

                {
                        (this.state.show_business_evaluation)?
                            <BusinessValuation />
                        :''
                }

                </div>
            </div>
        )
    }
}

class ClientItem extends  Component{
    constructor(props){
        super(props);
        this.state = {
            client_detail : {...clients_details}
        };

        this.onOpen = this.onOpen.bind(this);
        this.onDisplay = this.onDisplay.bind(this);

    };

    onOpen(client_id){

        this.props.onOpenClient(client_id);
    }

    onDisplay(client_id){

        this.props.onDisplayClient(client_id);

    }

    componentWillMount(e){
        let client_detail = Object.assign({},this.state.client_detail);
        if (this.props.client_detail !== undefined){
            client_detail = this.props.client_detail
        }

        this.setState({
            client_detail : client_detail
        });
    }
    render(){
        return(
            <tr>
                <td
                        onClick={e => {
                        let client_id = this.state.client_detail.client_id;
                        return(
                            this.onDisplay(client_id)
                        )

                }}
                >
                    <button type={"button"} className={'btn btn-outline-success'}><strong>
                    {this.state.client_detail.client_name}
                    </strong></button>
                </td>
                <td>{this.state.client_detail.surname}</td>
                <td>{this.state.client_detail.gender}</td>
                <td>{this.state.client_detail.id_number}</td>
                <td>{this.state.client_detail.business_type}</td>
                <td>{this.state.client_detail.group_id}</td>
                <td><button type={'button'} className={'btn btn-warning'}

                    onClick={e => {
                        let client_id = this.state.client_detail.client_id;
                        return(
                            this.onOpen(client_id)
                        )
                    }}

                ><strong> <i className={'fa fa-edit'}> </i> Edit </strong></button></td>
            </tr>
        )
    }
}

class ClientsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            clients_list :[],
            client : {...clients_details},
            show_client : false
        };

        this.onOpenClient = this.onOpenClient.bind(this);
        this.onDisplayClient = this.onDisplayClient.bind(this);
        this.assignProps = this.assignProps.bind(this);
    }



    onOpenClient(client_id){

        this.props.doShowClient(client_id);
    }
    onDisplayClient(client_id){
        this.props.doDisplayClient(client_id);
    }


    assignProps(e){
        let clients_list = Object.assign([], this.state.clients_list);
        console.log("CLIENTS LIST");
        console.log(clients_list);

        if ((this.props.clients_list !== undefined)) {
            clients_list = this.props.clients_list
        }
        console.log("CLIENTS LIST");
        console.log(clients_list);
        this.setState({ clients_list: clients_list });
    }

    componentWillMount(e){
        this.assignProps(e);
    }

    render(){

        return (

            <div className="clients-list">
                <div className="box box-header">
                    <h3 className="box-title"> <strong> <i className={'fa fa-users'}> </i> Clients List</strong></h3>


                        <button type={"button"} className="btn btn-box-tool btn-outline-danger pull-right" onClick={e => {
                            this.props.onShow(e);
                            return(true)
                        }}> <strong> <i className="fa fa-close"> </i> Close </strong> </button>

                </div>
                <table className="table table-responsive box box-info">
                    <thead>
                        <tr>
                            <td><small><em><i className='fa fa-user'> </i> Names</em></small></td>
                            <td><small><em> <i className='fa fa-user'> </i> Surname</em></small></td>
                            <td><small><em><i className='fa fa-male'> </i> Gender</em></small></td>
                            <td><small><em><i className='fa fa-code'> </i> ID</em></small></td>
                            <td><small><em><i className='fa fa-building'> </i> Business Type</em></small></td>
                            <td><small><em><i className='fa fa-users'> </i> Group</em></small></td>
                            <td><small><em><i className='fa fa-caret-up'> </i> Action</em></small></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.clients_list.map(client => {
                                return(
                                        <ClientItem
                                            client_detail = {client}
                                            onOpenClient = {this.onOpenClient}
                                            onDisplayClient = {this.onDisplayClient}
                                            key={client.client_id}
                                        />
                                    )
                            })

                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><small><em><i className='fa fa-user'> </i> Names</em></small></td>
                            <td><small><em> <i className='fa fa-user'> </i> Surname</em></small></td>
                            <td><small><em><i className='fa fa-male'> </i> Gender</em></small></td>
                            <td><small><em><i className='fa fa-code'> </i> ID</em></small></td>
                            <td><small><em><i className='fa fa-building'> </i> Business Type</em></small></td>
                            <td><small><em><i className='fa fa-users'> </i> Group</em></small></td>
                            <td><small><em><i className='fa fa-caret-up'> </i> Action</em></small></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
                                           
        )

    }


}

class AddClients extends  Component{
    constructor(props){
        super(props);
        this.state = {
            group_id : "",
            client_details : {...clients_details},

            client_name_error : '',
            surname_error : '',
            id_number_error : '',
            gender_error : '',
            business_type_error : '',



            group_list : [],
            clients_list : [],
            show_clients_list : false,
            form_response  : ""
        };
        this.onSelectGroupHandler = this.onSelectGroupHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSaveClientHandler = this.onSaveClientHandler.bind(this);
        this.loadAllGroups = this.loadAllGroups.bind(this);
        this.loadClientsFromGroupID = this.loadClientsFromGroupID.bind(this);
        this.ClientListShowed = this.ClientListShowed.bind(this);
        this.onCheckErrors =this.onCheckErrors.bind(this);
    };



    onCheckErrors(){
        let isError = false;
        let client_details = Object.assign({},this.state.client_details);

        if (Utils.isEmpty(client_details.client_name) === true){
            this.setState({
                client_name_error : 'Client Name field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(client_details.surname) === true){
            this.setState({
                surname_error : 'Surname field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isIDNumber(client_details.id_number) === false){
            this.setState({
                id_number_error : 'ID Number is not valid'
            });
            isError = true;
        }

        if (Utils.isEmpty(client_details.gender) === true){
            this.setState({
                gender_error : 'Please select gender'
            });
            isError = true;
        }

        if (Utils.isEmpty(client_details.business_type) === true){
            this.setState({
                business_type_error : 'Business Type field cannot be empty'
            });
            isError = true;
        }

        return isError;
    }

    ClientListShowed(e){
        this.setState({
            show_clients_list:false
        })
    }

    loadClientsFromGroupID(group_id){
        let self = this;

        Axios.get(centers_routes.load_clients_by_group_id_url + group_id).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error loading clients from group");
            }
        }).then(function(json_data){
            let clients_list = Object.assign([],self.state.clients_list);
            clients_list = json_data;
            console.log("LOAD CLIENTS FROM GROUP ID ");
            console.dir(clients_list);
            self.setState({
                clients_list : clients_list,
                show_clients_list : true
            });
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            });
        });
    }
    onSelectGroupHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        });

        let group_id = e.target.value;
        this.loadClientsFromGroupID(group_id);
    }

    onChangeHandler(e){

        let client_details = Object.assign({},this.state.client_details);
        
        switch (e.target.name) {
            case "group_id" : client_details.group_id = e.target.value;break;
            case "client_name" : client_details.client_name = e.target.value;break;
            case "surname" : client_details.surname = e.target.value;break;
            case "id_number" : client_details.id_number = e.target.value;break;
            case "gender" : client_details.gender = e.target.value;break;
            case "business_type" : client_details.business_type = e.target.value;break;
            default:break;
        }

        this.setState({
            client_details : client_details,

            client_name_error : '',
            surname_error : '',
            id_number_error : '',
            gender_error : '',
            business_type_error : '',

            form_response: '',

        });
    }
    onSaveClientHandler(e){
        let self = this;

        let client_details = Object.assign({},this.state.client_details);
        client_details.group_id = this.state.group_id;

        if (this.state.group_id !== ""){

        Axios.post(centers_routes.save_clients_url,'&data=' + JSON.stringify(client_details)).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error saving client details");
            }
        }).then(function(json_data){
            let message = json_data.message;
            self.setState({
                form_response : message
            })
        }).catch(function(err){
            let message= "";
            try{
                message =  err.message;
            }catch (e) {
                message = "Error saving client details"
            }


            self.setState({
                form_response : message
            });
        });}
        else{
            alert("Please Select Home Group for client")
        }
    };

    loadAllGroups(e){

        let self = this;
        //load_all_groups_url
        Axios.get(centers_routes.load_all_groups_url).then(function (response) {
            if (response.status === 200){
                return response.data;
            }else{
                throw new Error("Error loading all groups");
            }
        }).then(function(json_data){
            let group_list = Object.assign([],self.state.group_list);
            group_list = json_data;
            self.setState({
                group_list : group_list
            });

        }).catch(function(err){
            // console.log(err);
        });

    }

    componentWillMount(e){
        this.loadAllGroups(e);

    }

    render(){
        return(
            <div className="box box-body row">
                <div className="box box-header">
                    <h3 className={"box-title"}> <strong> <i className={'fa fa-user-plus'}> </i> Add Client </strong></h3>

                    <button className='btn btn-box-tool btn-outline-danger pull-right' type={'button'} onClick={e => this.props.onClose(e)}> <strong> <i className={'fa fa-close'}> </i> Close </strong>  </button>
                </div>

                <form className="form-horizontal col-md-4">
                    <div className="form-group">
                        <label>Select Group</label>

                        <select name="group_id" className="form-control" value={this.state.group_id} onChange={e => this.onSelectGroupHandler(e)}>
                            {
                                this.state.group_list.map( group_detail => {
                                    return(
                                        <option value={group_detail.group_id} key={group_detail.group_id}>{group_detail.group_name}</option>
                                    )
                                })
                            }
                        </select>

                    </div>

                    <div className="form-group">
                        <label> <strong> <i className={'fa fa-user-plus'}> </i> Client Name </strong></label>
                        <input type="text" className="form-control" name="client_name" value={this.state.client_details.client_name} onChange={e => this.onChangeHandler(e)}/>
                        {(this.state.client_name_error) ? <InlineError message={this.state.client_name_error}/> : ''}

                    </div>

                    <div className="form-group">
                        <label> <strong> <i className={'fa fa-user-md'}> </i> Surname </strong></label>
                        <input type="text" className="form-control" name="surname" value={this.state.client_details.surname} onChange={e => this.onChangeHandler(e)}/>
                        {(this.state.surname_error) ? <InlineError message={this.state.surname_error}/> : ''}

                    </div>

                    <div className="form-group">
                        <label>  <strong> <i className='fa fa-unlock-alt'> </i> ID Number </strong></label>
                        <input type="text" className="form-control" name="id_number" value={this.state.client_details.id_number} onChange={ e => this.onChangeHandler(e) }/>
                        {(this.state.id_number_error)? <InlineError message={this.state.id_number_error}/> : '' }
                    </div>

                    <div className="form-group">
                        <label> <strong> <i className={'fa fa-male'}> </i> Gender</strong></label>
                        <select name="gender" className="form-control" value={this.state.client_details.gender} onChange={e => this.onChangeHandler(e)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {(this.state.gender_error) ? <InlineError message={this.state.gender_error}/> : ''}
                    </div>

                    <div className="form-group">
                        <label> <strong> <i className={'fa fa-shopping-basket'}> </i> Business Type </strong></label>
                        <input type="text" name="business_type" className="form-control" value={this.state.client_details.business_type} onChange={ e => this.onChangeHandler(e)}/>
                        {(this.state.business_type_error)? <InlineError message={this.state.business_type_error}/> : '' }
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <button type="button" className="btn btn-success btn-outline-dark"
                                    onClick={e =>{
                                        if (this.onCheckErrors() === false){
                                            this.onSaveClientHandler(e)
                                        }}
                                    }>
                                <strong>Save Client Details</strong>
                            </button>
                            <button
                                type={'button'}
                                className={'btn btn-warning btn-outline-dark'}
                                onClick={e => this.setState({
                                    client_details : {...clients_details},

                                    client_name_error : '',
                                    surname_error : '',
                                    id_number_error : '',
                                    gender_error : '',
                                    business_type_error : '',

                                    form_response: '',


                                })}
                            >
                                <strong> <i className={'fa fa-eraser'}> </i> Reset </strong>


                            </button>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        {(this.state.form_response) ? <InlineMessage message={this.state.form_response} message_type={'INFO'}/> : '' }
                    </div>

                </form>

                <div className={"box box-body col-md-8"}>
                    <div className={"box box-header"}>
                        <h3 className={"box-title"}> Present Clients </h3>
                    </div>
                    {
                        (this.state.show_clients_list) ?
                            <ClientsList
                                clients_list = {this.state.clients_list}
                                onShow={this.ClientListShowed}

                            />
                        :""
                    }
                </div>
            </div>

        )
    }
}

class Clients extends Component{
    constructor(){
        super();
        this.state = {
            client_details : {...clients_details},
            clients_list : [],


            list_client_details : false,
            create_client : false,
            show_client : false,
            display_client : false
        };
        this.listClientDetails = this.listClientDetails.bind(this);
        this.createClientDetails = this.createClientDetails.bind(this);
        this.loadClientList = this.loadClientList.bind(this);
        this.ClientListShowed = this.ClientListShowed.bind(this);
        this.doShowClient = this.doShowClient.bind(this);
        this.onClose = this.onClose.bind(this);
        this.doDisplayClient = this.doDisplayClient.bind(this);
        this.onCloseDisplay = this.onCloseDisplay.bind(this);
    }

    onCloseDisplay(e){
        this.setState({
            show_client: false,
            list_client_details : false,
            create_client : false,
            display_client : false

        })

    }

    onClose(e) {
        this.setState({
            list_client_details: false,
            create_client: false,
            show_client: false,
            display_client : false

        })
    }

    doShowClient(client_id){

        console.log("Opening Client with ID : " + client_id);

        let client = this.state.clients_list.find(client => client.client_id === client_id);
        console.log(client);
        this.setState({
            client_details : client,
            show_client: true,
            list_client_details : false,
            create_client : false,
            display_client : false
        })

    }

    doDisplayClient(client_id){
        console.log("Displaying client");
        console.log(client_id);
        let client = this.state.clients_list.find(client => client.client_id === client_id);
        console.log(client);
        this.setState({
            client_details : client,
            show_client: false,
            list_client_details : false,
            create_client : false,
            display_client : true
        })



    }

    ClientListShowed(e){
        this.setState({
            list_client_details : false,
            show_client: false,
            create_client : false,
            display_client : false

        })
    }

    listClientDetails(e){
        //  this.loadClientList(e);

        this.setState({
            list_client_details : true,
            show_client: false,
            create_client : false,
            display_client : false
        });
    }

    createClientDetails(e){
        this.setState({
            list_client_details : false,
            show_client: false,
            create_client : true,
            display_client : false
        })
    }



    loadClientList(e){
        let self = this;

        Axios.get(centers_routes.load_all_clients_url).then(function(response){
            if (response.status === 200){
                return response.data
            }
        }).then(function(json_data){
            console.log("LOADING CLIENT LISTS : ");


            let clients_list = Object.assign([],self.state.clients_list);
            console.log("We are not getting here");
            clients_list = json_data;
            console.log(clients_list);
            self.setState({clients_list : clients_list});
        }).catch(function(err){
            // let message = err.message;
            // console.log(message);
        })
    }

    componentWillMount(e){
        this.loadClientList(e);
    }

    render(){
        return(
                <div className="row">
                            <div className="box box-header">
                                <h3 className="box-title"> <strong> <i className="fa fa-user"> </i> Client Details </strong></h3>


                                <button type="button" className="btn btn-box-tool btn-outline-dark pull-right" onClick={e => this.createClientDetails(e)}><strong> <i className="fa fa-user-plus"> </i> Create Client Details</strong></button>
                                <button type="button" className="btn btn-box-tool btn-outline-dark pull-right" onClick={e => this.listClientDetails(e)}><strong> <i className="fa fa-server"> </i> List Client Details</strong></button>
                            </div>

                    {
                        (this.state.create_client) ?
                            <AddClients
                            onClose ={this.onClose}
                            />
                    : ""

                    }
                    {
                        (this.state.list_client_details) ?
                            <ClientsList
                                clients_list={this.state.clients_list}
                                onShow = {this.ClientListShowed}
                                doShowClient = {this.doShowClient}
                                doDisplayClient = {this.doDisplayClient}
                            />
                        :""
                    }

                    {
                        (this.state.show_client) ?
                            <EditClient
                                client_details = {this.state.client_details}
                                onClose = {this.onClose}
                            />
                        :""
                    }
                    {
                        (this.state.display_client)?
                            <DisplayClient
                                client_details = {this.state.client_details}
                                onCloseDisplay={this.onCloseDisplay}
                            />
                        :""
                    }

                    {
                        !(this.state.create_client || this.state.list_client_details || this.state.show_client || this.state.display_client)?
                            <div className={"box box-body"}>
                                <div className={"box box-header"}>
                                <h3 className={"box-title"}> <strong> <i className={'fa fa-user'}> </i> Client Management System</strong></h3>
                                </div>
                                <div className={"box box-footer"}>
                                    This module allows you to manage your clients, add or remove them from groups
                                    add personally identifiable information for each client of get ready groups.
                                </div>
                            </div>
                        :""
                    }
            </div>

        )
    }
}


export default Clients;