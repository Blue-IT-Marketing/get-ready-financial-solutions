import React, { Component } from "react";
import Intro from '../../Intro/Intro';
import LoansMenu from '../LoansMenu/LoansMenu';
import './loan-application.css';

class LoanApplication extends Component {
    constructor () {
        super();
        this.state = {
            edo_id : "",
            center_id : "",
            group_name : "",
            application_date : "",
            disbursement_date : "",
            group_account_number : ""
        }
    };

    onChange (e) {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit (e){
        e.preventDefault();
        console.log(this.state);

    }

    componentWillMount (e){
        // Load Edo's List
        // Load Centers List


    };

    render () 
    {
        return (
        <div className="loan-application">
            <Intro />
            <div className="row">
            <div className="col-md-3">
                <LoansMenu />
            </div>

            <div className="col-md-8">
                <div className="box box-body">
                    <div className="box box-header">
                                <h3 className="box-title"> <small>Loan Application Form</small></h3>
                    </div>

                    <div className="box box-footer">
                        <form className="form-horizontal">
                            <div className="form-group">
                                        <select className="form-control" name="edo_id" value={this.state.edo_id} onChange={e => this.onChange(e) }>
                                        <option>Select EDO</option>
                                    </select>
                            </div>
                            <div className="form-group">
                                        <select className="form-control" name="center_id" value={this.state.center_id} onChange={e => this.onChange(e)}>
                                        <option>Select Center</option>
                                    </select>
                            </div>

                            <div className="form-group">
                                        <input type="text" className="form-control" name="group_name" placeholder="Group Name" value={this.state.group_name} onChange={e => this.onChange(e)} />
                            </div>

                            <div className="form-group">
                                        <input type="text" className="form-control" name="disbursement_date" placeholder="Disbursement Date" value={this.state.disbursement_date} onChange={e => this.onChange(e)}/>
                            </div>

                            <div className="form-group">
                                        <input type="text" className="form-control" name="group_account_number" placeholder="Group Account Number" value={this.state.group_account_number} onChange={e => this.onChange(e)}/>
                            </div>

                            <div className="form-group">
                                <button type="button" className="btn btn-primary btn-block" name="submit" onClick={ e => this.onSubmit(e)}> <strong> Submit</strong></button>
                            </div>
                        
                        </form>
                    </div>

                </div>
            </div>
            </div>
        </div>
        );
    
    }
}


export default LoanApplication;