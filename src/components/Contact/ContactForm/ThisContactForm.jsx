import React, { Component } from 'react';
import axios from "axios";

class ThisContactForm extends Component {
    constructor (){
        super();
        this.state = {
            names : "",
            email : "",
            cell: "",
            subject: "",
            message: ""
        };
}

    change (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmitContactForm (e){
        e.preventDefault();        
        console.log(this.state);
        let data = JSON.stringify(this.state);
        console.log(data);        
        axios.post("/contact/submit-contact-form","data=" + data).then( function(response){
            if (response.ok){
                return response.text();
            }
        }).then(function(data){
            let response_dom = document.getElementById("contactFormResponse");
            response_dom.innerHTML = data
        })
    };



    render (){
        return (
        <div className="col-md-6">
        <form className="form-horizontal">
            <div className="form-group">
            
                <input className="form-control" name="names" placeholder="Names" value={this.state.names} onChange={e => this.change(e)}/>
            </div>
            <div className="form-group">
                <input className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={e => this.change(e)}/>
            </div>
            <div className="form-group">
                <input className="form-control" name="cell" placeholder="Cell" value={this.state.cell} onChange={e => this.change(e)} />
            </div>
            <div className="form-group">
                <input className="form-control" name="subject" placeholder="Subject" value={this.state.subject} onChange={e => this.change(e)} />
            </div>
            <div className="form-group">
                <textarea className="form-control" name="message" placeholder="Message" value={this.state.message} onChange={e => this.change(e)} />
            </div>
            <div className="form-group">
                        <button type="button" className="btn btn-primary btn-lg" onClick={e => this.onSubmitContactForm(e)}><strong>Submit Message</strong></button>
            </div>
            <div className="form-group">
                <div id="contactFormResponse"></div>
            </div>
        </form>
        </div>
        )
    };

}

export default ThisContactForm