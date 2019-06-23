import React, {Component} from "react";
import Axios from "axios";



class CentersHelp extends Component{
    constructor(){
        super();
        this.state = {
            help:''
        };
    };

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-life-saver'> </i> Centers Help</strong></h3>
                </div>
            </div>
        )
    }

}

class LoansHelp extends Component {
    constructor() {
        super();
        this.state = {
                loans_help : ''
        };
    };


    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-life-saver'> </i> Loans Help </strong></h3>
                </div>


            </div>
        )
    }
}


class RepaymentsHelp extends Component{
    constructor(){
        super();
        this.state = {
            repayments_help : ''
        };
    };

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-life-saver'> </i> Repayments Help </strong></h3>
                </div>
            </div>
        )
    }
}

class LoanManagerHelp extends Component{
    constructor(){
        super();
        this.state = {
            loan_manager_help : ''
        };
    };

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-life-ring'> </i> Loan Manager Help  </strong></h3>
                </div>




            </div>
        )
    }
}

class Help extends Component{
    constructor(){
        super();
        this.state = {

            load_centers_help : false,
            load_loans_help: false,
            load_repayments_help : false,
            load_clients_help : false,
            load_business_evaluation_help : false,
            load_manager_help : false,
        };

        this.onSwitch = this.onSwitch.bind(this);
        this.onClose = this.onClose.bind(this);
    };


    onClose(){



    }

    onSwitch(e){

        switch(e.target.name){
            case 'centers_help':
                this.setState({
                    load_centers_help : true,
                    load_loans_help: false,
                    load_repayments_help : false,
                    load_clients_help : false,
                    load_business_evaluation_help : false,
                    load_manager_help : false,
                });break;

            case 'loans_help':
                this.setState({
                    load_centers_help : false,
                    load_loans_help: true,
                    load_repayments_help : false,
                    load_clients_help : false,
                    load_business_evaluation_help : false,
                    load_manager_help : false,
                });break;
            case 'repayments_help':
                this.setState({
                    load_centers_help : false,
                    load_loans_help: false,
                    load_repayments_help : true,
                    load_clients_help : false,
                    load_business_evaluation_help : false,
                    load_manager_help : false,
                });break;
            case 'clients_help':
                this.setState({
                    load_centers_help : false,
                    load_loans_help: false,
                    load_repayments_help : false,
                    load_clients_help : true,
                    load_business_evaluation_help : false,
                    load_manager_help : false,
                });break;
            case 'business_evaluation_help':
                this.setState({
                    load_centers_help : false,
                    load_loans_help: false,
                    load_repayments_help : false,
                    load_clients_help : false,
                    load_business_evaluation_help : true,
                    load_manager_help : false,
                });break;
            case 'manager_help':
                this.setState({
                    load_centers_help : false,
                    load_loans_help: false,
                    load_repayments_help : false,
                    load_clients_help : false,
                    load_business_evaluation_help : false,
                    load_manager_help : true,
                });break;

            default:break;
        }

    }

    render(){
        return(
            <div className={'box box-primary'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-life-saver'> </i> Help </strong></h3>


                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'centers_help'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong>Centers Help</strong>

                    </button>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'loans_help'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong>Group Loans Help</strong>

                    </button>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'repayments_help'}
                        onClick={e => this.onSwitch(e)}

                    >
                        <strong>Group Repayments Help</strong>

                    </button>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'manager_help'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong>Loan Manager Help</strong>

                    </button>
                </div>


                {
                    (this.state.load_centers_help) ?
                        <CentersHelp /> : ''
                }
                {
                    (this.state.load_loans_help)?
                        <LoansHelp/> : ''
                }
                {
                    (this.state.load_repayments_help)?
                        <RepaymentsHelp />
                    :''
                }

                {
                    (this.state.load_manager_help) ?
                        <LoanManagerHelp/>
                    :''
                }
            </div>
        )
    }
}


export default Help;