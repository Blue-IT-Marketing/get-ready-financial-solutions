
import React ,{ Component} from "react";
import Axios from "axios";
import * as centers_routes from '../../constants/centers-routes';
import * as Utils from '../../constants/utilities';
import InlineError from "../Forms/InlineError";

export let banking_details = {
    banking_id : '',
    account_holder : '',
    account_number : '',
    account_type : '',
    bank_name : '',
    branch_name : '',
    branch_code : '',
};

export class DisplayBanking extends Component{
    constructor(props){
        super(props);
        this.state = {
            banking_details : {...banking_details}

        };
        this.setBankingDetails = this.setBankingDetails.bind(this);
    };

    setBankingDetails(e){
        let banking_details = Object.assign({},this.state.banking_details);
        if (this.props.banking_details !== undefined){
            banking_details = this.props.banking_details
        }
        this.setState({
            banking_details:banking_details
        })

    }

    componentWillMount(e){
        this.setBankingDetails(e);
    }

    render(){
        return(
            <div className={'box box-body'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}>Banking Details</h3>
                </div>

                <ul className={'list-group'}>
                    <li className={'list-group-item'}><strong> Account Holder : </strong> {this.state.banking_details.account_holder}</li>
                    <li className={'list-group-item'}><strong> Account Number : </strong> {this.state.banking_details.account_number}</li>
                    <li className={'list-group-item'}><strong> Account Type : </strong> {this.state.banking_details.account_type}</li>
                    <li className={'list-group-item'}><strong> Bank Name : </strong> {this.state.banking_details.bank_name}</li>
                    <li className={'list-group-item'}><strong> Branch Name : </strong> {this.state.banking_details.branch_name}</li>
                    <li className={'list-group-item'}><strong> Branch Code : </strong> {this.state.banking_details.branch_code}</li>
                    <li className={'list-group-item'}><button className={'btn btn-success'}><strong><i className={'fa fa-print'}> </i> Print </strong></button> <button className={'btn btn-info'}><strong><i className={'fa fa-edit'}> </i> Edit </strong></button></li>
                </ul>

            </div>
        )
    }
}


class Banking extends Component{
    constructor(props){
        super(props);
        this.state = {
            banking_details : {...banking_details},

            account_holder_error : '',
            account_number_error : '',
            account_type_error : '',
            bank_name_error : '',
            branch_name_error : '',
            branch_code_error : '',

            form_response : "",

        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSaveHandler = this.onSaveHandler.bind(this);
        this.doCheckErrors = this.doCheckErrors.bind(this);
        this.doSetProps = this.doSetProps.bind(this);
    };

    doCheckErrors(){

        let isError = false;
        let banking_details = Object.assign({},this.state.banking_details);

        if (Utils.isEmpty(banking_details.account_holder) === true){
            this.setState({
                account_holder_error : 'Account Holder field cannot be empty'
            });

            isError = true;
        }
        if (Utils.isEmpty(banking_details.account_number) === true){
            this.setState({
                account_number_error : 'Account Number field cannot be empty'
            });
            isError = true;
        }
        if (Utils.isEmpty(banking_details.account_type) === true){
            this.setState({
                account_type_error : 'Please select account type'
            });
            isError = true;
        }

        if (Utils.isBank(banking_details.bank_name) === false){
            this.setState({
                bank_name_error : 'Please select bank'
            });
            isError = true;
        }

        if (Utils.isEmpty(banking_details.branch_name) === true){
            this.setState({
                branch_name_error : 'Branch Name cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(banking_details.branch_code) === true){
            this.setState({
                branch_code_error : 'Branch Code field cannot be empty'
            });
            isError = true;
        }

        return isError;
    }

    onChangeHandler(e){

        let banking_details = Object.assign({},this.state.banking_details);

        switch(e.target.name){
            case 'account_holder' : banking_details.account_holder = e.target.value;break;
            case 'account_number' : banking_details.account_number = e.target.value;break;
            case 'account_type' : banking_details.account_type = e.target.value;break;
            case 'bank_name' : banking_details.bank_name = e.target.value;break;
            case 'branch_name' : banking_details.branch_name = e.target.value;break;
            case 'branch_code' : banking_details.branch_code = e.target.value;break;
            default:break;
        }

        this.setState({
            banking_details : banking_details
        })
    }

    onSaveHandler(e){

        console.log("saving banking details");
        let banking_details  = Object.assign({}, this.state.banking_details);
        let self = this;

        Axios.post(centers_routes.save_bank_account_url,'&data=' + JSON.stringify(banking_details)).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error('Error saving banking details');
            }
        }).then(function(json_data){
            self.setState({
                banking_details : json_data
            });
            console.log("save banking completed");
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_message : message
            });
        })

    }
    doSetProps(e){
        let banking_details = Object.assign({}, this.state.banking_details);

        banking_details = this.props.banking_details;
        banking_details.banking_id = this.props.banking_id;

        this.setState({
            banking_details : banking_details
        });
    }
    componentWillMount(e){
        this.doSetProps(e);
    }

    render(){
        return(
            <div className={"box box-body"}>
                <div className={"box box-header"}>
                    <h3 className={"box-title"}> <strong> <i className={'fa fa-bank'}> </i> Banking Details </strong> </h3>
                </div>

                <form className={'form-horizontal'}>
                    <div className={'form-group'}>
                        <label> <strong> <i className={'fa fa-user'}> </i> Account Holder </strong></label>
                         <input type={'text'} className={'form-control'} name={'account_holder'} value={this.state.banking_details.account_holder} onChange={e => this.onChangeHandler(e)}
                        onClick={e => {
                             if (e.target.value === 'none'){
                                 e.target.value = ''
                             }
                         }}/>
                        {(this.state.account_holder_error)? <InlineError message={this.state.account_holder_error}/> :''}

                    </div>

                    <div className={'form-group'}>
                        <label> <strong> <i className='fa fa-credit-card-alt'> </i> Account Number </strong></label>
                        <input type={'text'} className={'form-control'} name={'account_number'} value={this.state.banking_details.account_number} onChange={e => this.onChangeHandler(e)}

                        onClick={e => {
                             if (e.target.value === 'none'){
                                 e.target.value = ''
                             }
                         }}
                        />
                        {(this.state.account_number_error)? <InlineError message={this.state.account_number_error}/> : '' }
                    </div>

                    <div className={'form-group'}>
                        <label> <strong> <i className={'fa fa-cc-mastercard'}> </i> Account Type </strong></label>
                        <select className={'form-control'} name={'account_type'} value={this.state.banking_details.account_type} onChange={e => this.onChangeHandler(e)}>
                            <option value={'savings'}>Savings</option>
                            <option value={'cheque'}>Cheque</option>
                            <option value={'transmission'}>Transmission</option>
                        </select>
                        {(this.state.account_type_error)? <InlineError message={this.state.account_type_error} />: ''}

                    </div>

                    <div className={'form-group'}>
                        <label> <strong> <i className={'fa fa-bank'}> </i> Bank Name </strong></label>

                            <select className={'form-control'} name={'bank_name'} value={this.state.banking_details.bank_name} onChange={e => this.onChangeHandler(e)} >
                                <option value={'fnb'}>First National Bank (FNB) </option>
                                <option value={'standard'}>Standard Bank</option>
                                <option value={'absa'}>ABSA (Alied Banks of South Africa)</option>
                                <option value={'nedbank'}>Nedbank</option>
                                <option value={'capitec'}>Capitec</option>
                                <option value={'postbank'}>Post Bank</option>
                            </select>
                        {(this.state.bank_name_error)? <InlineError message={this.state.bank_name_error} /> : ''}
                    </div>

                    <div className={'form-group'}>
                        <label> <strong> <i className={'fa fa-building-o'}> </i> Branch Name</strong></label>
                        <input type={'text'} className={'form-control'} name={'branch_name'} value={this.state.banking_details.branch_name} onChange={e => this.onChangeHandler(e)}
                            onClick={e => {
                                 if (e.target.value === 'none'){
                                     e.target.value = ''
                                 }
                             }}
                        />
                        {(this.state.branch_name_error) ? <InlineError message={this.state.branch_name_error} />: '' }
                    </div>

                    <div className={'form-group'}>
                        <label><strong> <i className={'fa fa-file-code-o'}> </i> Branch Code</strong></label>
                        <input type={'text'} className={'form-control'} name={'branch_code'} value={this.state.banking_details.branch_code} onChange={e => this.onChangeHandler(e)}
                        onClick={e => {
                             if (e.target.value === 'none'){
                                 e.target.value = ''
                             }
                         }}
                        />
                        {(this.state.branch_code_error)? <InlineError message={this.state.branch_code_error} /> : ''}

                    </div>

                    <div className={'form-group'}>
                        <button type={'button'} className={'btn btn-success btn-outline-dark'}
                                onClick={e =>
                                {if(this.doCheckErrors() === false){this.onSaveHandler(e)}
                                }}
                        >
                            <strong> <i className={'fa fa-save'}> </i> Save Banking Details  </strong>
                        </button>
                        <button
                            type={'button'}
                            className={'btn btn-warning btn-outline-dark'}
                            onClick={e => this.setState({

                                banking_details : {...banking_details},

                                account_holder_error : '',
                                account_number_error : '',
                                account_type_error : '',
                                bank_name_error : '',
                                branch_name_error : '',
                                branch_code_error : '',

                                form_response : "",
                            })}
                        >
                            <strong> <i className={'fa fa-eraser'}> </i> Reset </strong>

                        </button>
                    </div>
                </form>

            </div>
        )
    }
}


export default Banking;