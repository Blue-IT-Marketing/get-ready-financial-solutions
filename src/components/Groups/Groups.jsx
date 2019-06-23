
import React, { Component } from "react";

import "./Groups.css";
import Intro from "../Intro/Intro";
import Axios from "axios";
import * as Utils from '../../constants/utilities';
import * as Address from '../Addresses/index';
import ContactDetails from '../ContactDetails/ContactDetails';
import Meetings, {DisplayMeetings} from '../Meetings/Meetings';

import * as centers_routes from '../../constants/centers-routes';
import {banking_details, DisplayBanking} from "../Banking/Banking";
import InlineError from "../Forms/InlineError";
import InlineMessage from "../Forms/InlineMessage";
import RepaymentsSchedules from "../Loans/RepaymentsSchedules/RepaymentsSchedules";
import FollowUp from "../Loans/FollowUp/FollowUp";
import PPI from "../Loans/PPI/PPI";
import GroupLoans from "../Loans/GroupLoans/GroupLoans";


export let group_details =
    {
        center_id : "",
        group_id : "",
        group_name : "",
        total_members : "",
        group_number : "",
        application_date: "",
        disbursement_date: ""

    };

let account_details =
    {
        group_id : "",
        account_holder : "",
        account_number: "",
        bank_name : "",
        account_type : "",
        branch_name : "",
        branch_code : ""
    };

class GroupPrint extends Component{
    constructor(props){
        super(props);
        this.state = {
            group_detail : {...group_details},
            banking_details : {...banking_details},

            show_print_group_details : true,
            show_print_account_details : false,
            show_print_meetings : false

        };
        this.onShow = this.onShow.bind(this);
        this.onClose = this.onClose.bind(this);
        this.setGroupDetail = this.setGroupDetail.bind(this);
        this.loadBankingDetails = this.loadBankingDetails.bind(this);
    };

    onShow(e){

        switch(e.target.name){

            case 'print_group_details' :
                this.setState({
                    show_print_group_details : true,
                    show_print_financials : false,
                    show_print_account_details : false,
                    show_print_meetings : false


                });break;
            case 'print_financials':
                this.setState({
                    show_print_group_details : false,
                    show_print_financials : true,
                    show_print_account_details : false,
                    show_print_meetings : false

                });break;

            case 'print_account_details' :
                this.setState({
                    show_print_group_details : false,
                    show_print_financials : false,
                    show_print_account_details : true,
                    show_print_meetings : false

                });break;

            case 'print_meetings':
                this.setState({
                    show_print_group_details : false,
                    show_print_financials : false,
                    show_print_account_details : false,
                    show_print_meetings : true

                });break;
            default:break;
        }

    }

    onClose(e){

        this.props.onClosePrint(e);

    }

    setGroupDetail(e){
        let group_detail = Object.assign({},this.state.group_detail);
        if (this.props.group_detail !== undefined){
            group_detail = this.props.group_detail
        }

        this.setState({
            group_detail : group_detail
        })
    }

    loadBankingDetails(e){
        let self = this;

        Axios.get(centers_routes.load_account_details_url + self.props.group_detail.group_id).then(function (response) {
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error fetching group account details")
            }
        }).then(function(json_data){
            let account_details = Object.assign({},self.state.account_details);
            account_details = json_data;
            self.setState({
                banking_details : account_details
            });
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            })
        })


    }

    componentWillMount(e){

        this.setGroupDetail(e);
        this.loadBankingDetails(e);

    }

    render(){
        return(
            <div className={"box box-body"}>
                <div className={"box box-header"}>
                    <h3 className={"box-title"}> Print Group Details</h3>
                                        
                    <button type={'button'} className={'btn btn-box-tool btn-outline-dark pull-right'} name={'print_group_details'} onClick={e => this.onShow(e)}> <strong> <i className='fa fa-print'> </i>  Group Details </strong></button>
                    <button type={'button'} className={'btn btn-box-tool btn-outline-dark pull-right'} name={'print_account_details'} onClick={e => this.onShow(e)}> <strong> <i className='fa fa-print'> </i>  Account Details </strong></button>
                    <button type={'button'} className={'btn btn-box-tool btn-outline-dark pull-right'} name={'print_account_details'} onClick={e => this.onClose(e)}> <strong> <i className='fa fa-close'> </i>  Close </strong></button>
                </div>

                {
                    (this.state.show_print_group_details) ?
                        <div className={'box box-body'}>
                            <div className={'box box-header'}>
                                <h3 className={'box-title'}> <strong> Group Details</strong></h3>
                            </div>

                            <ul className={'list-group'}>
                                <li className={'list-group-item'}> <strong> Group Number : </strong> <em> {this.state.group_detail.group_number }</em></li>
                                <li className={'list-group-item'}> <strong> Group Name : </strong> <em> {this.state.group_detail.group_name }</em></li>
                                <li className={'list-group-item'}> <strong> Total Members : </strong> <em> {this.state.group_detail.total_members }</em></li>
                                <li className={'list-group-item'}> <strong> Application Date : </strong> <em> {this.state.group_detail.application_date }</em></li>
                                <li className={'list-group-item'}> <strong> Disbursement Date : </strong> <em> {this.state.group_detail.disbursement_date }</em></li>
                                <li className={'list-group-item'}><button className={'btn btn-success'}><strong><i className={'fa fa-print'}> </i> Print </strong></button> <button className={'btn btn-info'}><strong><i className={'fa fa-edit'}> </i> Edit </strong></button></li>

                            </ul>

                        </div>
                    :""
                }
                {
                    (this.state.show_print_account_details) ?
                        <DisplayBanking
                            banking_details = {this.state.banking_details}

                        />
                    :''
                }

            </div>
        )
    }
}

class GroupBankAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
            account_details : {...account_details},


            account_holder_error : '',
            account_number_error : '',
            bank_name_error : '',
            account_type_error : '',
            branch_name_error : '',
            branch_code_error : '',


            form_response : ''
        };
        this.onSaveAccountDetails = this.onSaveAccountDetails.bind(this);
        this.setAccountDetails = this.setAccountDetails.bind(this);
        this.onCheckErrors = this.onCheckErrors.bind(this);
    };


    onCheckErrors(){

        let isError = false;

        if (Utils.isEmpty(this.state.account_details.account_holder) === true){
            this.setState({
                account_holder_error : 'Account Holder field cannot be empty'
            });

            isError = true;
        }

        if (Utils.isEmpty(this.state.account_details.account_number) === true){
            this.setState({
                account_number_error : 'Account Number field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(this.state.account_details.bank_name) === true){
            this.setState({
                bank_name_error : 'Please Select Bank'
            });
            isError = true;
        }

        if (Utils.isEmpty(this.state.account_details.account_type) === true){
            this.setState({
                account_type_error : "Please select account type"
            });
            isError = true;
        }

        if (Utils.isEmpty(this.state.account_details.branch_name) === true){
            this.setState({
                branch_name_error : "Branch Name field cannot be empty"
            });

            isError = true;
        }

        if (Utils.isEmpty(this.state.account_details.branch_code) === true){
            this.setState({
                branch_code_error : 'Branch Code field cannot be empty'
            });
            isError = true;
        }


        this.forceUpdate();

        return isError;

    }

    setAccountDetails(e){
        let account_details = Object.assign({},this.state.account_details);
        if (this.props.account_details !== undefined){
            account_details = this.props.account_details;
        }

        this.setState({
            account_details : account_details
        });
    }

    onChangeHandler(e){
        let account_details = Object.assign({},this.state.account_details);
        account_details.group_id = this.props.group_id;

        switch(e.target.name){
            case 'account_holder': account_details.account_holder = e.target.value;break;
            case 'account_number': account_details.account_number = e.target.value;break;
            case 'bank_name': account_details.bank_name = e.target.value;break;
            case 'account_type': account_details.account_type = e.target.value;break;
            case 'branch_name': account_details.branch_name = e.target.value;break;
            case 'branch_code': account_details.branch_code = e.target.value;break;
            default:break;
        }

        this.setState({
            account_details : account_details,

            account_holder_error : '',
            account_number_error : '',
            bank_name_error : '',
            account_type_error : '',
            branch_name_error : '',
            branch_code_error : '',

            form_response : ''
        });
    }

    onSaveAccountDetails(e){
        let self = this;
        let account_details = Object.assign({},this.state.account_details);

        Axios.post(centers_routes.save_account_details_url,'&data=' + JSON.stringify(account_details)).then(function(response){
            if(response.status === 200){
                return response.data
            }else{
                throw new Error("Save account details error")
            }
        }).then(function (json_data) {
            let message = json_data.message;
            self.setState({
                form_response : message
            })
        }).catch(function (err) {
            let message = err.message;
            self.setState({
                form_response : message
            });
        });
    };

    componentWillMount(e){
        this.setAccountDetails(e);
    }

    render(){
        return (
            <div className={"box box-body"}>
                <div className={"box box-header"}>
                    <h3 className={"box-title"}> Bank Account</h3>
                </div>

                <div className={"box box-footer"}>
                    <form className={"form-horizontal col-md-6"}>
                        <div className={"form-group"}>
                            <label> <strong> <i className={'fa fa-user'}> </i> Account Holder </strong></label>
                            <input type={"text"} className={"form-control"} value={this.state.account_details.account_holder || 'Account Holder' } name={'account_holder'} onChange={e => this.onChangeHandler(e)} />
                            {(this.state.account_holder_error)? <InlineError message={this.state.account_holder_error}/> :''}
                        </div>

                        <div className={"form-group"}>
                            <label> <strong> <i className='fa fa-credit-card-alt'> </i> Account Number </strong></label>
                            <input type={"text"} className={"form-control"} value={this.state.account_details.account_number || 'Account Number' } name={'account_number'} onChange={e => this.onChangeHandler(e)}  />
                            {(this.state.account_number_error)? <InlineError message={this.state.account_number_error}/> : '' }
                        </div>

                        <div className={"form-group"}>
                            <label> <strong> <i className={'fa fa-bank'}> </i> Bank Name </strong></label>
                            <select className={"form-control"} value={this.state.account_details.bank_name || 'fnb'} name={'bank_name'}  onChange={e => this.onChangeHandler(e)} >
                                <option value={'absa'}>ABSA</option>
                                <option value={'fnb'}>FNB</option>
                                <option value={'standard bank'}>Standard Bank</option>
                                <option value={'post bank'}>Post Bank</option>
                                <option value={'ned bank'}>Ned Bank</option>
                            </select>
                            {(this.state.bank_name_error)? <InlineError message={this.state.bank_name_error} /> : ''}
                        </div>

                        <div className={"form-group"}>
                            <label> <strong> <i className={'fa fa-cc-mastercard'}> </i> Account Type </strong></label>
                            <select className={'form-control'} value={this.state.account_details.account_type || 'savings'} name={'account_type'}  onChange={e => this.onChangeHandler(e)} >
                                <option value={'savings'}>Savings</option>
                                <option value={'cheque'}>Cheque</option>
                                <option value={'transmission'}>Transmission</option>
                            </select>
                            {(this.state.account_type_error)? <InlineError message={this.state.account_type_error} />: ''}
                        </div>

                        <div className={"form-group"}>
                            <label> <strong> <i className={'fa fa-building-o'}> </i> Branch Name</strong></label>
                            <input type={"text"} className={"form-control"} value={this.state.account_details.branch_name || ' '} name={'branch_name'} onChange={e => this.onChangeHandler(e)}  />
                            {(this.state.branch_name_error) ? <InlineError message={this.state.branch_name_error} />: '' }

                        </div>

                        <div className={"form-group"}>
                            <label><strong> <i className={'fa fa-file-code-o'}> </i> Branch Code</strong></label>
                            <input type={"text"} className={"form-control"} value={this.state.account_details.branch_code || ' '} name={'branch_code'} onChange={e => this.onChangeHandler(e)}  />
                            {(this.state.branch_code_error)? <InlineError message={this.state.branch_code_error} /> : ''}
                        </div>

                        <div className={"form-group"}>
                            <div className={"input-group"}>
                                <button type={'button'} className={"btn btn-primary  btn-outline-dark"}
                                        onClick={e =>{
                                            if (this.onCheckErrors() === false) {this.onSaveAccountDetails(e) }

                                        }

                                        }
                                >
                                    <strong> <i className={"fa fa-save"}> </i> Save Account Details</strong>
                                </button>
                                <button
                                type={'button'}
                                className={'btn btn-warning btn-outline-dark'}

                                onClick={e => this.setState({
                                    account_details : {...account_details},

                                    account_holder_error : '',
                                    account_number_error : '',
                                    bank_name_error : '',
                                    account_type_error : '',
                                    branch_name_error : '',
                                    branch_code_error : '',


                                    form_response : ''
                                })}
                                >
                                    <strong> <i className={'fa fa-eraser'}> </i> Reset </strong>

                                </button>
                            </div>
                        </div>
                        <div className={"form-group"}>
                            {(this.state.form_response)? <InlineMessage message={this.state.form_response} message_type={'INFO'}/>:''}
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

class EditGroup extends Component{
    constructor(props){
        super(props);
        this.state = {
            group_detail : {...group_details},

            group_name_error : '',
            total_members_error : '',
            group_number_error : '',
            application_date_error : '',
            disbursement_date_error : '',


            account_details : {...account_details},
            form_response : "",

            show_account_details : false,
            show_group_details : true,
            show_repayments_schedules : false,
            show_follow_up : false,
            show_ppi : false,
            show_group_loans : false,

        };
        this.onSaveGroupDetails = this.onSaveGroupDetails.bind(this);
        this.loadAccountDetails = this.loadAccountDetails.bind(this);
        this.setGroupDetails = this.setGroupDetails.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSubClose  = this.onSubClose.bind(this);
        this.doCheckErrors = this.doCheckErrors.bind(this);

    };


    doCheckErrors(){

        let isError = false;
        let group_detail = Object.assign({},this.state.group_detail);

        if (Utils.isEmpty(group_detail.group_name) === true){
            this.setState({
                group_name_error : 'Group Name field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isNumber(group_detail.total_members) === false){
            this.setState({
                total_members_error : 'Total Members field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isNumber(group_detail.group_number) === false){
            this.setState({
                group_number_error : 'Group Number field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(group_detail.application_date) === true){
            this.setState({
                application_date_error : 'Application date field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(group_detail.disbursement_date) === true){
            this.setState({
                disbursement_date_error : 'Disbursement date field cannot be empty'
            });
            isError = true;
        }

        return isError

    }

    onClose(e){
        this.props.onClose();

    }

    onSubClose(e){
                this.setState({
                    show_account_details : true,
                    show_group_details : false,
                    show_repayments_schedules : false,
                    show_follow_up : false,
                    show_ppi : false,
                    show_group_loans : false,

                });
    }
    onShow(e){
        switch (e.target.name) {
            case "account-details" :
                this.setState({
                    show_account_details : true,
                    show_group_details : false,
                    show_repayments_schedules : false,
                    show_follow_up : false,
                    show_ppi : false,
                    show_group_loans : false,

                });break;

            case "group-details":
                this.setState({
                    show_account_details : false,
                    show_group_details : true,
                    show_repayments_schedules : false,
                    show_follow_up : false,
                    show_ppi : false,
                    show_group_loans : false,

                });break;

            case 'repayments-schedules':
                this.setState({
                    show_account_details : false,
                    show_group_details : false,
                    show_repayments_schedules : true,
                    show_follow_up : false,
                    show_ppi : false,
                    show_group_loans : false,
                });break;

            case 'follow-up':
                this.setState({
                    show_account_details : false,
                    show_group_details : false,
                    show_repayments_schedules : false,
                    show_follow_up : true,
                    show_ppi : false,
                    show_group_loans : false,
                });break;

            case 'ppi':
                this.setState({
                    show_account_details : false,
                    show_group_details : false,
                    show_repayments_schedules : false,
                    show_follow_up : false,
                    show_ppi : true,
                    show_group_loans : false,
                });break;

            case 'group-loans':
                this.setState({
                    show_account_details : false,
                    show_group_details : false,
                    show_repayments_schedules : false,
                    show_follow_up : false,
                    show_ppi : false,
                    show_group_loans : true,
                });break;

            default:break;

        }
    }

    loadAccountDetails(e){
        let self = this;

        Axios.get(centers_routes.load_account_details_url + self.props.group_detail.group_id).then(function (response) {
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error fetching group account details")
            }
        }).then(function(json_data){
            let account_details = Object.assign({},self.state.account_details);
            account_details = json_data;
            self.setState({
                account_details : account_details
            });
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            })
        })


    }

    setGroupDetails(e){

        let group_detail = Object.assign({},this.state.group_detail);
        if (this.props.group_detail !== undefined){
            group_detail = this.props.group_detail
        }

        this.setState({
            group_detail : group_detail
        });
    };

    onSaveGroupDetails(e){
        let self = this;

        Axios.post(centers_routes.save_group_details_url,"&data=" + JSON.stringify(this.state.group_detail)).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error Saving group details");
            }
        }).then(function(json_data){
            let message = json_data.message;
            self.setState({
                form_response : message
            });
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            });
        })

    };

    onChangeHandler(e){
        let group_details = Object.assign({},this.state.group_detail);

        switch(e.target.name){
            case 'group_name' : group_details.group_name = e.target.value; break;
            case 'total_members' : group_details.total_members = parseInt(e.target.value);break;
            case 'group_number' : group_details.group_number = parseInt(e.target.value);break;
            case 'application_date' : group_details.application_date = e.target.value;break;
            case 'disbursement_date' : group_details.disbursement_date = e.target.value;break;
            default: break;
        }

        this.setState({
            group_detail:group_details
        })
    }

    componentWillMount(e){
        this.setGroupDetails(e);
        setInterval(this.loadAccountDetails(e),300);
    }

    render(){
        return(
            <div className={"box box-body"}>
                <div className={"box box-header"}>

                    <h3 className={"box-title"}> <strong> <i className={"fa fa-edit"}> </i> Edit Group </strong></h3>

                    <button type={"button"} className={"btn btn-box-tool btn-outline-danger pull-right"} name={"close"} onClick={e => this.onClose(e)}><strong> <i className={"fa fa-close"}> </i> Close </strong></button>
                    <button type={'button'} className={'btn btn-box-tool btn-outline-dark pull-right'} name={'repayments-schedules'} onClick={e => this.onShow(e)} > <strong> <i className={'fa fa-money'}> </i> Repayments </strong> </button>
                    <button type={'button'} className={'btn btn-box-tool btn-outline-dark pull-right'} name={'follow-up'} onClick={e => this.onShow(e)} > <strong> <i className={'fa fa-user-plus'}> </i> Follow Up </strong> </button>
                    <button type={'button'} className={'btn btn-box-tool btn-outline-dark pull-right'} name={'group-loans'} onClick={e => this.onShow(e)} > <strong> <i className={'fa fa-user-plus'}> </i> Group Loans </strong> </button>
                    <button  type={"button"} className={"btn btn-box-tool btn-outline-dark pull-right"} name={"account-details"}  onClick={e => this.onShow(e)}> <strong> <i className="fa fa-bank"> </i> Group Account </strong></button>
                    <button  type={"button"} className={"btn btn-box-tool btn-outline-dark pull-right"} name={"group-details"}  onClick={e => this.onShow(e)}> <strong> <i className="fa fa-info-circle"> </i> Group Details </strong></button>

                </div>
                {
                    (this.state.show_group_details) ?

                    <form className={"form-horizontal col-md-6"}>
                    <div className={"box box-header"}>
                        <h3 className={"box-title"}> Group Details</h3>
                    </div>

                    <div className={"form-group"}>
                        <label> <strong> <i className='fa fa-users'> </i> Group Name </strong> </label>

                        <input type={"text"} className={"form-control"} value={this.state.group_detail.group_name} onChange={e => this.onChangeHandler(e)} />
                        {(this.state.group_name_error) ? <InlineError message={this.state.group_name_error} /> : '' }

                    </div>

                    <div className={"form-group"}>
                        <label> <strong> <i className='fa fa-plus-circle'> </i> Total Members </strong></label>
                        <input type={"text"} className={"form-control"} value={this.state.group_detail.total_members} onChange={e => this.onChangeHandler(e)} />
                        {(this.state.total_members_error) ? <InlineError message={this.state.total_members_error}/> : '' }
                    </div>

                    <div className={"form-group"}>
                        <label> <strong> <i className={'fa fa-neuter'}> </i> Group Number </strong></label>
                        <input type={"text"} className={"form-control"} value={this.state.group_detail.group_number}  onChange={e => this.onChangeHandler(e)}/>
                        {(this.state.group_number_error) ? <InlineError message={this.state.group_number_error} /> : '' }
                    </div>

                    <div className={"form-group"}>
                        <label> <strong> <i className={'fa fa-calendar-check-o'}> </i>  Application Date </strong></label>
                        <input type={"date"} className={"form-control"} value={this.state.group_detail.application_date} onChange={e => this.onChangeHandler(e)}/>
                        {(this.state.application_date_error) ? <InlineError message={this.state.application_date_error}/> : ''}
                    </div>

                    <div className={"form-group"}>
                        <label> <strong> <i className={'fa fa-calendar-plus-o'}> </i> Disbursement Date </strong></label>
                        <input type={"date"} className={"form-control"} value={this.state.group_detail.disbursement_date} onChange={e => this.onChangeHandler(e)}/>
                        {(this.state.disbursement_date_error) ? <InlineError message={this.state.disbursement_date_error}/> : '' }
                    </div>

                    <div className={"form-group"}>
                        <div className={"input-group"}>
                            <button type={"button"} className={"btn btn-primary btn-outline-dark"}
                                    onClick={e => {
                                    if (this.doCheckErrors() === false){ this.onSaveGroupDetails(e) }
                                    }}>
                            <strong> <i className={"fa fa-save"}> </i> Update Group Details </strong>
                            </button>

                            <button
                                type={'button'} className={'btn btn-warning btn-outline-dark'}
                                onClick={e => this.setState({
                                    group_detail : {...group_details},

                                    group_name_error : '',
                                    total_members_error : '',
                                    group_number_error : '',
                                    application_date_error : '',
                                    disbursement_date_error : '',
                                    form_response : "",
                                })}>

                                <strong> <i className={'fa fa-eraser'}> </i> Reset </strong>
                            </button>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <span>{this.state.form_response}</span>
                    </div>
                </form>
                    :""
                }
                {
                    (this.state.show_account_details) ?
                        <GroupBankAccount
                          account_details = {this.state.account_details}
                          group_id = {this.state.group_detail.group_id}
                        />
                    :""
                }

                {
                    (this.state.show_repayments_schedules) ? <RepaymentsSchedules onClose={this.onSubClose}/> : ''
                }

                {
                    (this.state.show_follow_up) ? <FollowUp onClose={this.onSubClose} /> : ''
                }

                {
                    (this.state.show_group_loans) ? <GroupLoans onClose={this.onSubClose} group_detail={this.state.group_detail}/> : ''
                }
            </div>
        )
    }
}

class DisplayGroup extends Component{
    constructor(props){
        super(props);
        this.state = {
            group_detail : {...group_details},
            show_group_print : true,
        };
    };
    componentWillMount(e){
        let group_detail = Object.assign({},this.state.group_detail);
        let props_group_detail = this.props.group_detail;
        if (props_group_detail !== undefined){
            group_detail = props_group_detail
        }
        this.setState({
            group_detail : group_detail
        });
    }

    render(){
        return(
            <div>
                    {
                        (this.state.show_group_print) ?
                            <GroupPrint
                                group_detail = {this.state.group_detail}
                                onClosePrint={this.props.onClosePrint}
                            />
                        :""

                    }
            </div>
        )
    }
}

class GroupItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            item : ""
        };

        this.onGroupClicked = this.onGroupClicked.bind(this);
        this.onEdit = this.onEdit.bind(this);

    };

    onEdit(e){
        let group_item = Object.assign({},this.state.item);
        this.props.onGroupEdit(group_item);

    }

    onGroupClicked(group_id){
        console.log("You Clicked : + " + group_id);
        //send the click to the component that called this component so that it can decide what to do with the click
        this.props.onGroupClicked(group_id);
    }
    componentWillMount(e){
        let group_item = this.props.group_item;
        this.setState({
            item : group_item
        });
    }

    render(){

        return(
                <tr>
                    <td><small>{ this.state.item.group_number}</small></td>
                    <td

                    onClick={ e => {
                        let group_id = this.state.item.group_id;

                        return(
                            this.onGroupClicked(group_id)
                        )
                    }}
                    >
                        <small>
                            <button type={"button"} className={"btn btn-outline-success"}>
                                <strong>{ this.state.item.group_name}</strong>
                            </button>
                        </small>

                    </td>
                    <td><small>{ this.state.item.total_members}</small></td>
                    <td><small>{ this.state.item.application_date}</small></td>
                    <td><small>{ this.state.item.disbursement_date}</small></td>
                    <td>
                        <button className={'btn btn-box-tool btn-warning'} title={'Edit group'} onClick={e => this.onEdit(e)}><strong><i className={'fa fa-edit'}> </i> Edit </strong></button>

                    </td>
                </tr>
        )
    }
}

class GroupListItems extends Component{
    constructor(props){
        super(props);
        this.state = {
            center_id : "",
            group_list:[],
            groups_loaded : false
        };
        this.loadGroups = this.loadGroups.bind(this);
    };


    loadGroups(e){
        let prop_group_list = this.props.group_list;
        let group_list = Object.assign({},this.state.group_list);
        group_list = prop_group_list;
        console.log("LOOK HERE : " );
        console.dir(group_list);

        if (group_list === undefined){
            group_list = []
        }

        this.setState({
            group_list : group_list,
            groups_loaded : true,
            center_id : this.props.center_id
        });
    }


    componentWillMount(e){
        this.loadGroups(e);
    }
    render(){
        console.log("Group List Item Component");


        return(
            <div className={"box box-body"}>
                <div className={"box box-header"}>
                    <h3 className={"box-title"}> <strong> <i className={'fa fa-server'}> </i> Group List </strong></h3>

                        <button type={"button"} className={"btn btn-outline-danger btn-box-tool pull-right"} onClick={e =>
                        this.props.onClose(e)
                        }> <strong> <i className={"fa fa-close"}> </i> Close </strong></button>

                </div>
                <table className={"table table-responsive box box-info"}>
                    <thead>
                        <tr>
                            <td><em><strong><small>Group Number</small></strong></em></td>
                            <td><em><strong><small>Group Name</small></strong></em></td>
                            <td><em><strong><small>Total Members</small></strong></em></td>
                            <td><em><strong><small>Application Date</small></strong></em></td>
                            <td><em><strong><small>Disbursement Date</small></strong></em></td>
                            <td><em><strong><small>Action</small></strong></em></td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (this.state.groups_loaded === true)?
                                this.state.group_list.map( group_item => {
                                    return(
                                        <GroupItem
                                            group_item = {group_item}
                                            key = {group_item.group_id}
                                            onGroupClicked = {this.props.onGroupClicked}
                                            onGroupEdit={this.props.onGroupEdit}
                                        />
                                    )
                                })
                            :
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><em><small>Group Number</small></em></td>
                            <td><em><small>Group Name</small></em></td>
                            <td><em><small>Total Members</small></em></td>
                            <td><em><small>Application Date</small></em></td>
                            <td><em><small>Disbursement Date</small></em></td>
                            <td><em><strong><small>Action</small></strong></em></td>
                        </tr>
                    </tfoot>

                </table>
            </div>
        )}


}

class GroupList extends Component{
    constructor(props){
        super(props);
        this.state = {
            center_id : "",
            centers_list :[],
            group_list : [],
            group_detail : {...group_details},
            display_group : false,
            groups_loaded : false,


        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.loadGroups = this.loadGroups.bind(this);
        this.onGroupClicked = this.onGroupClicked.bind(this);
        this.loadGroupByID = this.loadGroupByID.bind(this);
        this.onCloseGroup = this.onCloseGroup.bind(this);
        this.onGroupEdit = this.onGroupEdit.bind(this);
        this.ClosePrint = this.ClosePrint.bind(this);
    };

    onCloseGroup(e){
        this.setState({
            display_group : false,
            groups_loaded : false,

        })
    }

    ClosePrint(e){
        this.setState({
            display_group : false,
            groups_loaded : true,
        })
    }

    onChangeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        });
        let center_id = e.target.value;
        this.loadGroups(center_id);


    }

    loadGroups(center_id){
        let self = this;

        let group_list = Object.assign({},this.state.group_list);

        Axios.get(centers_routes.load_centers_groups_url + center_id).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error fetching group list")
            }
        }).then(function(json_data){
            console.log("Returned GROUP LIST : " );
            console.dir(json_data);
            group_list = json_data;
            self.setState({
                group_list : group_list,
                groups_loaded : true
            });

        }).then(function(err){
            console.log("Error Occured ");
            console.log(err);
        });
    }

    loadGroupByID(group_id){
        let self = this;

        Axios.get(centers_routes.load_group_byid_url + group_id).then(function (response) {
            if (response.status === 200){
                return response.data
            }else{
                return {}
            }
        }).then(function (json_data) {
            self.setState({
                group_detail : json_data,
                display_group : true,
            });
        }).catch(function (err) {
            console.log(err);
        })

    }

    onGroupEdit(group_item){
        console.log("On group Edit");
        let group_detail = Object.assign({},this.state.group_detail);
        group_detail = group_item;
        this.props.onGroupEdit(group_detail);
    }
    onGroupClicked(group_id){
        console.log("Super on Group Clicked : " + group_id );
        this.loadGroupByID(group_id);
        //
        // this.setState({
        //     group_detail : group_detail,
        //     display_group : true,
        // });

    }

    componentWillMount(e){
        let centers_list = Object.assign([],this.state.centers_list);

        centers_list = this.props.centers_list;

        this.setState({
            centers_list : centers_list
        });

    }

    render(){

        return(
            <div className={"box box-body"}>
                {
                    (this.state.groups_loaded === true)?
                        (this.state.display_group)?
                            <DisplayGroup
                                group_detail = {this.state.group_detail}
                                onClosePrint = {this.ClosePrint}
                            />
                        :

                        <GroupListItems
                            center_id = {this.state.center_id}
                            group_list = {this.state.group_list}
                            onGroupClicked = {this.onGroupClicked}
                            onGroupEdit={this.onGroupEdit}
                            onClose = {this.onCloseGroup}

                        />
                    :
                        <div className={'row'}>
                        <form className={"form-horizontal col-md-6"}>
                            <div className={"form-group"}>
                                <label>Select Center</label>
                                <div className={"input-group"}>

                                    <select name={"center_id"} className={"form-control"}  value={this.state.center_id} onChange={e => this.onChangeHandler(e)} >
                                        {
                                            this.state.centers_list.map((center,index) => {
                                                if (index === 0){
                                                return(

                                                    <option value={center.center_id} key={center.center_id}>{center.center_name}</option>
                                                )}
                                                else{
                                                    return(
                                                        <option value={center.center_id} key={center.center_id}>{center.center_name}</option>
                                                    )
                                                }
                                            })
                                        }
                                    </select>

                                </div>
                            </div>
                        </form>
                        </div>

                }

            </div>
        )}

}

class GroupDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            group_detail : {...group_details},

            group_name_error : '',
            center_error : '',
            application_date_error : '',
            disbursement_date_error : '',


            group_list : [],
            groups_loaded : false,
            centers_list : this.props.centers_list,
            form_response : ""
        };

        this.onGroupDetailChange = this.onGroupDetailChange.bind(this);
        this.centerChangeHandler = this.centerChangeHandler.bind(this);
        this.onAddNewGroup = this.onAddNewGroup.bind(this);
        this.loadGroups = this.loadGroups.bind(this);
        this.onCloseGroup = this.onCloseGroup.bind(this);
        this.onGroupClicked = this.onGroupClicked.bind(this);
        this.onGroupEdit = this.onGroupEdit.bind(this);

        this.doCheckErrors = this.doCheckErrors.bind(this);

    };

    doCheckErrors(){

        let isError = false;
        let group_detail = Object.assign({},this.state.group_detail);

        if (Utils.isEmpty(group_detail.group_name) === true){
            this.setState({
                group_name_error : 'Group Name field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(group_detail.center_id) === true){
            this.setState({
                center_error : 'Please Select the center to add group to'
            });
            isError = true;
        }

        if (Utils.isEmpty(group_detail.application_date) === true){
            this.setState({
                application_date_error: 'Application date field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(group_detail.disbursement_date) === true){
            this.setState({
                disbursement_date_error : 'Disbursement date field cannot be empty'
            });
            isError = true;
        }


        return isError;


    };

    onCloseGroup(e){
        this.setState({
            groups_loaded : false
        });

    }
    onAddNewGroup(e){
        console.log("Adding new group : " + this.state.group_detail.group_name);

        let self = this;

        if (this.state.group_detail.center_id !== "") {


            Axios.post(centers_routes.add_group_details_url, '&data=' + JSON.stringify(this.state.group_detail)).then(function (response) {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error("Error add new group");
                }
            }).then(function (json_data) {
                let message = json_data.message;
                self.setState({
                    form_response: message
                });
            }).catch(function (err) {
                let message = err.message;
                self.setState({
                    form_response: message
                });
            })
        }else{
            self.setState({
                form_response : "Please select the center to add the group to"
            })
        }
    }

    onGroupDetailChange(e){
        let group_detail = Object.assign({},this.state.group_detail);

        switch (e.target.name) {

            case "group_name" : group_detail.group_name = e.target.value;break;
            case "application_date" : group_detail.application_date = e.target.value;break;
            case "disbursement_date" : group_detail.disbursement_date = e.target.value;break;
            default:break;
        }
        this.setState({
            group_detail: group_detail
        })

    }

    onGroupEdit(group_item){
        console.log(group_item);

    }

    centerChangeHandler(e){
        let group_detail = Object.assign({},this.state.group_detail);
        group_detail.center_id = e.target.value;
        this.setState({
            group_detail : group_detail,

        });
        let center_id = e.target.value;
        this.loadGroups(center_id);

        this.render();
    }

    onGroupClicked(group_id){
        console.log("Group Clicked but do nothing or show an alert : " + group_id);
        alert("You clicked group : " + group_id);
    }
  loadGroups(center_id){
        let self = this;

        let group_list = Object.assign({},this.state.group_list);

        Axios.get(centers_routes.load_centers_groups_url + center_id).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error fetching group list")
            }
        }).then(function(json_data){
            console.log("Returned GROUP LIST : " );
            console.dir(json_data);
            group_list = json_data;
            self.setState({
                group_list : group_list,
                groups_loaded : true
            });

        }).then(function(err){
            console.log("Error Occured " + err.message);
        })
    }


    componentWillReceiveProps(e){
        let centers_list = Object.assign([],this.state.centers_list);
        let group_detail = Object.assign([],this.state.group_detail);
        let prop_group_detail = this.props.group_detail;
        let prop_centers_list = this.props.centers_list;
        if (prop_centers_list !== undefined){
            centers_list = prop_centers_list
        }

        if (prop_group_detail !== undefined){
            group_detail = prop_group_detail
        }

        this.setState({
            centers_list : centers_list,
            group_detail : group_detail
        });
    }



    render(){

        console.log(this.state.centers_list);

        // to prevent an error when calling groups
        if (this.state.group_detail === undefined){
            this.setState({
                group_detail : group_details
            })
        }

        return(
            <div className={"box box-body row"}>
                <div className={"box box-header"}>
                    <h3 className={"box-title"}> <strong> <i className={'fa fa-user-plus'}> </i> Create Groups </strong></h3>
                </div>
                <div className={"box box-body col-md-4"}>
                <form className={"form-horizontal"}>
                    <div className={"box box-header"}>
                        <h3 className={"box-title"}><strong> Add Groups </strong></h3>
                    </div>
                    <div className={"form-group"}>
                        <label><strong> <i className={'fa fa-server'}> </i> Select Center</strong></label>

                        <select name={"center_id"} className={"form-control"}  value={this.state.group_detail.center_id} onChange={e => this.centerChangeHandler(e)} >
                                {
                                    this.state.centers_list.map(center => {
                                        return(
                                            <option
                                                value={center.center_id}
                                                key={center.center_id}>{center.center_name}</option>
                                        )
                                    })
                                }
                        </select>
                        {(this.state.center_error) ? <InlineError message={this.state.center_error}/> : ''}

                    </div>

                    <div className={"form-group"}>
                        <label> <strong> <i className='fa fa-users'> </i> Group Name </strong> </label>
                        <input type={"text"} className={"form-control"} name={"group_name"} value={this.state.group_detail.group_name}  onChange={e => this.onGroupDetailChange(e)}/>
                        {(this.state.group_name_error) ? <InlineError message={this.state.group_name_error}/> : ''}
                    </div>

                    <div className={"form-group"}>
                        <label> <strong> <i className={'fa fa-calendar-check-o'}> </i>  Application Date </strong> </label>
                        <input type={"date"} className={"form-control"} name={"application_date"} value={this.state.group_detail.application_date} onChange={e => this.onGroupDetailChange(e)}/>
                        {(this.state.application_date_error) ? <InlineError message={this.state.application_date_error}/> : ''}

                    </div>

                    <div className={"form-group"}>
                        <label> <strong> <i className={'fa fa-calendar-plus-o'}> </i> Disbursement Date </strong></label>
                        <input type={"date"} className={"form-control"} name={"disbursement_date"} value={this.state.group_detail.disbursement_date} onChange={e => this.onGroupDetailChange(e)}/>
                        {(this.state.disbursement_date_error) ? <InlineError message={this.state.disbursement_date_error}/> : ''}
                    </div>

                    <div className={"form-group"}>
                        <div className={"input-group"}>
                            <button type={"button"} className={'btn btn-success btn-outline-dark '}
                                onClick={e => {
                                  if (this.doCheckErrors() === false){ this.onAddNewGroup(e)}
                                }}
                            ><strong> <i className={'fa fa-save'}> </i> Add New Group </strong>
                            </button>

                            <button type={'button'} className={'btn btn-warning btn-outline-dark'}
                                    onClick={e => this.setState({
                                        group_detail : {...group_details},

                                        group_name_error : '',
                                        center_error : '',
                                        application_date_error : '',
                                        disbursement_date_error : '',
                                        form_response : ""
                                    })}
                            >
                                <strong> <i className='fa fa-eraser'> </i> Reset </strong>
                            </button>

                        </div>
                    </div>
                    <div className={"form-group"}>
                        {(this.state.form_response) ? <InlineMessage message={this.state.form_response} message_type={"INFO"} /> : ''}
                    </div>

                </form>
                </div>
                <div className={"box box-body col-md-8"}>
                    <div className={"box box-header"}>
                        <h3 className={"box-title"}><strong> Present Groups </strong></h3>
                    </div>

                    {
                        (this.state.groups_loaded === true) ?
                            <GroupListItems
                                center_id = {this.state.group_detail.center_id}
                                group_list = {this.state.group_list}
                                onGroupClicked = {this.onGroupClicked}
                                onGroupEdit={this.onGroupEdit}
                                onClose = {this.onCloseGroup}
                            />
                        :""
                    }

                </div>

            </div>
        )
    }
}

class Groups extends Component{

    constructor(){
        super();
        this.state ={
                centers_list : [],
                centers_loaded : false,
                group_details_list: [],
                group_detail : {...group_details},

                list_groups : false,
                create_group : false,
                edit_group : false,
                group_meetings : false,

            };

        this.onShow = this.onShow.bind(this);
        this.loadCenters = this.loadCenters.bind(this);
        this.onGroupEdit = this.onGroupEdit.bind(this);
        this.onCloseEdit = this.onCloseEdit.bind(this);
    }

    onShow(e){
        
        switch (e.target.name) {
            case "group-list":
                this.setState({
                    list_groups : true,
                    create_group : false,
                    edit_group : false,
                    group_meetings : false,

                });break;

            case "create-groups":
                this.setState({
                    list_groups : false,
                    create_group : true,
                    edit_group : false,
                    group_meetings : false,


                });break;

            case "group-meetings":
                this.setState({
                    list_groups : false,
                    create_group : false,
                    edit_group : false,
                    group_meetings : true,


                });break;
            case "group-details":
                this.setState({
                    list_groups : false,
                    create_group : true,
                    edit_group : false,
                    group_meetings : false,



                });break;

            default:break;

        }
    }

    onCloseEdit(e){
        this.setState({
            list_groups : false,
            create_group : false,
            edit_group : false,
            group_meetings : false,

        })
    }

    loadCenters(e){
        console.log("Load centers called");
        let self = this;

        Axios.get(centers_routes.center).then(function(response){
            if (response.status === 200){
                return response.data;
            }else{

                throw new Error("You do not have any centers defined")
            }
        }).then(function(json_data){
            // let json_array = [];
            console.log("Json loaded data : ");
            console.log(json_data);

            // let centers_list
            let centers_list = Object.assign([],self.state.centers_list);
            centers_list = json_data;
            console.log(centers_list);

            self.setState({
                centers_list: centers_list,
                centers_loaded : true
            });

        }).catch(function(err){
            console.log("Error Message : " + err.message);
        });
    };

    onGroupEdit(group_item){
        console.log("On group Edit");
        let group_detail = Object.assign({},this.state.group_detail);
        group_detail = group_item;
        this.setState({
            group_detail : group_detail,

            list_groups : false,
            create_group : false,
            edit_group : true,
        })

    }

    componentWillMount(e){        
        //find a way to load a list of centers and their id's
        this.loadCenters(e);
    }

    render(){

        return(
                <div className="row">
                    <div className="box box-header">
                        <h3 className="box-title"> <i className="fa fa-group"> </i> Groups </h3>                     
                            <button name={"group-list"} type="button" className="btn btn-box-tool btn-outline-dark pull-right" onClick={e => this.onShow(e)}><strong> <i className="fa fa-server"> </i> List Groups</strong></button>
                            <button name={"create-groups"} type="button" className="btn btn-box-tool btn-outline-dark pull-right" onClick={e => this.onShow(e)}><strong> <i className="fa fa-object-group"> </i> Create Groups</strong></button>
                    </div>

                        {

                            (this.state.create_group) ?
                                <GroupDetails

                                    centers_list = {this.state.centers_list}
                                />
                            :""

                        }
                    {
                        (this.state.list_groups) ?

                            <GroupList
                                centers_list = {this.state.centers_list}
                                onGroupEdit = {this.onGroupEdit}
                            />
                        :""


                    }
                    {
                        (this.state.edit_group)?
                            <EditGroup
                                group_detail = {this.state.group_detail}
                                onClose={this.onCloseEdit}
                            />
                        :""
                    }



                </div>


        )
    }
}

export default Groups;