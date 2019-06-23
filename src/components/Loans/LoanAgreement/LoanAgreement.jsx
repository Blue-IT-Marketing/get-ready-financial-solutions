import React, { Component } from "react";
import './LoanAgreement.css';
import Intro from '../../Intro/Intro';
import LoansMenu from '../LoansMenu/LoansMenu';

class LoanAgreement extends Component {
    constructor() {
        super();
        this.state = {
            group_name: "",
            total_amount_repayable: "",
            cost_of_credit:"",
            disbursement_fee:""
        };
    };

    onChange(e){
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit(e){
        e.preventDefault();
        console.log("submitting loan agreement");

    };

    componentWillMount () { 
        // load Centers List, loan Officers
    }

    render() {
        return (
            <div className="loan-agreement">
                <Intro />
                <div className="row">
                    <div className="col-md-3">
                        <LoansMenu />
                    </div>

                    <div className="col-md-8">
                        <div className="box box-body">
                            <div className="box box-header">
                                <h3 className="box-title"> <small>Loan Agreement</small></h3>
                            </div>

                            <div className="box box-footer">

                                <form className="form-horizontal">

                                    <div className="form-group">
                                        <select className="form-control" name="group_name" value={this.state.group_name} onChange={(e) => this.onChange(e)}>
                                                <option>Select Group</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Total Repayable" name="total_amount_repayable" value={this.state.total_amount_repayable} onChange={(e) => this.onChange(e)}/>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Cost of Credit" name="cost_of_credit" value={this.state.cost_of_credit} onChange={(e) => this.onChange(e)}/>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Disbursement Fee" name="disbursement_fee" value={this.state.disbursement_fee} onChange={(e) => this.onChange(e)} />
                                    </div>

                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary btn-block" name="submit" onClick={(e) => this.onSubmit(e)}> <strong> Submit</strong></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default LoanAgreement;