import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import './BusinessEvaluation.css';


import UniqueId from 'react-html-id';
import Axios from 'axios';

import * as routes from '../../../constants/centers-routes';

let stock = function(){
    this.stock = {
        total_items : "",
        value : ""        
    }

    return this.stock;
};
let stock_items = function () {
    this.stock_items = {
        client_id : "",
        id: "",
        item_name: "",
        quantity: "",
        buying_price: "",
        total: ""
    }
    return this.stock_items;
};
//Component for stock items
const StockItem = (props) => {
    return (
    // Insert DelEvent
        <tr>
             <td>{props.item_name} </td>   
             <td>{props.quantity}</td>
             <td>{props.buying_price}</td>
             <td>{props.total}</td>
             <td><button type="button" className="btn btn-danger btn-block" onClick={(e) => props.delEvent(e)} title="Delete Stock Item"><strong>[X]</strong></button></td>
        </tr>
    );
};
let standing = function(){
    this.state = {
        outstanding_debts : "",
        savings : "",
        business_value : "", //formula (2 * stock + 2 * debts(1/2) + 2 * savings
        monthly_income: "" ,
        other_income: "", //also monthly
        total_household_income: ""
    };
    return this.state;
};
class BusinessStanding extends Component{
    constructor(){
        super();
        this.state = {
            saved: true,
            standing : new standing()
        }            
    };
    onChange(e){
        let new_state = Object.assign([],this.state);
        console.log(e.target.name);
        switch (e.target.name){
            case "outstanding_debts": new_state.standing.outstanding_debts = e.target.value; break;
            case "savings": new_state.standing.savings = e.target.value; break;
            case "business_value": new_state.standing.business_value = e.target.value;break;
            case "monthly_income": new_state.standing.monthly_income = e.target.value;break;
            case "other_income": new_state.standing.other_income = e.target.value;break;
            case "total_household_income": new_state.standing.total_household_income = e.target.value;break;
            default: break; 
        };
        new_state.saved = false;
        this.setState(new_state);
    };
    onSubmit(e){        
        e.preventDefault();
        console.log(this.state);
        let standing_state = JSON.stringify(this.state.standing);
        //Cannot calculate business_value here 

        // let new_state = Object.assign([],this.state);
        // new_state = new standing();
        // this.setState(new_state);
        console.log(standing_state);
        this.props.submitStanding(standing_state);
    };
    componentWillMount = () => {
        //ss
        console.log(this.props.standing);
        this.setState({standing:this.props.standing});
    };
    render(){
        return (
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <strong><small>Business Standing</small></strong></h3>
                </div>
                <form className="form-horizontal" onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Outstanding Debts Owed to Business" name="outstanding_debts" value={this.state.outstanding_debts} onChange={(e) => this.onChange(e)}/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Total Business Savings" name="savings" value={this.state.savings} onChange={(e) => this.onChange(e)} />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Monthly Income" name="monthly_income" value={this.state.monthly_income} onChange={(e) => this.onChange(e)} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Other Income" name="other_income" value={this.state.other_income} onChange={(e) => this.onChange(e)} />
                    </div>
                    
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Total Household Income" name="total_household_income" value={this.state.total_household_income} onChange={(e) => this.onChange(e)} />
                    </div>

                    <div className="form-group">
                        <button type="button" className="btn btn-primary btn-block" name="savebusinessstanding" onClick={(e) => this.onSubmit(e)}><strong> <small>Save Business Standing</small></strong></button>
                    </div>
                </form>
            </div>
        );
    };

}

export class BusinessValuation extends Component{
    constructor(){
        super();        
        UniqueId.enableUniqueIds(this);
        this.state = {
            stock: new stock(),
            items: [],
            standing: new standing(),
            form_response : '',

            show_previous : false

        };

        this.delItem = this.delItem.bind(this);
        this.addStock = this.addStock.bind(this);
        this.submitStanding = this.submitStanding.bind(this);
        this.onShow = this.onShow.bind(this);
    };

    onShow(e){
        let previousState =this.state.show_previous;
        console.log(previousState);
        this.setState({
            show_previous: !previousState
        });
    }

    delItem = (index,e) => {
        const my_state_items = Object.assign([],this.state.items);
        const my_state_stocks = Object.assign([], this.state.stock);
        
        my_state_stocks.total_items -= 1;
        my_state_stocks.value = my_state_stocks.value - my_state_items.total;
        my_state_items.splice(index, 1);
        this.setState({ stock: my_state_stocks, items: my_state_items})
    };

    addStock = (item) => {
        // console.log(e);
        console.log("In Add Stock == " + item);
        //console.log(item);

        item = JSON.parse(item);
        let my_state_items = Object.assign([], this.state.items);
        item.id = this.nextUniqueId();
        item.quantity = parseInt(item.quantity);
        item.buying_price = parseFloat(item.buying_price);
        item.total = item.quantity * item.buying_price;

        my_state_items.push(item);
        console.dir(my_state_items);

        // updating stocks total items
        let my_state_stocks = Object.assign([],this.state.stock);
        let total_items = parseInt(my_state_stocks.total_items);
        total_items += 1;
        my_state_stocks.total_items = total_items;

        //updating stock value
        let value = parseFloat(my_state_stocks.value);
        value += item.total;
        my_state_stocks.value = value;

        this.setState({ stock: my_state_stocks , items: my_state_items});
        // Dont forget to change the  values of totals
    };
    submitStanding = (standing) => {
        console.log("submitt standing = " + standing);
        let submitted_standing  = JSON.parse(standing)

        Axios.post(routes.submit_business_standing).then(
            function(response){
                if (response.status === 200){
                    return response.data;
                }else{
                    throw new Error('Error submitting business standing')
                }
        }).then(function(json_data){
            this.setState({ standing: submitted_standing });
        }).catch(function(err){
            let message = err.message;
            this.setState({form_response: message})
        });
    };
    render() {
        return (
             <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <small> <strong> Valuation</strong> </small></h3>

                    <button name={'previous-valuation'} 
                            type={'button'}
                            className={'btn btn-box-tool btn-outline-dark pull-right'}
                            onClick={e => this.onShow(e)}
                    >
                    <strong> <i className={'fa fa-server'}> </i> Previous Evaluations </strong>

                    </button>
                </div>
                {
                    (this.state.show_previous)?
                    '':
                        <Tabs>
                            <TabList>
                                <Tab><strong>Business Standing</strong></Tab>
                                <Tab><strong>Stock</strong></Tab>
                                <Tab><strong>Add Stock</strong></Tab>
                            </TabList>
                            <TabPanel>
                                <BusinessStanding submitStanding={this.submitStanding.bind(this)} standing={this.state.standing} />
                            </TabPanel>
                            <TabPanel>
                                <table id='stockTable' className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <td><strong> <small>Item </small></strong></td>
                                            <td><strong> <small>Quantity </small></strong></td>
                                            <td><strong> <small>Price/Value </small></strong></td>
                                            <td><strong> <small>Sub Total </small></strong></td>
                                            <td><strong><small>Action</small></strong></td>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            this.state.items.map((Item, index) => {
                                                return (
                                                    <StockItem
                                                        item_name={Item.item_name}
                                                        quantity={Item.quantity}
                                                        buying_price={Item.buying_price}
                                                        total={Item.total}
                                                        key={Item.id}
                                                        delEvent={this.delItem.bind(this, index)}>
                                                    </StockItem>);
                                            })
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td><strong> <small>Item</small></strong></td>
                                            <td><strong> <small>Quantity</small></strong></td>
                                            <td><strong> <small>Price/Value</small></strong></td>
                                            <td><strong> <small>Sub Total </small></strong></td>
                                            <td><strong><small>Action</small></strong></td>
                                        </tr>
                                    </tfoot>
                                </table>

                            </TabPanel>
                            <TabPanel>
                                <AddStock submitStock={this.addStock.bind(this)}></AddStock>
                            </TabPanel>
                        </Tabs>                                    
                }
            </div>
        );
    };

};



class AddStock extends Component {

    constructor(props){
        super(props);
        this.state = new stock_items()        
    };
    onChange(e){
        console.log(e.target.name);
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    onSubmit(e){
        e.preventDefault();
        let item = JSON.stringify(this.state);
        console.log(item);
        this.props.submitStock(item);
        let new_state = Object.assign({},this.state);
        new_state = new stock_items();
        this.setState(new_state);
    };


    render() {
        return (
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <small>Add Stock</small></h3>
                </div>
                
                <form className="form-horizontal" onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Item Name" name="item_name" value={this.state.item_name} onChange={(e) => this.onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Quantity" name="quantity" value={this.state.quantity} onChange={(e) => this.onChange(e)} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Buying Price" name="buying_price" value={this.state.buying_price} onChange={(e) => this.onChange(e)} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success btn-block" name="savestock"><strong>Add Stock</strong></button> 
                    </div>
                </form>

            </div>
        );
    };


};






export default BusinessValuation;