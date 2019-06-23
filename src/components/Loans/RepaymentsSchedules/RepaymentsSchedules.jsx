import React, { Component } from "react";
import './RepaymentsSchedules.css';
import InlineMessage from "../../Forms/InlineMessage";


export let repayments_details = {
    group_id : '',
    repayment_id : '',
    repayment_date : '',
    actual_payment : '',
    installment_amount : '',
    balance_remaining : '',
    loan_amount : '',
    total_amount_repayable : '',
    loan_id : '',
    reference : '',
    payment_verified : false
};

class RepaymentItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            repayment_item : {...repayments_details},
        };
        this.assignProps = this.assignProps.bind(this);
    };

    assignProps(e){
        let repayment_item = this.props.repayment_item;

        this.setState({
            repayment_item:repayment_item
        });
    };


    componentWillMount() {
        let e = new Event('Assign props');
        this.assignProps(e);
    };

    render(){
        return(
            <tr>
                <td>{this.state.repayment_item.repayment_date}</td>
                <td>{this.state.repayment_item.installment_amount}</td>
                <td>{this.state.repayment_item.actual_payment}</td>
                <td>{this.state.repayment_item.balance_remaining}</td>
                <td>{this.state.repayment_item.loan_amount}</td>
                <td>{this.state.repayment_item.total_amount_repayable}</td>
            </tr>
        )
    }
}

class Repayments extends Component{
    constructor(props){
        super(props);
        this.state = {
            repayments_list : [],
            repayment : {...repayments_details},
            form_response : ''
        };
    };

    render(){
        return(
            <div className={'box  box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-money'> </i> Repayments </strong></h3>
                </div>

                <table className={'table table-responsive'}>
                    <thead>
                        <tr>
                            <td><strong> <i className='fa fa-calendar'> </i> Date</strong></td>
                            <td><strong> <i className='fa fa-money'> </i> Installment Amount</strong></td>
                            <td><strong> <i className='fa fa-money'> </i> Actual Payment</strong></td>
                            <td><strong> <i className='fa fa-money'> </i> Balance</strong></td>
                            <td><strong> <i className={'fa fa-money'}> </i> Loan Amount </strong></td>
                            <td><strong> <i className={'fa fa-money'}> </i> Total</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.repayments_list.map(repayment_item => {
                            return(
                                <RepaymentItem
                                repayment_item = {repayment_item}
                                />
                            )
                        })
                    }

                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong> <i className='fa fa-calendar'> </i> Date</strong></td>
                            <td><strong> <i className='fa fa-money'> </i> Installment Amount</strong></td>
                            <td><strong> <i className='fa fa-money'> </i> Actual Payment</strong></td>
                            <td><strong> <i className='fa fa-money'> </i> Balance</strong></td>
                            <td><strong> <i className={'fa fa-money'}> </i> Loan Amount </strong></td>
                            <td><strong> <i className={'fa fa-money'}> </i> Total</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

class MakePayment extends Component{
    constructor(props){
        super(props);
        this.state = {
            payment : {...repayments_details},
            form_response : ''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.doMakePayment = this.doMakePayment.bind(this);
    };

    doMakePayment(e){


        this.setState({
            form_response : 'Payment Made successfully'
        })

    }

    onChangeHandler(e){
        let payment = Object.assign({},this.state.payment);
        switch (e.target.name) {
            case 'actual_payment': payment.actual_payment = e.target.value;break;
            default:break;
        }
        this.setState({
            payment:payment
        });

    }

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className={'fa fa-money'}> </i> Payments </strong></h3>
                </div>


                <form className={'form-horizontal col-md-6'}>
                    <div className={'form-group'}>
                        <label><strong><i className={'fa fa-money'}> </i> Installment Amount </strong></label>
                        <input type={'text'} className={'form-control'} value={this.state.payment.installment_amount} readOnly={true} />
                    </div>
                    <div className={'form-group'}>
                        <label><strong><i className={'fa fa-money'}> </i> Actual Payment</strong></label>
                        <input type={'text'} className={'form-control'} name={'actual_payment'} value={this.state.payment.actual_payment} onChange={e => this.onChangeHandler(e)} />
                    </div>
                    <div className={'form-group'}>
                        <button type={'button'} className={'btn btn-success'} name={'make-payment'}
                                onClick={e => this.doMakePayment(e)}>
                            <strong> <i className='fa fa-cc-mastercard'> </i> Make Payment </strong>

                        </button>
                        <button type={'button'} className={'btn btn-warning'} name={'reset'}
                            onClick={e => this.setState({
                                payment : {...repayments_details},
                                form_response : ''

                            })}
                        ><strong><i className={'fa fa-eraser'}> </i> Reset </strong>

                        </button>
                    </div>
                    <div className={'form-group'}>
                        {(this.state.form_response) ? <InlineMessage message={this.state.form_response} message_type={'INF'}/> : ''}
                    </div>
                </form>
            </div>
        )
    }
}

class RepaymentsSchedules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center_id: "",
            date: "",
            group_id: "",
            loan_officer_id: "",

            load_repayments : false,
            load_makepayment : false,

        };

        this.onClose = this.onClose.bind(this);
        this.onShow = this.onShow.bind(this);

    };

    onShow(e){

        switch(e.target.name){
            case 'load-makepayments':
                this.setState({
                    load_repayments : false,
                    load_makepayment : true

                });break;

            case 'load-repayments':
                this.setState({
                    load_repayments : true,
                    load_makepayment : false

                });break;



        }

    }


    onClose(e){

        this.props.onClose(e)

    }
    componentWillMount = () => {
        // load Centers List, loan Officers
    };

    render() {
        return (
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"><strong> <small> <i className='fa fa-money'> </i> Repayments Schedules</small> </strong></h3>


                    <button type={'button'} className={'btn btn-box-tool btn-outline-danger pull-right'}
                            onClick={e => this.onClose(e)}
                    >
                        <strong><i className={'fa fa-close'}> </i> Close </strong>
                    </button>
                    <button type={'button'} className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'load-repayments'}
                        onClick={e => this.onShow(e) }
                    >
                        <strong> <i className={'fa fa-money'}> </i> Repayments  </strong>

                    </button>
                    <button type={'button'} className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'load-makepayments'}
                        onClick={e => this.onShow(e) }
                    >
                        <strong> <i className={'fa fa-money'}> </i> Make Payment  </strong>
                    </button>
                </div>

                {
                    (this.state.load_repayments) ? <Repayments onClose={this.onClose}/> : ''
                }
                {
                    (this.state.load_makepayment) ? <MakePayment onClose={this.onClose}/> : ''
                }

            </div>
        );
    };

};

export default RepaymentsSchedules;