
import React, { Component } from "react";
import {Rows,Cols} from 'react-bootstrap';
import {centers_routes} from "../../../constants";
import * as Utils from '../../../constants/utilities';
import Axios from 'axios';
import {group_details} from '../../Groups/Groups';
let loan_details = {
    group_id : '',
    group_name : '',
    loan_amount : '',
    installment_amount : '',
    loan_offered_date : '',
    repayment_day : '',
    loan_activated: false
};


class LoansList extends Component{
    constructor(props){
        super(props);
        this.state = {
            loans_list : [],
            form_response : ''
        };
        this.onSubClose = this.onSubClose.bind(this);
    };

    onSubClose(e){
        this.props.onClose(e)
    }

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}> <strong> <i className='fa fa-server'> </i> Loans List </strong></h3>

                    <button type={'button'}
                        className={'btn btn-box-tool btn-outline-danger pull-right'}
                        onClick={e => this.onSubClose(e)}
                    >
                        <strong> <i className='fa fa-close'> </i> Close </strong>

                    </button>
                </div>

                <table className='table table-responsive'>
                    <thead>
                        <tr>
                            <td>Date Offered</td>
                            <td>Loan Amount</td>
                            <td>Installment</td>
                            <td>Repayment Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Date Offered</td>
                            <td>Loan Amount</td>
                            <td>Installment</td>
                            <td>Repayment Date</td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        )
    }
}

class CreateLoan extends Component{
    constructor(props){
        super(props);
        this.state = {
            group_detail : this.props.group_detail,
            group_list : [],
            group_loan : {...loan_details},
            loan_offer : '',
            loan_offer_error : '',
            form_response : ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClose = this.onClose.bind(this);
        this.calculateLoanOffer = this.calculateLoanOffer.bind(this);
        this.onCreateLoan = this.onCreateLoan.bind(this);
        this.onCheckErrors = this.onCheckErrors.bind(this);
    };

    onCheckErrors(){
        let isError = false;
        if (Utils.isEmpty(this.state.loan_offer) === true){
            isError = true;
            this.setState({
                loan_offer_error: 'loan offer cannot be empty'
            });
        }
        return isError;

    }


    onCreateLoan(e){
        let self = this;
        let group_loan = Object.assign({},this.state.group_loan);
        group_loan = JSON.stringify(group_loan);
        console.log(group_loan);
        Axios.post(centers_routes.create_group_loan,'&data='+ group_loan).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error('error creating group loan')
            }
        }).then(function(json_data){
            let message = json_data.message;
            self.setState({
                form_response :message
            })
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            })
        })

    }

    onChangeHandler(e){

        let group_loan = Object.assign({},this.state.group_loan);

        switch(e.target.name){
            case 'loan_amount':
                let loan_amount = e.target.value;
                loan_amount = parseInt(loan_amount);
                let loan_offer = parseInt(this.state.loan_offer);

                    if (loan_amount === loan_offer){
                      group_loan.loan_amount = loan_amount;
                    }else if (loan_amount < loan_offer){
                        group_loan.loan_amount = loan_amount;
                    }else if (loan_amount > loan_offer){
                        group_loan.loan_amount = loan_offer
                    }

                break;
            default:break;
        }

        this.setState({
            group_loan:group_loan
        })

    };


    calculateLoanOffer(e){
        let self = this;
        let group_id = this.state.group_detail.group_id;

        Axios.get(centers_routes.calculate_loan_offer + group_id).then(function(response){
            if (response.status === 200){
                return response.data;
            }else{
                throw new Error('Error creating new group loan')
            }
        }).then(function(json_data){
            let offer = json_data.loan_offer;
            self.setState({
                loan_offer:offer
            });
        }).catch(function(err){
            self.setState({
                form_response: err.message
            });
        });
    }

    onClose(e){

        this.props.onClose(e)

    }

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-user-plus'> </i> Create Loans </strong></h3>

                    <button type={'button'} className={'btn btn-box-tool btn-outline-danger pull-right'} onClick={e => this.onClose(e)}>
                        <strong> <i className={'fa fa-close'}> </i> Close </strong>
                    </button>
                </div>

                <form className={'form-horizontal col-md-6'}>
                    <div className={'form-group'}>
                        <div className={'input-group'}>
                            <button type={'button'} className={'btn btn-success'}  onClick={e => this.calculateLoanOffer(e)}> <strong> <i className='fa fa-calculator'> </i> Calculate Loan Offer</strong></button>
                            <input type={'text'} className={'form-control'} value={this.state.loan_offer} onChange={e => this.calculateLoanOffer(e)} />
                        </div>
                    </div>
                    <div className={'form-group'}>
                            <input type={'text'} placeholder={'Loan Amount'} className={'form-control'} name={'loan_amount'} value={this.state.group_loan.loan_amount} onChange={e => this.onChangeHandler(e)} />
                    </div>
                            <button
                                type={'button'}
                                className={'btn btn-success'}
                                onClick={e => this.onCreateLoan(e)}
                            >
                                <strong> <i className='fa fa-credit-card-alt'>  </i> Create Loan </strong>
                            </button>
                            <button
                                type={'button'}
                                className={'btn btn-warning btn-outline-dark'}
                                onClick={e => this.setState({
                                    group_loan : {...loan_details},
                                    loan_offer : '',
                                    loan_offer_error : '',
                                    form_response : ''
                                })}
                            >
                                <strong><i className='fa fa-eraser'> </i> Reset </strong>

                            </button>

                </form>
            </div>
        )
    }
}


export default class GroupLoans extends Component{
    constructor(props){
        super(props);
        this.state = {
            //insure to pass group detail from props
            group_detail : {...group_details},
            group_loan : {... loan_details},

            loans_list : [],
            show_loans : false,
            show_create_loans : false,
            form_response : ''
        };

        this.onSubClose = this.onSubClose.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onShow = this.onShow.bind(this);
        this.loadLoans = this.loadLoans.bind(this);
        this.onAssignProps = this.onAssignProps.bind(this);
    };

    onAssignProps(e){
        let group_detail = Object.assign({},this.state.group_detail);

        if (this.props.group_detail !== undefined){
            group_detail = this.props.group_detail
        }

        this.setState({
            group_detail:group_detail
        })
    }

    onSubClose(e){
        this.setState({
            show_loans : false,
            show_create_loans : false,
            form_response : ''
        });
    }
    onClose(e){
        this.props.onClose(e);
    }
    onShow(e){
        switch (e.target.name) {
            case 'loans-list':
                this.setState({
                    show_loans : true,
                    show_create_loans : false,
                    form_response : ''
                });break;

            case 'create-loans':
                this.setState({
                    show_loans : false,
                    show_create_loans : true,
                    form_response : ''
                });break;

            default:break;
        }
    }
    loadLoans(e){
        let self=this;
        Axios.get(centers_routes.load_group_loans+this.state.group_loan.group_id).then(
            function(response){
                if (response.status === 200){
                    return response.data
                }else{
                    throw new Error('there was an error fetching group loans')
                }
            }).then(function(json_data){
                self.setState({
                    loans_list : json_data
                })
            }).catch(function(err){
                console.log(err.message)
            })
    }

    componentWillMount(e) {
        this.loadLoans(e);
    }

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-credit-card-alt'> </i> Group Loans </strong></h3>

                    <button type={'button'} className={'btn btn-outline-danger btn-box-tool pull-right'}
                            onClick={ e => this.onClose(e)}>
                        <strong> <i className={'fa fa-close'}> </i> Close </strong>

                    </button>
                    <button type={'button'} className={'btn btn-outline-dark btn-box-tool pull-right'}
                            name={'create-loans'}
                            onClick={e => this.onShow(e)}>
                        <strong> <i className={'fa fa-user-plus'}> </i> Create Loans </strong>
                    </button>
                    <button type={'button'} className={'btn btn-outline-dark btn-box-tool pull-right'}
                        name={'loans-list'}
                        onClick={e => this.onShow(e)}>
                        <strong> <i className='fa fa-server'> </i> Loans </strong>
                    </button>

                </div>


                {(this.state.show_create_loans)? <CreateLoan onClose={this.onSubClose} group_detail={this.state.group_detail}/> : ''}
                {(this.state.show_loans) ? <LoansList onClose={this.onSubClose} /> : ''}

            </div>
        )
    }

}