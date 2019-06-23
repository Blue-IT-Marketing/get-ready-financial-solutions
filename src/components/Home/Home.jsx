import React, {Component}  from 'react';
import './Home.css';
import Intro from '../Intro/Intro';
import Axios from "axios";
import * as centers_routes from '../../constants/centers-routes';
import * as Utils from '../../constants/utilities';
import InlineError from '../Forms/InlineError';
import InlineMessage from "../Forms/InlineMessage";

export let loan_requests_details =
    {
    request_id : "",
    names : "",
    cell : "",
    email : "",
    province : "",
    city : "",
    loan_amount : 1000,
    estimated_income : 6000
};


class HomePage extends Component{
    constructor(){
        super();
        this.state = {
            info : ""
        };
    };

    render() {
        return (

            <div>
                <div className="box box-header">
                    <h3 className="box-title"> <strong>Get Ready Investments </strong></h3>
                </div>

                <div className="row">
                    <div className="col-md-9">

                        <div className="box box-body">
                            <div className="box box-header">
                                <h3 className="box-title"><strong>Get Ready Cooperative Financial Institution</strong></h3>
                            </div>
                            <blockquote>
                                We encourage projects, small businesses, group of cooperatives and individuals to come and save with us in the Get Ready Cooperative Financial Institution. Get Ready CFI has the potential of reaching greater heights and we are looking forward to break the cycle of poverty in our society.
                            </blockquote>

                        </div>

                        <div className="box box-body">

                            <div className="box box-header">
                                <h3 className="box-title"><strong>Cooperative Financial Institution (CFI)</strong></h3>
                            </div>

                            <h4><strong>What is a Cooperative Financial Institution:</strong></h4>
                                    <blockquote>A financial institution that is owned and operated by its members. The goal of a financial cooperative is to act on behalf of a unified group as a traditional banking service Get Ready Centre has initiated the Cooperative program in December 2014, with a vision of extending/developing the Cooperative Financial Institution into a Cooperative Bank and also bank-up the alluded groups. Another objective is to see target group able to access better services from us as Get Ready.</blockquote>
                        </div>

                        <div className="box box-body">
                            <div className="box box-header">
                                <h4 className="box-title"><strong>Savings Mobilisation:</strong></h4>
                            </div>
                            <blockquote>The Principle/key around the cooperative is savings mobilisation. By savings mobilisation, members of the cooperative are encouraged to make regular savings. the savings might be done on a daily, weekly, monthly or quarterly basis depending on each member's personal decision or commitment. Deposits are made directly into Get Ready Cooperative Financial Institution FNB Account through a debit order or ATM Deposits. Members of the CFI meet regularly to discuss issues concerning the cooperative and also receive training. We also say saving is key; it is a form of wealth creation.</blockquote>

                            <blockquote>Saving determine the amount of loan that can be borrowed-the higher the saving the higher the loan amount.</blockquote>
                            <blockquote>Saving substitute physical collateral required by banks and loan shark, they act as a guarantee. When members save together they guarantee each other. Savings help member to cater for household needs.</blockquote>
                        </div>

                          <div className="box box-body">
                                <div className="box box-header">
                                    <h4 className="box-title"><strong>Activities</strong></h4>
                                </div>
                                <span>Develop communities, focusing on the small business, conducting services to unemployed people, assist people who don’t have access to bank loans and assist those who are to start business especially women, youth and other relevant needy groups</span>

                          </div>


                    </div>

                    <div className="col-md-3">

                    </div>

                </div>
            </div>

        )


    }
};




class LoanRequests extends Component{
    constructor(){
        super();
        this.state = {
            loan_request : {...loan_requests_details},
            
            names_error :'',
            cell_error : '',
            email_error : '',
            province_error : '',
            city_error : '',
            loan_amount_error : '',
            estimate_income_error : '',

            form_response : ""
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onDoRequest = this.onDoRequest.bind(this);
        this.doCheckErrors = this.doCheckErrors.bind(this);
    };


    onChangeHandler(e){
        let loan_request = Object.assign({},this.state.loan_request);
        switch(e.target.name){
            case 'names' : loan_request.names = e.target.value;break;
            case 'cell' : loan_request.cell = e.target.value;break;
            case 'email' : loan_request.email = e.target.value;break;
            case 'province' : loan_request.province = e.target.value;break;
            case 'city' : loan_request.city = e.target.value;break;
            case 'loan_amount' : loan_request.loan_amount = e.target.value;break;
            case 'estimated_income' : loan_request.estimated_income = e.target.value;break;

            default:break;
        };

        this.setState({
            loan_request:loan_request,
            names_error :'',
            cell_error : '',
            email_error : '',
            province_error : '',
            city_error : '',
            loan_amount_error : '',
            estimate_income_error : '',
            form_response : ''

        });

    };

    onDoRequest(e){

        let self = this;
        let loan_request = Object.assign({},this.state.loan_request);
        console.log('LOAN Request' + JSON.stringify(loan_request));

        Axios.post(centers_routes.create_loan_request_url,'&data=' + JSON.stringify(self.state.loan_request)).then(
            function (response) {
                if (response.status === 200){
                    return response.data
                }else{
                    throw new Error("Error creating loan request")
                }
            }
        ).then(function (data) {
            let message = data.message;

            self.setState({
                form_response : message
            });
        }).catch( function(err){
            let message = err.message;
            self.setState({
                form_response : message
            });
        })

    }


    doCheckErrors(){
        let loan_request = Object.assign({},this.state.loan_request);

        let isError = false;

        if (Utils.isEmpty(loan_request.names) === true){
            this.setState({
                names_error : 'Names field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isCell(loan_request.cell) === false){
            this.setState({
                cell_error : 'Cell field is Invalid'
            });
            isError = true;
        }

        if (Utils.validateEmail(loan_request.email) === false){
            this.setState({
                email_error : 'Email field is invalid'
            });
            isError = true;
        }

        if (Utils.isProvince(loan_request.province) === false){
            this.setState({
                province_error : 'Please select Province'
            });
            isError = true;
        }

        if (Utils.isEmpty(loan_request.city) === true){
            this.setState({
                city_error: "City field cannot be Empty"
            });
            isError = true;
        }

        if (Utils.isNumber(loan_request.loan_amount) === false){
            this.setState({
                loan_amount_error : 'Please select loan amount'
            });
            isError = true;
        }

        if (Utils.isNumber(loan_request.estimated_income) === false){
            this.setState({
                estimate_income_error: 'Please select estimated income'
            });
            isError = true;
        }
        return isError;

    }
    render(){
        return (
            <form className="form-horizontal">
                <div className="box box-header">
                    <h3 className="box-title"> <strong> <i className='fa fa-cc-mastercard'> </i> Loan Requests</strong></h3><br />
                    <small>Use this form to request loans from us</small>
                </div>
                <div className="col-md-6">
                <div className='box box-footer'>

                    <div className="form-group">
                        <label> <strong>
                            <i className='fa fa-user'> </i> Names </strong>
                        </label>
                            <input type="text" name="names" className="form-control" value={this.state.loan_request.names} onChange={e => this.onChangeHandler(e)} />
                            {(this.state.names_error)? <InlineError message={this.state.names_error}/>:''}
                    </div>


                    <div className="form-group">
                        <label>
                            <strong>
                                <i className='fa fa-mobile-phone'> </i> Cell </strong>
                            </label>
                        
                            <input type="text" name="cell" className="form-control" value={this.state.loan_request.cell} onChange={e => this.onChangeHandler(e)} />
                            {(this.state.cell_error)? <InlineError message={this.state.cell_error} />:'' }
                        
                    </div>


                    <div className="form-group">
                            <label> <strong> <i className='fa fa-envelope'> </i> Email</strong> </label>
                            <input type="text" name="email" className="form-control" value={this.state.loan_request.email} onChange={e => this.onChangeHandler(e)} />
                            {(this.state.email_error)? <InlineError message={this.state.email_error} />: ''}
                    </div>

                    <div className="form-group">
                            <label> <strong> <i className='fa fa-map-marker'> </i> Province</strong></label>
                            <select className='form-control' name='province' value={this.state.loan_request.province} onChange={e => this.onChangeHandler(e)} >
                                <option value='limpopo'>Limpopo</option>
                                <option value='mpumalanga'>Mpumalanga</option>
                                <option value='north west'>North West</option>
                                <option value='gauteng'>Gauteng</option>
                                <option value='orange free state'>Orange Free State</option>
                                <option value='eastern cape'>Eastern Cape</option>
                                <option value='western cape'>Western Cape</option>
                                <option value='northern cape'>Northern Cape</option>
                                <option value='kwazulu natal'>Kwa Zulu Natal</option>
                            </select>                            
                            {(this.state.province_error)? <InlineError message={this.state.province_error} /> : ''}
                    </div>

                    <div className="form-group">
                            <label> <strong> <i className='fa fa-map-pin'> </i> City</strong> </label>                        
                            <input type="text" name="city" className="form-control" value={this.state.loan_request.city} onChange={e => this.onChangeHandler(e)} />
                            {(this.state.city_error)? <InlineError message={this.state.city_error} /> : ''}                        
                    </div>
                    <div className='box box-footer'>
                        <div className='box box-header'>
                            <h3 className='box-title'><strong> <i className='fa fa-cc-mastercard'> </i> Request Loan </strong></h3>
                        </div>
                    <div className="form-group">
                            <label> <strong> <i className='fa fa-money'> </i> Estimated Income</strong> </label>
                        
                            <select className='form-control' name='estimated_income' value={this.state.loan_request.estimated_income} onChange={e => this.onChangeHandler(e)} >
                                <option value='3500'> R 3,500.00</option>
                                <option value='5000'> R 5,000.00</option>
                                <option value='7500'> R 7,500.00</option>
                                <option value='10000'> R 10,000.00</option>
                                <option value='12500'> R 12,500.00</option>
                                <option value='15000'> R 15,000.00</option>
                                <option value='17500'> R 17,500.00</option>
                                <option value='20000'> R 20,000.00</option>
                                <option value='22500'> R 22,500.00</option>
                            </select>
                            {(this.state.estimate_income_error)? <InlineError message={this.state.estimate_income_error} /> : ''}
                        
                    </div>

                    

                    <div className="form-group">
                                <label> <strong> <i className='fa fa-money'> </i> Loan Amount</strong></label>
                        
                            <select className='form-control' name='loan_amount' value={this.state.loan_request.loan_amount} onChange={e => this.onChangeHandler(e)}>
                                <option value='1000'>R 1,000.00</option>
                                <option value='1500'>R 1,500.00</option>
                                <option value='2000'>R 2,000.00</option>
                                <option value='2500'>R 2,500.00</option>
                                <option value='3000'>R 3,000.00</option>
                                <option value='3500'>R 3,500.00</option>
                                <option value='4000'>R 4,000.00</option>
                                <option value='4500'>R 4,500.00</option>
                                <option value='5000'>R 5,000.00</option>
                                <option value='7500'>R 7,500.00</option>
                                <option value='10000'>R 10,000.00</option>
                                <option value='12500'>R 12,500.00</option>
                                <option value='15000'>R 15,000.00</option>
                            </select>
                        {(this.state.loan_amount_error)? <InlineError message={this.state.loan_amount_error} /> : ''}
                    </div>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-success btn-outline-dark" name="request" 
                            onClick={e =>{
                                if (this.doCheckErrors() === false){
                                    this.onDoRequest(e)
                                }
                                
                            } } > 

                            <strong> <i className='fa fa-cc-mastercard'> </i> Do Request </strong>
                        </button>
                         
                        <button type='button' className='btn btn-warning btn-outline-dark'
                        
                            onClick={e => { 
                                this.setState({
                                    loan_request: loan_requests_details,

                                    names_error: '',
                                    cell_error: '',
                                    email_error: '',
                                    province_error: '',
                                    city_error: '',
                                    loan_amount_error: '',
                                    estimate_income_error: '',

                                    form_response: ""
                                });
                             }}
                        >
                            <strong> <i className='fa fa-eraser'> </i> Reset</strong>
                        </button>
                    </div>

                    <div className='form-group'>
                        {(this.state.form_response) ? <InlineMessage message={this.state.form_response} message_type={'info'}/> : ''}
                    </div>

                    </div>
                </div>
            </form>
        )
    }
}


class Home extends Component{
    constructor(){
        super();
        this.state = {
            show_home : true,
            show_request_loan : false
        };

        this.onShow = this.onShow.bind(this);

    }


    onShow(e){

        switch(e.target.name){
            case "home" :
                this.setState({
                    show_home : true,
                    show_request_loan : false
                });
                break;
            case "request-loan":
                this.setState({
                    show_home : false,
                    show_request_loan : true
                });
                break;
            default: break;
        }

    }


    render(){
    return (
            <div className="home">
                 <Intro/>

                 <div className="row">
                        <div className="col-lg-3">
                            <div className="box box-primary">
                                <div className="box box-header">
                                    <h3 className="box-title"> <i className="fa fa-home"> </i> Home </h3>
                                </div>
                                <ul className='list-group'>
                                    <li className='list-group-item'><button type="button" className="btn btn-app btn-block" name="home" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-home"> </i> Home </strong></button></li>
                                    <li className='list-group-item'><button type="button" className="btn btn-app btn-block" name="request-loan" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-info"> </i> Request Loan </strong></button></li>
                                </ul>
                            </div>

                        </div>
                        <div className="col-lg-9">
                            <div className="box box-body">

                                {
                                    (this.state.show_home) ?
                                        <HomePage/>
                                    :""
                                }
                                {
                                    (this.state.show_request_loan) ?
                                        <LoanRequests/>
                                    :""
                                }


                            </div>

                        </div>
                 </div>


            </div>

        );
    }


};


export default Home;

