import React, { Component } from "react";
import './FollowUp.css';


import Axios from "axios";
import * as centers_routes from "../../../constants/centers-routes";
import InlineMessage from "../../Forms/InlineMessage";


let follow_up_form = {
    center_id : "",
    follow_up_date : "",
    group_id : "",
    arrears : "",
    installment_amount : "",
    total_expected : "",
    savings_balance : "",
    loan_officer : "",
    discussion : "",

};


class FollowUpForms extends Component{
    constructor(props){
        super(props);
        this.state = {
            follow_up_list : [],
            follow_up : {...follow_up_form}
        };
    };

    render(){
        return(
            <div className={'box box-body'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}>Follow Up</h3>
                </div>

                <table className={'table table-responsive'}>
                        <thead>
                            <tr>
                                <td><strong><small>Group Name</small></strong> </td>
                                <td><strong><small>Arrears</small></strong></td>
                                <td><strong><small>Installment</small></strong></td>
                                <td><strong><small>Total Expected</small></strong></td>
                                <td><strong><small>Savings Balance</small></strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><strong><small>Group Name</small></strong> </td>
                                <td><strong><small>Arrears</small></strong></td>
                                <td><strong><small>Installment</small></strong></td>
                                <td><strong><small>Total Expected</small></strong></td>
                                <td><strong><small>Savings Balance</small></strong></td>
                            </tr>
                        </tfoot>
                </table>
            </div>
        )
    }
}


class DisplayForm extends  Component{
    constructor(props){
        super(props);
        this.state = {
            follow_up : {...this.props.follow_up}
        };

        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    };


    onChangeHandler(e){
        let follow_up = Object.assign({},this.state.follow_up);

        switch(e.target.name){
            case 'discussion' : follow_up.discussion = e.target.value;break;
            default: break;
        }

        this.setState({
            follow_up:follow_up
        });
    }


    onSave(e){

    }

    onCancel(e){
        this.props.onCancel(e);
    }

    render(){
        return(

            <div className={'box box-footer'}>
                <div className={'box-header'}>
                    <h3 className={'box-title'}> <i className='fa fa-android'> </i> Complete Follow Up</h3>
                </div>
                <form className={'form-horizontal'}>
                    <div className={'form-group'}>
                        <label><strong> <i className={'fa fa-calendar-o'}> </i> Follow up Date</strong></label>
                        <input type={'date'} className={'form-control'} name={'follow_up_date'} value={this.state.follow_up.follow_up_date} readOnly={true} />
                    </div>
                    <div className={'form-group'}>
                        <label> <strong> <i className={'fa fa-credit-card'}> </i> Arrears  </strong></label>
                        <input type={'text'} className={'form-control'} name={'arrears'} value={this.state.follow_up.arrears} readOnly={true} />
                    </div>
                    <div className={'form-group'}>
                        <label><strong> <i className={'fa fa-money'}> </i> Installment Amount </strong></label>
                        <input type={'text'} className={'form-control'} name={'installment_amount'} value={this.state.follow_up.installment_amount} readOnly={true} />
                    </div>
                    <div className={'form-group'}>
                        <label><strong> <i className={'fa fa-money'}> </i> Total Expected </strong> </label>
                        <input type={'text'} className={'form-control'} name={'total_expected'} value={this.state.follow_up.total_expected} readOnly={true} />
                    </div>
                    <div className={'form-group'}>
                        <label><strong> <i className={'fa fa-money'}> </i> Savings Balance</strong></label>
                        <input type={'text'} className={'form-control'} name={'savings_balance'} value={this.state.follow_up.savings_balance} readOnly={true} />
                    </div>
                    <div className={'form-group'}>
                        <label><strong> <i className={'fa fa-user-md'}> </i> Loan Officer</strong></label>
                        <input type={'text'} className={'form-control'} name={'loan_officer'} value={this.state.follow_up.loan_officer} readOnly={true} />
                    </div>
                    <div className={'form-group'}>
                        <label> <strong> <i className={'fa fa-file'}> </i> Discussion</strong></label>
                        <textarea className={'form-control'} name={'discussion'}
                                  value={this.state.follow_up.discussion}
                                  rows={'20'} onChange={e => this.onChangeHandler(e)}
                        />

                    </div>

                    <div className={'form-group'}>
                        <button type={'button'} className={'btn btn-success btn-outline-dark'}
                                onClick={e => this.onSave(e)}
                        >
                            <strong> <i className={'fa fa-save'}> </i> Save Follow Up</strong>
                        </button>

                        <button type={'button'} className='btn btn-info btn-outline-dark'

                        >
                            <strong> <i className='fa fa-print'> </i> Print </strong>

                        </button>
                        <button type={'button'} className={'btn btn-warning btn-outline-dark'} onClick={e => this.onCancel(e)}><strong> <i className={'fa fa-close'}> </i> Reset</strong> </button>
                    </div>



                </form>
            </div>
        )
    }
}

class CreateFollowUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            centers_list : [],
            center_id : "",
            groups_list : [],
            follow_up : {...follow_up_form},
            complete_follow_up : false,
            form_response : ""
        };
        this.onChange = this.onChange.bind(this);
        this.loadGroups = this.loadGroups.bind(this);
        this.setCenters = this.setCenters.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onCancelDisplay = this.onCancelDisplay.bind(this);
    };

    onCancelDisplay(e){
        this.setState({
            center_id : "",
            groups_list : [],
            follow_up : {...follow_up_form},
            complete_follow_up : false,
            form_response : ""
        });
    }

    onChange(e) {

        let follow_up = Object.assign({},this.state.follow_up);
        console.log(e.target.name);


        switch(e.target.name){
            case "center_id":
                follow_up.center_id = e.target.value;
                this.loadGroups(e);
                break;

            case "follow_up_date":
                follow_up.follow_up_date = e.target.value;
                break;

            case "group_id":
                follow_up.group_id = e.target.value;
                break;

            default:break;
        }

        this.setState({
            follow_up : follow_up
        });
        this.forceUpdate();
    };
    loadGroups(e){

            console.log(e);

            let self = this;
            let center_id = e.target.value;

            Axios.get(centers_routes.load_centers_groups_url + center_id).then(function(response){
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
    setCenters(e){

        let centers_list = Object.assign([],this.state.centers_list);
        if(this.props.centers_list !== undefined){
            centers_list = this.props.centers_list
        }
        this.setState({
            centers_list : centers_list
        });


    }
    onCreate(e){
        let self = this;

        Axios.post(centers_routes.create_follow_up_url,'&data='+ JSON.stringify(this.state.follow_up)).then(function(response){
            if (response.status === 200){
                return response.data;
            }else{
                throw new Error("Error creating follow up ");
            }
        }).then(function(json_data){
            let follow_up = Object.assign({},self.state.follow_up);
            follow_up = json_data;
            self.setState({
                follow_up : follow_up,
                complete_follow_up : true
            });
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            })
        })
    }
    componentWillMount (e) {
        // load Centers List, loan Officers
        this.setCenters(e);
    };
    render(){
        return(
                <div className="box box-footer">
                    <div className={'box box-header'}>
                        <h3 className={'box-title'}><strong> <i className={'fa fa-file'}> </i>  Create Follow Up Form</strong></h3>
                    </div>

                        <DisplayForm
                            follow_up = {this.state.follow_up}
                            onCancel = {this.onCancelDisplay}
                        />
                </div>
        )
    }
}

class FollowUp extends Component {
    constructor(){
        super();
        this.state = {
            centers_list: [],
            center_id: "",

            show_follow_up : false,
            show_create_follow_up : false,
        };


        this.onSubmit = this.onSubmit.bind(this);
        this.DeleteDefaultText = this.DeleteDefaultText.bind(this);
        this.setCenters = this.setCenters.bind(this);

        this.onShow = this.onShow.bind(this);
        this.onClose = this.onClose.bind(this);
    };


    onClose(e){
        this.props.onClose(e);
    }



    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    };

    onShow(e){

        switch(e.target.name){
            case "follow-up" :
                this.setState({
                    show_follow_up : true,
                    show_create_follow_up : false,
                });break;

            case "create-follow-up" :
                this.setState({
                    show_follow_up : false,
                    show_create_follow_up : true,
                });break;

            default:break;

        }

    }

    DeleteDefaultText(e){
        e.preventDefault();
        if (e.target.value === "Detailed Discussion") { e.target.value = ""}                     
    };

    setCenters(e){

        let centers_list = Object.assign([],this.state.centers_list);
        if(this.props.centers_list !== undefined){
            centers_list = this.props.centers_list
        }
        this.setState({
            centers_list : centers_list
        });


    }

    componentWillMount (e) {
        // load Centers List, loan Officers
        this.setCenters(e);
    };
    render () {
        return (
                        <div className="box box-body">
                            <div className="box box-header">
                                <h3 className="box-title"> <small> Follow Up Form </small> </h3>

                                    <button type={'button'} className={'btn btn-box-tool btn-outline-danger pull-right'} name={'close'}
                                        onClick={e => this.onClose(e)}
                                    >
                                        <strong> <i className={'fa fa-close'}> </i> Close </strong>

                                    </button>

                                    <button type={'button'} className='btn btn-box-tool btn-outline-dark pull-right' name={'follow-up'}
                                            onClick={e => this.onShow(e)}>
                                        <strong> <i className={'fa fa-folder'}> </i> Follow Up Forms </strong>
                                    </button>
                                    <button type={'button'} className='btn btn-box-tool btn-outline-dark pull-right' name={'create-follow-up'}
                                            onClick={e => this.onShow(e)}>
                                        <strong> <i className={'fa fa-file'}> </i> Create Follow Up Forms </strong>
                                    </button>

                            </div>

                            {
                                (this.state.show_follow_up) ?
                                    <FollowUpForms

                                    />
                                :""
                            }
                            {
                                (this.state.show_create_follow_up)?
                                    <CreateFollowUp
                                        centers_list = {this.state.centers_list}
                                    />
                                :""
                            }

                        </div>
        );
    }
};
export default FollowUp;
