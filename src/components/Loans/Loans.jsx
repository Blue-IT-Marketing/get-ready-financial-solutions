
import React, {Component} from "react";
import "./Loans.css";
import Axios from "axios";
import * as centers_routes from "../../constants/centers-routes";
import { repayments_details} from './RepaymentsSchedules/RepaymentsSchedules';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import * as Utils from '../../constants/utilities';
import InlineError from "../Forms/InlineError";
import InlineMessage from "../Forms/InlineMessage";
import {clients_details} from '../Clients/Clients';
import {client_files_type,FileServer,UploadFiles} from '../Clients/ClientFiles';
import UserMessaging from '../Admin/UserMessaging/UserMessaging';
import Finances from "../Finances/Finances";



let loan_terms_details = {
    loan_amount : '',
    initiation_fee : '',
    interest_rate :'',
    service_fee : ''
};

class LoanActivation extends Component{
    constructor(props){
        super(props);
        this.state = {
            loan_item : {...repayments_details}
        };
    };

    render(){
        return(
            <div className='box box-body'>
                <div className='box box-header'>
                    // eslint-disable-next-line
                    <h3 className={'box-title'}><strong> {'Loan Activation'} </strong></h3>
                </div>

                <div className={'row'}>
                <div className={'box box-primary col-md-3'}>

                </div>
                <div className={'box box-body col-md-9'}>
                </div>
                </div>
            </div>
        )
    }
}

class LoanItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            loan_item : '',
        };

        this.assignProps = this.assignProps.bind(this);
        this.onActivate = this.onActivate.bind(this);
    };


    onActivate(e){
        this.props.onActivation(e);
    }

    assignProps(e){
        let loan_item = Object.assign({},this.state.loan_item);

        loan_item = this.props.loan_item;
        this.setState({
            loan_item:loan_item
        });
    }


    componentWillMount(e){
        this.assignProps(e)
    }


    render(){

        return(
            <tr>
            <td>{this.state.loan_item.group_name}</td>
            <td>{this.state.loan_item.loan_amount}</td>
            <td>{this.state.loan_item.installment_amount}</td>
            <td>{this.state.loan_item.loan_offered_date}</td>
            <td>{this.state.loan_item.repayment_day}</td>
            <td>
                <button
                    type={'button'}
                    name={'activate-loan'}
                    className={'btn btn-warning btn-outline-dark btn-box-tool'}
                    onClick={e => this.onActivate(e)}>
                    <strong> <i className='fa fa-keyboard-o'> </i> Activate </strong></button>
            </td>
            </tr>
            )
    }
}


class LoanList extends Component{
    constructor(props){
        super(props);
        this.state = {
            group_loans : [],
        };

        this.onClose = this.onClose.bind(this);
        this.onActivate = this.onActivate.bind(this);

    };

    onClose(e){

    }
    onActivate(e){
        this.props.onActivate(e);
    }

    render() {
        return(

                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <td><strong> <i className='fa fa-user'> </i> Group Name</strong> </td>
                            <td><strong> <i className='fa fa-money'> </i> Loan Amount</strong></td>
                            <td><strong> <i className='fa fa-money'> </i>  Installment Amount</strong></td>
                            <td><strong> <i className='fa fa-calendar-check-o'> </i> Date Offered</strong></td>
                            <td><strong> <i className='fa fa-calendar-plus-o'> </i> Repayment Day</strong></td>
                            <td><strong> <i className='fa fa-check-circle-o'> </i> Activate </strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.group_loans.map( loan => {
                                return(
                                    <LoanItem
                                        loan_item={loan}
                                        onActivation={this.onActivate}
                                    />
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong> <i className='fa fa-user'> </i> Group Name</strong> </td>
                            <td><strong> <i className='fa fa-money'> </i> Loan Amount</strong></td>
                            <td><strong> <i className='fa fa-money'> </i>  Installment Amount</strong></td>
                            <td><strong> <i className='fa fa-calendar-check-o'> </i> Date Offered</strong></td>
                            <td><strong> <i className='fa fa-calendar-plus-o'> </i> Repayment Day</strong></td>
                            <td><strong> <i className='fa fa-check-circle-o'> </i> Activate </strong></td>
                        </tr>
                    </tfoot>
                </table>
        )
    }
}

class ActivateLoans extends Component{
    constructor(props){
        super(props);
        this.state = {
            group_loans : [],

            show_activation : false,
            show_loan_items : true

        };

        this.onClose = this.onClose.bind(this);
        this.onActivate = this.onActivate.bind(this);
        this.onDoneActivation = this.onDoneActivation.bind(this);
    };


    onActivate(e){
        this.setState({
            show_activation : true,
            show_loan_items : false
        })
    }

    onDoneActivation(e){
        this.setState({
            show_activation : false,
            show_loan_items : true

        })
    }

    onClose(e){
        this.props.onClose(e)
    }


    render(){
        return(
                <div className={'box box-footer'}>
                                <div className={'box box-header'}>
                                    <h3 className={'box-title'}><strong> <i className={'fa fa-server'}> </i> Activate Loans </strong></h3>
                                    <button
                                        type={'button'} name='close' className='btn btn-box-tool btn-outline-danger pull-right'
                                        onClick={e => this.onClose(e)}>
                                        <strong><i className='fa fa-close'> </i> Close </strong>
                                    </button>

                                </div>

                        {
                            (this.state.show_loan_items)?
                                <LoanList
                                    onActivate={this.onActivate}
                                />
                            :''
                        }

                        {
                            (this.state.show_activation)?
                                <LoanActivation/>
                            :''
                        }

                </div>

        )
    }
}


class PaymentItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            payment_item : {...repayments_details}
        };

        this.assignProps = this.assignProps.bind(this);
        this.onVerifyPayment = this.onVerifyPayment.bind(this);
    };

    onVerifyPayment(e){
        console.log('Verifying Payment');
    }

    assignProps(e){
        let payment_item = this.props.payment_item;

        this.setState({
            payment_item:payment_item
        });
    }

    componentWillMount() {
        let e = new Event('Asssign Props');
        this.assignProps(e);
    }


    render(){
        return(
            <tr>
                <td>{this.state.payment_item.repayment_date}</td>
                <td>{this.state.payment_item.loan_amount}</td>
                <td>{this.state.payment_item.installment_amount}</td>
                <td>{this.state.payment_item.actual_payment}</td>
                <td>{this.state.payment_item.balance_remaining}</td>
                <td>{this.state.payment_item.reference}</td>
                <td
                    onClick={e => this.onVerifyPayment(e)}
                >{this.state.payment_item.payment_verified}</td>
            </tr>
        )
    }
}

// please create a make payments record
class LoanPayments extends Component{
    constructor(props){
        super(props);
        this.state = {
            loan_payments : [],
            payment: { ...repayments_details}
        };

        this.onClose = this.onClose.bind(this);
        this.onLoadPayments = this.onLoadPayments.bind(this);
    };


    onLoadPayments(e){
        console.log('Loading Payments items');
        let self = this;

        Axios.get(centers_routes.load_payments).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error('There was an error loading payments');
            }
        }).then(function(json_data){
            console.log('Data Returned from load payments');
            console.log(json_data);
            if (json_data !== null){
                self.setState({
                    loan_payments : json_data
                })
            }
        }).catch(function(err){
            console.log(err.message);
        })
    }

    onClose(e){
        this.props.onClose(e);

    }

    componentWillMount() {
        let e = new Event('Loading payments');
        this.onLoadPayments(e);
    }

    render(){
        return(
            <div className={'box box-footer'}>
                <div className='box box-header'>
                    <h3 className={'box-title'}><strong> Loan Payments</strong></h3>

                    <button type={'button'} 
                            name={'close_btn'} 
                            className={'btn btn-box-tool btn-outline-danger pull-right'}
                            onClick={e => this.onClose(e)}
                    >
                        
                        <strong><i className={'fa fa-close'}> </i> Close  </strong>

                    </button>
                </div>

                <table className='table table-responsive table-striped'>
                    <thead>
                        <tr>
                            <td><strong> <i className="fa fa-calendar"> </i> Payment Date</strong></td>
                            <td><strong> <i className="fa fa-money"> </i> Loan Amount</strong></td>
                            <td><strong> <i className="fa fa-money"> </i> Installment Amount </strong></td>
                            <td><strong> <i className="fa fa-money"> </i> Actual Payment</strong></td>
                            <td><strong> <i className="fa fa-money"> </i> Balance Remaining</strong></td>
                            <td><strong> <i className='fa fa-code'> </i> Reference </strong></td>
                            <td><strong> <i className="fa fa-check-o"> </i> Verified</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.loan_payments.map(payment => {
                                return(
                                    <PaymentItem
                                        payment_item={payment}
                                    />
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong> <i className="fa fa-calendar"> </i> Payment Date</strong></td>
                            <td><strong> <i className="fa fa-money"> </i> Loan Amount</strong></td>
                            <td><strong> <i className="fa fa-money"> </i> Installment Amount </strong></td>
                            <td><strong> <i className="fa fa-money"> </i> Actual Payment</strong></td>
                            <td><strong> <i className="fa fa-money"> </i> Balance Remaining</strong></td>
                            <td><strong> <i className='fa fa-code'> </i> Reference </strong></td>
                            <td><strong> <i className="fa fa-check-o"> </i> Verified</strong></td>
                        </tr>
                    </tfoot>
                </table>


            </div>
        )
    }
}


class LoanTermsItem extends Component {
        constructor(props) {
            super(props);

        this.state = {
            loan_item: {...this.props.loan_item}
        };
    };

        render(){
            return(
                <tr>
                    <td>R {this.state.loan_item.loan_amount}</td>
                    <td>R {this.state.loan_item.initiation_fee}</td>
                    <td>{this.state.loan_item.interest_rate} %</td>
                    <td>R {this.state.loan_item.service_fee}</td>
                </tr>
            )
        }
}


class ShowLoanTerms extends Component{
    constructor(props){
        super(props);
        this.state = {
            loan_terms : [],

        };

        this.onAssignProps =this.onAssignProps.bind(this)

    };

    onAssignProps(){
        let loan_terms = this.props.loan_terms;

        this.setState({
            loan_terms: loan_terms
        })
    }

    componentWillMount() {
        this.onAssignProps();
    }


    render(){
        return(

            <table className='table table-responsive table-striped'>
                                <thead>
                                    <tr>
                                        <td> <strong> <i className={'fa fa-money'}> </i> Loan Amount </strong></td>
                                        <td> <strong> <i className={'fa fa-money'}> </i>Initiation fee </strong></td>
                                        <td> <strong> <i className={'fa fa-money'}> </i>Interest </strong></td>
                                        <td> <strong> <i className={'fa fa-money'}> </i>Service fee </strong></td>
                                        <td> <strong> <i className={'fa fa-money'}> </i>Total </strong></td>
                                    </tr>
                                </thead>
                                <tbody>

                                {
                                    this.state.loan_terms.map( (loan_item,index) => {
                                    return(<LoanTermsItem loan_item={loan_item} key={index} />)
                                    })
                                }

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td> <strong> <i className={'fa fa-money'}> </i> Loan Amount </strong></td>
                                        <td> <strong> <i className={'fa fa-money'}> </i>Initiation fee </strong></td>
                                        <td> <strong> <i className={'fa fa-money'}> </i>Interest </strong></td>
                                        <td> <strong> <i className={'fa fa-money'}> </i>Service fee </strong></td>
                                        <td> <strong> <i className={'fa fa-money'}> </i>Total </strong></td>
                                    </tr>
                                </tfoot>
                            </table>
        )
    }
}

class CreateLoanTerms extends Component{
    constructor(props){
        super(props);
        this.state={
            loan_terms : {...loan_terms_details},
            loan_amount_error : '',
            initiation_fee_error : '',
            loan_interest_error : '',
            service_fee_error : '',
            form_response: ''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onAddTerms = this.onAddTerms.bind(this);
    };

    onChangeHandler(e){
        let loan_terms = Object.assign({},this.state.loan_terms);
        switch(e.target.name){
            case 'loan_amount' : loan_terms.loan_amount = e.target.value;break;
            case 'initiation_fee' : loan_terms.initiation_fee = e.target.value;break;
            case 'interest_rate' : loan_terms.interest_rate = e.target.value;break;
            case 'service_fee': loan_terms.service_fee = e.target.value;break;
            default:break;
        }

        this.setState({
            loan_terms:loan_terms
        })
    }

    onAddTerms(e){
        let loan_terms = Object.assign({},this.state.loan_terms);
        loan_terms = JSON.stringify(loan_terms);
        console.log(loan_terms);
        let self = this;

        Axios.post(centers_routes.submit_loan_terms,'&data='+loan_terms).then(
            function(response){
                if (response.status === 200){
                    return response.data;
                }else{
                    throw new Error('There was an error submitting loan terms');
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
                })
            })

    }

    onCheckErrors(){
        let isError = false;
        let loan_terms = Object.assign({},this.state.loan_terms);

        if (Utils.isNumber(loan_terms.loan_amount) === false) {
            this.setState({
                loan_amount_error: 'Loan Amount is invalid'
            });
            isError = true;
        } else if (Utils.isEmpty(loan_terms.loan_amount)) {
            this.setState({
                loan_amount_error: 'Loan Amount is invalid'
            });
            isError = true;
        }

        if (Utils.isNumber(loan_terms.initiation_fee) === false){
            this.setState({
                initiation_fee_error: 'Initiation fee is invalid'
            });
            isError = true;}else if (Utils.isEmpty(loan_terms.initiation_fee)){
                this.setState({
                    initiation_fee_error: 'Initiation fee cannot be empty'
                });
            isError = true;
        }


        if (Utils.isNumber(loan_terms.interest_rate) === false){
            this.setState({
                loan_interest_error: 'Loan Interest rate error'
            });
            isError = true;
        }else if(Utils.isEmpty(loan_terms.interest_rate)){
            this.setState({
                loan_interest_error: 'Please Select loan interest rate'
            });
            isError = true
        }

        if (Utils.isNumber(loan_terms.service_fee) === false){
            this.setState({
                service_fee_error : 'Service fee error'
            });
            isError = true;
        }else if(Utils.isEmpty(loan_terms.service_fee)) {
            this.setState({
                service_fee_error : 'Service fee cannot be empty'
            });
            isError = true;
        }


        return isError;


    }

    render() {
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-flag-checkered'> </i> Loan Terms dd  </strong></h3>
                </div>
                <form className={'form-horizontal col-md-6'}>
                    <div className={'form-group'}>
                        <label> <strong> <i className={'fa fa-money'}> </i> Loan Amount </strong></label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'loan_amount'}
                               value={this.state.loan_terms.loan_amount}
                               onChange={e => this.onChangeHandler(e)} />

                        {(this.state.loan_amount_error)? <InlineError message={this.state.loan_amount_error}/> : ''}
                    </div>
                    <div className={'form-group'}>
                        <label> <strong> <i className={'fa fa-money'}> </i> Initiation Fee</strong></label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'initiation_fee'}
                               value={this.state.loan_terms.initiation_fee}
                               onChange={e => this.onChangeHandler(e)}
                        />
                        {(this.state.initiation_fee_error) ? <InlineError message={this.state.initiation_fee_error}/> : ''}
                    </div>
                    <div className={'form-group'}>
                        <label> <strong> <i className={'fa fa-random'}> </i> Interest Rate</strong></label>
                        <select
                            className={'form-control'}
                            name={'interest_rate'}
                            value={this.state.loan_terms.interest}
                            onChange={e => this.onChangeHandler(e)}>
                            <option value={15}>15 % </option>
                            <option value={20}>20 % </option>
                            <option value={25}>25 % </option>
                            <option value={30}>30 % </option>
                            <option value={35}>35 % </option>
                            <option value={40}>40 % </option>
                        </select>
                        {(this.state.loan_interest_error) ? <InlineError message={this.state.loan_interest_error}/> : ''}
                    </div>
                    <div className={'form-group'}>
                        <label> <strong> <i className={'fa fa-money'}> </i> Service Fee</strong></label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'service_fee'}
                               value={this.state.loan_terms.service_fee}
                               onChange={e => this.onChangeHandler(e)}
                        />
                        {(this.state.service_fee_error) ? <InlineError message={this.state.service_fee_error} />: ''}
                    </div>
                    <button className={'btn btn-success btn-outline-dark'}
                            name={'add_terms'}
                            type={'button'}
                            onClick={e => {
                                if (this.onCheckErrors() === false){
                                    this.onAddTerms(e)
                                }
                            }}>
                        <strong><i className={'fa fa-save'}> </i> Add Terms </strong>
                    </button>

                    <button className={'btn btn-warning btn-outline-dark'}
                            name={'reset'}
                            type={'button'}
                            onClick={e => this.setState({
                                loan_terms: {...loan_terms_details},
                                loan_amount_error : '',
                                initiation_fee_error : '',
                                loan_interest_error : '',
                                service_fee_error : '',
                                form_response: ''        
                            })}> <strong> <i className='fa fa-eraser'> </i> Reset </strong>
                    </button>
                    {(this.state.form_response)? <InlineMessage message={this.state.form_response} message_type={'INF'}/> : ''}
                    
                </form>

            </div>
        )
    }
}
class LoanTerms extends Component{
    constructor(props){
        super(props);
        this.state = {
            loan_terms :[],
            show_loan_terms : false,
            create_loan_terms : false,
        };
        this.onClose = this.onClose.bind(this);
        this.onSwitch = this.onSwitch.bind(this);
        this.load_loan_terms = this.load_loan_terms.bind(this);
    };

    load_loan_terms(e){
        let self = this;

        Axios.get(centers_routes.load_loan_terms).then(function(response){
            if (response.status === 200){
                return response.data;
            }else{
                throw new Error('Error loading loan terms')
            }
        }).then(function(json_data){
            self.setState({
                loan_terms : json_data
            });
        }).catch(function(err){
            console.log('error loading loan terms')
        });
    }

    onSwitch(e){

        switch (e.target.name) {
            case 'add-terms':
                this.setState({
                    show_loan_terms : false,
                    create_loan_terms : true,
                });break;
            case 'show-terms':
                this.setState({
                    show_loan_terms : true,
                    create_loan_terms : false,
                });break;

            default:break;
        }
    }

    onClose(e){
        this.props.onClose(e);
    };

    componentWillMount(e) {
        this.load_loan_terms(e);
    }


    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className="fa fa-check-square-o"> </i> Loan Terms</strong></h3>
                    <button type={'button'}
                            name={'close_btn'}
                            className={'btn btn-box-tool btn-outline-danger pull-right'}
                            onClick={e => this.onClose(e)}>
                            <strong><i className={'fa fa-close'}> </i> Close  </strong>
                    </button>
                    <button
                        type={'button'}
                        name={'add-terms'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong><i className='fa fa-check-square-o'> </i> Add Terms </strong>

                    </button>
                    {/*show-terms*/}
                    <button
                        type={'button'}
                        name={'show-terms'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong><i className='fa fa-check-square-o'> </i> Show Terms </strong>

                    </button>

                </div>
                {
                    (this.state.show_loan_terms)?
                        <ShowLoanTerms loan_terms={this.state.loan_terms}/> : ''
                }
                {
                    (this.state.create_loan_terms)?
                        <CreateLoanTerms  /> :''
                }
            </div>
        )
    }
}



class BankingDetailManager extends Component{
    constructor(props){
        super(props);
        this.state = {
            banking_detail : {},
        };
    };


    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-bank'> </i> Banking Detail Manager </strong></h3>
                    <button
                        type={'button'}
                        className={'btn btn-outline-danger btn-box-tool pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong><i className={'fa fa-eraser'}> </i> Close</strong>

                    </button>

                </div>


            </div>
        )
    }
}


class SubPersonalDetailPersonalDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            personal_detail : {...clients_details},
            client_name_error : '',
            surname_error : '',
            gender_error : '',
            id_number_error : '',
            business_type_error : '',
            form_response : ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onVerifyIDNumber = this.onVerifyIDNumber.bind(this);
        this.onSavePersonalDetails = this.onSavePersonalDetails.bind(this);
        this.onCheckErrors = this.onCheckErrors.bind(this);
        this.onAssignProps = this.onAssignProps.bind(this);
    };

    onAssignProps(){
        let personal_detail = Object.assign({},this.state.personal_detail);
        if(this.props.personal_detail !== undefined){
            personal_detail = this.props.personal_detail;
        }

        this.setState({
            personal_detail:personal_detail
        });

    };

    onCheckErrors(){
        console.log('Checking Errors');

        let isError = false;
        let personal_detail = Object.assign({},this.state.personal_detail);

        if (Utils.isEmpty(personal_detail.client_name) === true){
            this.setState({
                client_name_error : 'Client Name field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(personal_detail.surname) === true){
            this.setState({
                surname_error : 'Surname field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(personal_detail.gender) === true){
            this.setState({
                gender_error : 'Please select relevant gender'
            });
            isError = true;
        }

        if (Utils.isIDNumber(personal_detail.id_number) === false ){
            this.setState({
                id_number_error : 'ID Number field is invalid'
            });
            isError = true;
        }

        return isError


    }

    onSavePersonalDetails(e){
        console.log('saving personal details');
        let self = this;
        let personal_details = Object.assign({},this.state.personal_detail);

        personal_details = JSON.stringify(personal_details);

        Axios.post(centers_routes.loan_admin_update_client, '&data='+personal_details).then(
            function(response){
             if (response.status === 200){
                 return response.data
             }else{
                 throw new Error('Error saving personal details');
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

    }

    onVerifyIDNumber(e){
        console.log('Verifying ID Number');
    }

    onChangeHandler(e){
        let personal_detail = Object.assign({},this.state.personal_detail);

        switch(e.target.name){
            case 'client_name': personal_detail.client_name = e.target.value;break;
            case 'surname' : personal_detail.surname = e.target.value;break;
            case 'gender' : personal_detail.gender = e.target.value;break;
            case 'id_number' : personal_detail.id_number = e.target.value;break;
            case 'business_type' : personal_detail.business_type = e.target.value;break;
            default:break;
        };

        this.setState({
            personal_detail:personal_detail
        })
    }

    componentWillMount() {
        this.onAssignProps();
    }

    render(){
        return(
            <div className={'box box-footer'}>

                <form className={'form-horizontal'}>
                    <div className={'form-group'}>
                        <label> <strong> <i className={'fa fa-user'}> </i> Names </strong></label>
                        <input type={'text'}
                               name={'client_name'}
                               className={'form-control'}
                               value={this.state.personal_detail.client_name}
                               onChange={e => this.onChangeHandler(e)} />

                        {(this.state.client_name_error) ? <InlineError message={this.state.client_name_error}/> : ''}
                    </div>

                    <div className={'form-group'}>
                        <label><strong> <i className={'fa fa-user'}> </i> Surname </strong></label>
                        <input type={'text'}
                               name={'surname'}
                               className={'form-control'}
                               value={this.state.personal_detail.surname}
                               onChange={e => this.onChangeHandler(e)} />
                        {(this.state.surname_error) ? <InlineError message={this.state.surname_error}/> : ''}

                    </div>

                    <div className={'form-group'}>
                        <label><strong> <i className={'fa fa-male'}> </i> Gender </strong></label>
                        <select
                               name={'gender'}
                               className={'form-control'}
                               value={this.state.personal_detail.gender}
                               onChange={e => this.onChangeHandler(e)} >

                            <option value={'male'}>Male</option>
                            <option value={'female'}>Female</option>

                        </select>
                        {(this.state.gender_error) ? <InlineError message={this.state.gender_error}/> : ''}
                    </div>

                    <div className={'form-group'}>
                        <label><strong> <i className={'fa fa-code'}> </i> ID Number </strong></label>

                        <div className={'input-group'}>
                        <input type={'text'}
                               name={'id_number'}
                               className={'form-control'}
                               value={this.state.personal_detail.id_number}
                               onChange={e => this.onChangeHandler(e)} />

                        <button
                            type={'button'}
                            className={'btn btn-box-tool btn-outline-dark pull-right'}
                            name={'verify_idnumber'}
                            onClick={e => this.onVerifyIDNumber(e)}
                        >
                            <strong> <i className='fa fa-opencart'> </i> Verify </strong>

                        </button>
                        </div>
                        {(this.state.id_number_error) ? <InlineError message={this.state.id_number_error}/> : ''}

                    </div>

                    <div className={'form-group'}>
                        <label><strong> <i className='fa fa-shopping-basket'> </i> Business Type </strong></label>
                        <input
                            type={'text'}
                            className={'form-control'}
                            name={'business_type'}
                            value={this.state.personal_detail.business_type}
                            onChange={e => this.onChangeHandler(e)}
                        />
                        {(this.state.business_type_error)? <InlineError message={this.state.business_type_error}/> : ''}

                    </div>

                    <div className={'form-group'}>
                        <button
                            type={'button'}
                            className={'btn btn-success'}
                            name={'save'}
                            onClick={e => {
                                if (this.onCheckErrors() === false){
                                    this.onSavePersonalDetails(e)
                                }
                            }}
                        >
                            <strong> <i className='fa fa-cloud-upload'> </i> Update </strong>

                        </button>

                        <button
                            type={'button'}
                            className={'btn btn-warning'}
                            name={'reset'}
                            onClick={e =>
                                this.setState({
                                    personal_detail : {...clients_details},
                                    client_name_error : '',
                                    surname_error : '',
                                    gender_error : '',
                                    id_number_error : '',
                                    business_type_error : '',
                                    form_response : ''

                            })}
                        >
                            <strong> <i className={'fa fa-eraser'}> </i> Reset </strong>

                        </button>
                    </div>
                    <div className={'form-group'}>
                        {(this.state.form_response) ? <InlineMessage message={this.state.form_response} message_type={'INF'}/>  : ''}
                    </div>
                </form>
            </div>
        )
    }
}

class SubPersonalDetailClientFiles extends Component{
    constructor(props){
        super(props);
        this.state = {
            client_files : [],
            client_file : {...client_files_type},

            show_upload_files : false,
            show_download_files : false,
            show_file_server : false,
        };

        this.onAssignProps = this.onAssignProps.bind(this);
        this.onSwitch = this.onSwitch.bind(this);
    };

    onSwitch(e){
        switch (e.target.name) {
            case 'upload-files':
                this.setState({
                    show_upload_files : true,
                    show_download_files : false,
                    show_file_server : false,
                });break;

            case 'download-files':
                this.setState({
                    show_upload_files : false,
                    show_download_files : true,
                    show_file_server : false,
                });break;

            case 'list-files':
                this.setState({
                    show_upload_files : false,
                    show_download_files : false,
                    show_file_server : true,
                });break;

            default: break;
        }
    }

    onAssignProps(){
        console.log('Assigning props on sub personal detail client files');

        let client_files = Object.assign([],this.state.client_files);

        if (this.props.client_files !== undefined){
            client_files  = this.props.client_files
        }
        this.setState({
            client_files: client_files
        });
    }

    componentWillMount() {
        this.onAssignProps();

    }

    render(){
        return(
            <div className={'box box-primary'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-file-archive-o'> </i> Client Files Manager </strong></h3>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-danger pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong><i className={'fa fa-close'}> </i> Close </strong>

                    </button>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'upload-files'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong> <i className='fa fa-cloud-upload'> </i> Upload Files </strong>

                    </button>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'download-files'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong> <i className='fa fa-cloud-download'> </i> Download Files </strong>

                    </button>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'list-files'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong> <i className='fa fa-server'> </i> File Server </strong>

                    </button>
                </div>


                    {/*show_upload_files : false,*/}
                    {/*show_download_files : false,*/}
                    {/*show_file_server : true,*/}

                {
                    (this.state.show_upload_files) ?
                        <UploadFiles />
                    : ''
                }

                {
                    (this.state.show_file_server)?
                        <FileServer />
                    :''
                }






            </div>
        )
    }
}

class SubPersonalDetailControlPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            control_panel : {}
        };
    };

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-cogs'> </i> Control Panel </strong></h3>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-danger pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong><i className={'fa fa-close'}> </i> Close </strong>

                    </button>
                </div>






            </div>
        )
    }
}


class PersonalDetailManager extends Component{
    constructor(props){
        super(props);
        this.state = {
            personal_detail : {...clients_details},
            client_files : [],
            client_file : {...client_files_type},

            show_personal_details : false,
            show_control_panel : false,
            show_client_files : false

        };

        this.onSwitch = this.onSwitch.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onAssignProps = this.onAssignProps.bind(this);
        this.onLoadClientFiles = this.onLoadClientFiles.bind(this);
    };


    onLoadClientFiles(){

        let self = this;
        let client_id = this.state.personal_detail.client_id;

        Axios.get(centers_routes.load_client_files +client_id).then(function(response){
            if (response.status === 200){
                return response.data;
            }else{
                throw new Error('Error loading client files');
            }
        }).then(function(json_data){
            self.setState({
                client_files : json_data
            });
        }).catch(function(err){
            console.log(err.message);
        });
    }

    onAssignProps(){
        let personal_detail = Object.assign({},this.state.personal_detail);
        if (this.props.personal_detail !== undefined){
            personal_detail = this.props.personal_detail;
        }

        this.setState({
            personal_detail:personal_detail
        });
    }

    onClose(e){
        this.setState({
            show_personal_details : false,
            show_control_panel : false,
            show_client_files : false
        });
    }
    
    onSwitch(e){
        switch (e.target.name) {
            case 'personal-details':
                this.setState({
                    show_personal_details : true,
                    show_control_panel : false,
                    show_client_files : false
                });break;

            case 'control-panel':

                this.setState({
                    show_personal_details : false,
                    show_control_panel : true,
                    show_client_files : false
                });break;

            case 'client-files':

                this.setState({
                    show_personal_details : false,
                    show_control_panel : false,
                    show_client_files : true,

                });break;

            default:break;
        }
    }


    componentWillMount() {
        this.onAssignProps();
        this.onLoadClientFiles();
    }

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-user'> </i> Personal Detail Manager </strong></h3>
                    <button type={'button'} className={'btn btn-outline-danger btn-box-tool pull-right'} name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong><i className={'fa fa-eraser'}> </i> Close</strong>

                    </button>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'control-panel'}
                        onClick={e => this.onSwitch(e)}


                    >
                        <strong><i className={'fa fa-cogs'}> </i> Control Panel </strong>
                    </button>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'client-files'}
                        onClick={e => this.onSwitch(e)}


                    >
                        <strong><i className={'fa fa-user'}> </i> Client Files </strong>
                    </button>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'personal-details'}
                        onClick={e => this.onSwitch(e)}


                    >
                        <strong><i className={'fa fa-user'}> </i> Personal Details </strong>
                    </button>
                </div>

                {/*show_personal_details : true,*/}
                {/*show_control_panel : false,*/}
                {/*show_client_files : false*/}

                {
                    (this.state.show_personal_details)?
                        <SubPersonalDetailPersonalDetail

                            onClose={this.onClose}
                            personal_detail={this.state.personal_detail}
                        />


                    :''
                }

                {
                    (this.state.show_client_files)?
                        <SubPersonalDetailClientFiles
                            onClose={this.onClose}
                            client_files={this.state.client_files}
                        />
                        :''
                }

                {
                    (this.state.show_control_panel)?
                        <SubPersonalDetailControlPanel
                            onClose={this.onClose}
                        />
                        :''
                }





            </div>
        )
    }
}




class ContactDetailsManager extends Component{
    constructor(props){
        super(props);
        this.state = {
            contact_details : {}
        };
    };


    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className={'fa fa-mobile-phone'}> </i> Contact Details Manager </strong></h3>
                    <button
                        type={'button'}
                        className={'btn btn-outline-danger btn-box-tool pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong><i className={'fa fa-eraser'}> </i> Close</strong>

                    </button>

                </div>



            </div>
        )
    }
}

class PostalDetailManager extends Component{
    constructor(props){
        super(props);
        this.state = {
            postal_detail : {}
        };
    };

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className={'fa fa-envelope'}> </i> Postal Detail Manager </strong></h3>
                    <button
                        type={'button'}
                        className={'btn btn-outline-danger btn-box-tool pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong><i className={'fa fa-eraser'}> </i> Close</strong>

                    </button>

                </div>


            </div>
        )
    }
}

class PhysicalDetailManager extends Component{
    constructor(props){
        super(props);
        this.state = {
            physical_details : {},
        };
    };

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <em> <i className='fa fa-map-signs'> </i> Physical Address Manager </em></strong></h3>

                    <button
                        type={'button'}
                        className={'btn btn-outline-danger btn-box-tool pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong><i className={'fa fa-eraser'}> </i> Close</strong>

                    </button>

                </div>


            </div>
        )
    }
}


class CenterDetailManager extends Component{
    constructor(props){
        super(props);
        this.state = {
            center_detail : {}
        };
    };

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <em> <i className='fa fa-building-o'> </i> Center Detail Manager </em></strong></h3>

                    <button
                        type={'button'}
                        className={'btn btn-outline-danger btn-box-tool pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong><i className={'fa fa-eraser'}> </i> Close</strong>

                    </button>
                </div>
            </div>
        )
    }
}


class GroupsDetailManager extends Component{
    constructor(props){
        super(props);
        this.state = {
            group_detail : {}
        };
    };
    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <em> <i className='fa fa-users'> </i> Group Detail Manager </em></strong></h3>
                    <button
                        type={'button'}
                        className={'btn btn-outline-danger btn-box-tool pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong><i className={'fa fa-eraser'}> </i> Close</strong>

                    </button>

                </div>


            </div>
        )
    }
}



class LoansDetailManager extends Component{
    constructor(props){
        super(props);
        this.state = {
            loans_detail : {}
        };
    };
    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <em> <i className='fa fa-money'> </i>  Loans Detail Manager</em></strong></h3>
                    <button
                        type={'button'}
                        className={'btn btn-outline-danger btn-box-tool pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong><i className={'fa fa-eraser'}> </i> Close</strong>

                    </button>

                </div>
            </div>
        )
    }
}

class ClientManagementWindow extends Component{
    constructor(props){
        super(props);
        this.state = {
            client_detail : {...clients_details},

            show_personal_details : false,
            show_banking_details : false,
            show_contact_details : false,
            show_postal_address : false,
            show_physical_address : false,
            show_loans : false,
            show_group : false,
            show_center : false,
            show_meetings : false,
        };
        this.onAssignProps = this.onAssignProps.bind(this);
        this.onSwitch = this.onSwitch.bind(this);
        this.onClose = this.onClose.bind(this);
    };

    onClose(e){
        this.setState({
            show_personal_details : false,
            show_banking_details : false,
            show_contact_details : false,
            show_postal_address : false,
            show_physical_address : false,
            show_loans : false,
            show_group : false,
            show_center : false,
            show_meetings : false,
        });

    }

    onSwitch(e){
        switch(e.target.name){
            case 'personal':
                this.setState({
                    show_personal_details : true,
                    show_banking_details : false,
                    show_contact_details : false,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_loans : false,
                    show_group : false,
                    show_center : false,
                    show_meetings : false,

                });break;

            case 'banking':
                this.setState({
                    show_personal_details : false,
                    show_banking_details : true,
                    show_contact_details : false,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_loans : false,
                    show_group : false,
                    show_center : false,
                    show_meetings : false,

                });break;

            case 'contact':
                this.setState({
                    show_personal_details : false,
                    show_banking_details : false,
                    show_contact_details : true,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_loans : false,
                    show_group : false,
                    show_center : false,
                    show_meetings : false,

                });break;

            case 'postal':
                this.setState({
                    show_personal_details : false,
                    show_banking_details : false,
                    show_contact_details : false,
                    show_postal_address : true,
                    show_physical_address : false,
                    show_loans : false,
                    show_group : false,
                    show_center : false,
                    show_meetings : false,
                });break;

            case 'physical':
                this.setState({
                    show_personal_details : false,
                    show_banking_details : false,
                    show_contact_details : false,
                    show_postal_address : false,
                    show_physical_address : true,
                    show_loans : false,
                    show_group : false,
                    show_center : false,
                    show_meetings : false,

                });break;

            case 'loans':
                this.setState({
                    show_personal_details : false,
                    show_banking_details : false,
                    show_contact_details : false,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_loans : true,
                    show_group : false,
                    show_center : false,
                    show_meetings : false,

                });break;


            case 'group':
                this.setState({
                    show_personal_details : false,
                    show_banking_details : false,
                    show_contact_details : false,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_loans : false,
                    show_group : true,
                    show_center : false,
                    show_meetings : false,

                });break;

            case 'center':
                this.setState({
                    show_personal_details : false,
                    show_banking_details : false,
                    show_contact_details : false,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_loans : false,
                    show_group : false,
                    show_center : true,
                    show_meetings : false,

                });break;

            case 'meetings':
                this.setState({
                    show_personal_details : false,
                    show_banking_details : false,
                    show_contact_details : false,
                    show_postal_address : false,
                    show_physical_address : false,
                    show_loans : false,
                    show_group : false,
                    show_center : false,
                    show_meetings : true,

                });break;



            default:break;
        }
    }

    onAssignProps(){
        let client_detail = Object.assign({},this.state.client_detail);
        if (this.props.client_detail !== undefined){
            client_detail = this.props.client_detail;
        }
        this.setState({
            client_detail:client_detail
        });
    }

    componentWillMount() {
        this.onAssignProps();
    }

    render(){
        return(
            <div className={'row'}>
                <div className={'col-md-4'}>
                    <div className={'box box-primary'}>
                        <div className={'box box-header'}>
                            <h3 className={'box-title'}><strong> Client Profile</strong></h3>
                        </div>

                        <ul className={'list-group'}>
                            <li className={'list-group-item'}><span> Client Name : <strong> <em> {this.state.client_detail.client_name} </em></strong> </span></li>
                            <li className={'list-group-item'}><span> Surname : <strong><em> {this.state.client_detail.surname} </em></strong> </span> </li>
                            <li className={'list-group-item'}><span> Gender : <strong> <em> {this.state.client_detail.gender} </em></strong></span> </li>
                            <li className={'list-group-item'}><span> ID Number : <strong> <em> {this.state.client_detail.id_number} </em></strong></span> </li>
                        </ul>


                    </div>
                    <div className={'box box-primary'}>
                        <div className={'box box-header'}>
                            <h3 className={'box-title'}><strong> Dashboard</strong></h3>
                        </div>

                        <ul className={'list-group'}>
                            <li className={'list-group-item'}>
                                <button type={'button'}
                                        className={'btn btn-box-tool btn-outline-dark'}
                                        name={'personal'}
                                        onClick={e => this.onSwitch(e)}
                                >
                                    <strong><i className='fa fa-male'> </i> Personal Details </strong>

                                </button>

                            </li>
                            <li className={'list-group-item'}>
                                <button type={'button'}
                                        className={'btn btn-box-tool btn-outline-dark'}
                                        name={'banking'}
                                        onClick={e => this.onSwitch(e)}
                                >
                                    <strong><i className='fa fa-bank'> </i> Banking Details </strong>

                                </button>

                            </li>



                            <li className={'list-group-item'}>
                                <button type={'button'}
                                        className={'btn btn-box-tool btn-outline-dark'}
                                        name={'contact'}
                                        onClick={e => this.onSwitch(e)}
                                >
                                    <strong><i className={'fa fa-mobile-phone'}> </i> Contact Details </strong>

                                </button>
                            </li>

                            <li className={'list-group-item'}>
                                <button type={'button'}
                                        className={'btn btn-box-tool btn-outline-dark'}
                                        name={'postal'}
                                        onClick={e => this.onSwitch(e)}
                                >
                                    <strong> <i className='fa fa-envelope-square'> </i> Postal Address </strong>

                                </button>

                            </li>

                            <li className={'list-group-item'}>
                                <button
                                    type={'button'}
                                    className={'btn btn-box-tool btn-outline-dark'}
                                    name={'physical'}
                                    onClick={e => this.onSwitch(e)}
                                >
                                    <strong> <i className='fa fa-map-signs'> </i> Physical Address </strong>

                                </button>
                            </li>

                            <li className={'list-group-item'}>
                                    <button
                                        type={'button'}
                                        className={'btn btn-box-tool btn-outline-dark'}
                                        name={'loans'}
                                        onClick={e => this.onSwitch(e)}
                                    >
                                        <strong> <i className='fa fa-money'> </i> Loans </strong>

                                    </button>
                            </li>
                            <li className={'list-group-item'}>
                                <button
                                    type={'button'}
                                    className={'btn btn-box-tool btn-outline-dark'}
                                    name={'group'}
                                    onClick={e => this.onSwitch(e)}

                                >
                                    <strong> <i className='fa fa-users'> </i> Groups </strong>
                                </button>
                            </li>

                            <li className={'list-group-item'}>
                                <button
                                    type={'button'}
                                    className={'btn btn-box-tool btn-outline-dark'}
                                    name={'center'}
                                    onClick={e => this.onSwitch(e)}
                                >
                                    <strong> <i className='fa fa-building-o'> </i> Center </strong>

                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className={'col-md-8'}>
                    <div className={'box box-footer'}>
                        <div className={'box box-header'}>
                            <h3 className={'box-title'}> <strong> <em> <i className={'fa fa-user-md'}> </i>  Client Details </em> </strong></h3>
                        </div>

                    {/*show_personal_details : false,*/}
                    {/*show_contact_details : false,*/}
                    {/*show_postal_address : false,*/}
                    {/*show_physical_address : false,*/}
                    {/*show_loans : false,*/}
                    {/*show_group : false,*/}
                    {/*show_center : true,*/}
                    {/*show_meetings : false,*/}



                        {
                            (this.state.show_personal_details)?
                                <PersonalDetailManager
                                    onClose={this.onClose}
                                    personal_detail={this.state.client_detail}
                                /> : ''
                        }

                        {
                            (this.state.show_banking_details)?
                                <BankingDetailManager onClose={this.onClose} /> : ''
                        }

                        {
                            (this.state.show_contact_details)?
                                <ContactDetailsManager onClose={this.onClose}/> :''
                        }

                        {
                            (this.state.show_postal_address)?
                                <PostalDetailManager onClose={this.onClose}/> : ''
                        }

                        {
                            (this.state.show_physical_address) ?
                                <PhysicalDetailManager onClose={this.onClose}/> : ''
                        }

                        {
                            (this.state.show_loans)?
                                <LoansDetailManager onClose={this.onClose}/> : ''
                        }

                        {
                            (this.state.show_group)?
                                <GroupsDetailManager onClose={this.onClose}/> : ''
                        }
                        {
                            (this.state.show_center)?
                                <CenterDetailManager onClose={this.onClose}/> : ''
                        }




                    </div>
                </div>
            </div>
        )
    }
}


class ClientManListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            client_item : {},
            group_detail : {},
            show_client_id: '',
            show_client_detail : false,
        };
        this.onAssignProps = this.onAssignProps.bind(this);
        this.onLoadGroup = this.onLoadGroup.bind(this);
        this.onClickClient = this.onClickClient.bind(this);
    };

    // correction---show client window on the previous window
    onClickClient(client_id){
        console.log(client_id);
        this.props.onShowClient(client_id);


        this.setState({
            show_client_id : client_id,
            show_client_detail: true
        });
    }

    onLoadGroup(group_id){
        let self = this;
        Axios.get(centers_routes.load_group_byid_url+group_id).then(function(response){
            if (response.status === 200){
                return response.data;
            }else{
                throw new Error('Error loading group detail')
            }
        }).then(function(json_data){
            console.log('Returned Group ');
            console.log(json_data);
            self.setState({
                group_detail:json_data
            });
        }).catch(function(err){
            console.log(err.message);
        })
    }

    onAssignProps(e){
        let client_item = Object.assign({},this.state.client_item);
        if (this.props.client !== undefined){
            client_item = this.props.client;
            this.onLoadGroup(client_item.group_id);
        }

        this.setState({
            client_item:client_item
        });
    }

    componentWillMount(e) {
        this.onAssignProps(e)
    }

    render(){
        return(
            <tr>
                <td
                    className={'btn active'}

                    onClick={e => {
                        let client_id = this.state.client_item.client_id;
                        return(
                            this.onClickClient(client_id)
                        )
                    }}
                >
                    <strong> <i className='fa fa-link'> </i>    {this.state.client_item.client_name} </strong>

                </td>
                <td>{this.state.client_item.surname}</td>
                <td>{this.state.client_item.gender}</td>
                <td>{this.state.client_item.id_number}</td>
                <td>
                   {this.state.group_detail.group_name}

                </td>
            </tr>
        )
    }
}

class ClientManagementList extends Component{
    constructor(props){
        super(props);
        this.state = {
            client_list : []
        };
        this.onAssignProps = this.onAssignProps.bind(this);
        this.onShowClient = this.onShowClient.bind(this);
    };

    onShowClient(client_id){
        this.props.onShowClient(client_id);

    }

    onAssignProps(e){
        let client_list = Object.assign({},this.state.client_list);

        if (this.props.client_list !== undefined){
            client_list = this.props.client_list;
            console.log(client_list);
        }

        this.setState({
            client_list : client_list
        });
    }


    componentWillMount(e) {
        this.onAssignProps(e);
    }


    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i  className={'fa fa-server'}> </i> Client List</strong></h3>
                </div>

                <table className='table table-striped table-responsive'>
                    <thead>
                        <tr>
                            <td><strong><i className={'fa fa-user'}> </i> Names</strong></td>
                            <td><strong><i className={'fa fa-user-md'}> </i> Surname</strong></td>
                            <td><strong><i className='fa fa-genderless'> </i> Gender</strong></td>
                            <td><strong><i className='fa fa-code'> </i> ID</strong></td>
                            <td><strong><i className='fa fa-users'> </i> Group</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                this.state.client_list.map((client,index) => {
                                    return(
                                        <ClientManListItem
                                            client={client}
                                            key={index}
                                            onShowClient={this.onShowClient}/>
                                    )
                                })
                            }

                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong><i className={'fa fa-user'}> </i> Names</strong></td>
                            <td><strong><i className={'fa fa-user-md'}> </i> Surname</strong></td>
                            <td><strong><i className='fa fa-genderless'> </i> Gender</strong></td>
                            <td><strong><i className='fa fa-code'> </i> ID</strong></td>
                            <td><strong><i className='fa fa-users'> </i> Group</strong></td>
                        </tr>
                    </tfoot>

                </table>
            </div>
        )
    }
}

class ClientManagement extends Component{
    constructor(props){
        super(props);
        this.state = {
            clients_list : [],
            client_detail : {...clients_details},
            show_client_list : false,
            show_client_window: false

        };

        this.onLoadClients = this.onLoadClients.bind(this);
        this.onSwitch = this.onSwitch.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onShowClient = this.onShowClient.bind(this);
    };


    onShowClient(client_id){
        let client_detail = this.state.clients_list.find(client => client.client_id === client_id);
        console.log('We will be showing the following client');
        console.log(client_detail);

        this.setState({
            show_client_list : false,
            show_client_window : true,
            client_detail:client_detail
        })
    }


    onClose(e){
        console.log('Calling onClose with');
        console.log(e.target);
        this.props.onClose(e);
    }


    onSwitch(e){
        let self = this;
        switch (e.target.name) {
            case 'load-clients':
                self.setState({
                    show_client_list : true,
                    show_client_window : false,
                });break;

            default:break;
        }

    }

    onLoadClients(e){
        let self = this;
        Axios.get(centers_routes.load_all_clients_url).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error('Error loading clients')
            }
        }).then(function(json_data){
            console.log(json_data);
            self.setState({
                clients_list : json_data
            });
        }).catch(function(err){
            let message = err.message;
            console.log(message);
        })
    }


    componentWillMount(e) {
        this.onLoadClients(e);
    }

    render(){
        return(
            <div className={'box box-primary'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-user-md'> </i> Client Management </strong></h3>

                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-danger pull-right'}
                        name={'close'}
                        onClick={e => this.onClose(e)}
                    >
                        <strong> <i className='fa fa-close'> </i> Close </strong>

                    </button>
                    <button type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'load-clients'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong><i className={'fa fa-server'}> </i> Client List </strong>

                    </button>
                </div>

                {
                    (this.state.show_client_list)?
                        <ClientManagementList
                            onClose={this.onClose}
                            client_list={this.state.clients_list}
                            onShowClient={this.onShowClient}
                        />
                    :''
                }

                {
                    (this.state.show_client_window)?
                        <ClientManagementWindow client_detail={this.state.client_detail}/>
                    :''
                }



            </div>
        )
    }
}


class Loans extends Component{
    constructor(){
        super();
        this.state = {
            group_loans : [],
            loan_terms : {},
            show_loan_activations : false,
            show_loan_payments : false,
            show_loan_terms : false,
            show_client_management : false,
            show_user_messaging : false,
            show_finances : false,

            //messaging
        };

        this.onSwitch = this.onSwitch.bind(this);
        this.loadGroupLoans = this.loadGroupLoans.bind(this);
        this.onClose = this.onClose.bind(this);
        this.loadLoanTerms = this.loadLoanTerms.bind(this);
    }

    onClose(e){
        this.setState({
            show_loan_activations: false,
            show_loan_payments: false,
            show_loan_terms : false,
            show_client_management : false,
            show_user_messaging : false,
            show_finances : false,

        });
    }

    onSwitch(e){
        switch (e.target.name) {
            case 'activate-loan':

                this.setState({
                    show_loan_activations: true,
                    show_loan_payments: false,
                    show_loan_terms : false,
                    show_client_management : false,
                    show_user_messaging : false,
                    show_finances : false,
                });
                
                break;

            case 'loan-payments':
                this.setState({
                    show_loan_activations: false,
                    show_loan_payments: true,
                    show_loan_terms : false,
                    show_client_management : false,
                    show_user_messaging : false,
                    show_finances : false,

                });
                break;

            case 'loan-terms':
                this.setState({
                    show_loan_activations: false,
                    show_loan_payments: false,
                    show_loan_terms : true,
                    show_client_management : false,
                    show_user_messaging : false,
                    show_finances : false,
                });break;

            case 'client-management':
                this.setState({
                    show_loan_activations: false,
                    show_loan_payments: false,
                    show_loan_terms : false,
                    show_client_management : true,
                    show_user_messaging : false,
                    show_finances : false,
                });break;

            case 'messaging':
                this.setState({
                    show_loan_activations: false,
                    show_loan_payments: false,
                    show_loan_terms : false,
                    show_client_management : false,
                    show_user_messaging : true,
                    show_finances : false,
                });break;

            case 'finances':
                this.setState({
                    show_loan_activations: false,
                    show_loan_payments: false,
                    show_loan_terms : false,
                    show_client_management : false,
                    show_user_messaging : false,
                    show_finances : true,
                });break;


        
            default:
                break;
        }

    }

    loadLoanTerms(e){

    }
    loadGroupLoans(e){
        let self = this;
        Axios.get(centers_routes.load_group_loans).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error('There was an error fetching group loans');
            }
        }).then(function(json_data){
            self.setState({
                group_loans : json_data
            });
        }).catch(function(err){
            console.log(err.message);
        })
    }

    componentWillMount(e){

        this.loadGroupLoans(e);
        this.loadLoanTerms(e);
    }
    render() {
        return (
            <div className="loans">


            <div className="box box-header">
                    <h3 className="box-title"> <strong> <i className='fa fa-credit-card-alt'> </i> Loan Management Tasks </strong></h3>

                    <button type={'button'} className="btn btn-box-tool btn-outline-dark pull-right" name="loan-terms"
                            onClick={e => this.onSwitch(e)}> <strong> <i className={'fa fa-plus-circle'}> </i> Loan Terms </strong>
                    </button>

                    <button type={'button'} className="btn btn-box-tool btn-outline-dark pull-right" name="activate-loan"
                            onClick={e => this.onSwitch(e)}> <strong> <i className={'fa fa-plus-circle'}> </i> Activate Loans </strong>
                    </button>
                    <button type={'button'} className='btn btn-box-tool btn-outline-dark pull-right' name={'loan-payments'}
                        onClick={e => this.onSwitch(e)}> <strong> <i className={'fa fa-plus-circle'}> </i> Loan Payments </strong>
                    </button>
                    <button type={'button'}
                            className={'btn btn-box-tool btn-outline-dark pull-right'}
                            name={'client-management'}
                            onClick={e => this.onSwitch(e)}
                    >
                        <strong><i className='fa fa-user-md'> </i> Client Management </strong>

                    </button>

                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'messaging'}
                        onClick={e => this.onSwitch(e)}

                    >
                        <strong><i className={'fa fa-envelope'}> </i> User Messaging </strong>

                    </button>

                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'finances'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong><i className='fa fa-credit-card-alt'> </i> Finances </strong>

                    </button>
            </div>
                {
                    (this.state.show_loan_activations)?
                            <ActivateLoans

                                onClose={this.onClose}
                            />
                        :''
                }
                {
                    (this.state.show_loan_payments)?
                            <LoanPayments
                                onClose={this.onClose}
                            />
                        :''
                }
                {
                    (this.state.show_loan_terms)?
                        <LoanTerms
                            onClose={this.onClose}
                        />
                    :''
                }
                {
                    (this.state.show_client_management)?
                        <ClientManagement onClose={this.onClose} />
                    :''
                }
                {
                    (this.state.show_user_messaging)?
                        <UserMessaging onClose={this.onClose}/>
                    :''
                }
                {
                    (this.state.show_finances)?
                        <Finances onClose={this.onClose}/>
                    :''
                }
        </div>
        )
    }
}

export default   Loans;