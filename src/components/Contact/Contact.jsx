
import React ,{Component} from "react";
import "./Contact.css";
import Intro from "../Intro/Intro";
import axios from "axios";
import * as Utils from '../../constants/utilities';
import InlineError from "../Forms/InlineError";

export let contact_details = {
            message_id : "",
            names : "",
            email : "",
            cell: "",
            subject: "",
            message: "",
            message_status : 'unread' // read,deleted,
};

export let contact_message_response = {
            message_id : '',
            thread_id : '',
            response : '',
            date_responded : '',
            time_responded : ''
};

class ContactForm extends Component {
    constructor (){
        super();
        this.state = {
            contact_form : {...contact_details},
            names_error : '',
            emails_error : '',
            cell_error : '',
            subject_error : '',
            message_error : '',

            loading : false,

            form_response : "",
            isError: false

        };
        this.change = this.change.bind(this);
        this.onSubmitContactForm = this.onSubmitContactForm.bind(this);
        this.CheckErrors = this.CheckErrors.bind(this);
    };

    change (e) {
        let contact_form = Object.assign({},this.state.contact_form);
        switch(e.target.name){
            case 'names': contact_form.names = e.target.value; break;
            case 'email' : contact_form.email = e.target.value;break;
            case 'cell' : contact_form.cell = e.target.value;break;
            case 'subject' : contact_form.subject = e.target.value;break;
            case 'message' : contact_form.message = e.target.value;break;

            default:break;
        }
        this.setState({
            contact_form: contact_form,
            names_error : '',
            emails_error:'',
            cell_error:'',
            subject_error : '',
            message_error: '',
            isError:false
        });
    };

    onSubmitContactForm (e){
        e.preventDefault();
        console.log(this.state.contact_form);
        let data = JSON.stringify(this.state.contact_form);
        console.log(data);
        let self = this;                
        if (!this.state.isError){
        axios.post("/api/home/submit-contact-form","data=" + data).then( function(response){
            if (response.status === 200){
                return response.data;
            }else{
                let message = response.data;
                message = message.message;

                throw new Error(message);
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
        });
        }
    };

    CheckErrors(){
        let form_data = Object.assign({},this.state.contact_form);
        let ErrorFound = false;
            if (Utils.isEmpty(form_data.names)){
                this.setState({
                    names_error : 'Names cannot be empty',
                    isError : true
                });
                ErrorFound = true;
            }

            if (!Utils.validateEmail(form_data.email)){
                this.setState({
                    emails_error : 'Email address is invalid',
                    isError : true
                });
                ErrorFound = true;
            }

            if (!Utils.isCell(form_data.cell)){
                this.setState({
                    cell_error : 'Cell Number is invalid',
                    isError : true
                });
                ErrorFound = true;
            }

            if (Utils.isEmpty(form_data.subject)){
                this.setState({
                    subject_error : 'Subject cannot be empty',
                    isError : true
                })
            }

            if (Utils.isEmpty(form_data.message)){
                this.setState({
                    message_error: 'Message cannot be empty',
                    isError : true
                })
            }


            
            return ErrorFound;

    }

    render (){
        return (
        <div className="col-md-6">
        <div className='box box-footer'>
            <div className='box box-header'>
                        <h3 className='box-title'> <strong> <i className='fa fa-envelope'> </i>Contact Form</strong></h3>
            </div>
                <form className="form-horizontal">
                    <div className="form-group">
                            <input className="form-control" name="names" placeholder="Names" value={this.state.contact_form.names} onChange={e => this.change(e)}/>
                            {(this.state.names_error) ? <InlineError message={this.state.names_error}/> :''}
                    </div>
                    <div className="form-group">
                            <input className="form-control" name="email" placeholder="Email" value={this.state.contact_form.email} onChange={e => this.change(e)}/>
                            {(this.state.emails_error) ? <InlineError message={this.state.emails_error} />: ''}
                    </div>
                    <div className="form-group">
                            <input className="form-control" name="cell" placeholder="Cell" value={this.state.contact_form.cell} onChange={e => this.change(e)} />
                            {(this.state.cell_error) ? <InlineError message={this.state.cell_error} /> : ''} 
                    </div>
                    <div className="form-group">
                            <input className="form-control" name="subject" placeholder="Subject" value={this.state.contact_form.subject} onChange={e => this.change(e)} />
                            {(this.state.subject_error)? <InlineError message={this.state.subject_error} />:'' } 
                    </div>
                    <div className="form-group">
                            <textarea className="form-control" name="message" placeholder="Message" value={this.state.contact_form.message} onChange={e => this.change(e)} />
                            {(this.state.message_error)? <InlineError message={this.state.message_error} />:''}
                    </div>
                    <div className="form-group">
                                <button type="button" className="btn btn-primary btn-lg" 
                                    onClick={e => {
                                            if (!this.CheckErrors()){
                                                this.onSubmitContactForm(e);
                                            }                                            
                                        } 
                                      }>
                                    <strong> <i className='fa fa-send'> </i> Submit Message</strong>
                                </button>
                                <button type='button' className='btn btn-warning btn-lg'
                                    onClick={e => {  
                                        this.setState({
                                            contact_form: contact_details,
                                            names_error: '',
                                            emails_error: '',
                                            cell_error: '',
                                            subject_error: '',
                                            message_error: '',

                                            loading: false,

                                            form_response: "",
                                            isError: false
                                        })
                                     }}><strong> <i className='fa fa-eraser'> </i> Reset</strong></button>
                    </div>
                    <div className="form-group">
                        <span>{this.state.form_response}</span>
                    </div>
                </form>
        </div>
        </div>
        )
    };

}


class ContactDetails extends Component{
    constructor(){
        super();
        this.state = {
            details : ""
        }
    }

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"><strong> <i className={'fa fa-info'}> </i> Contact Details</strong></h3>
                </div>


                <div className="box box-body">

                    <div className="box box-header">
                        <h3 className="box-title"><strong> <i className='fa fa-envelope'> </i> Contact Details</strong></h3>
                    </div>

                        <ul className="list-group">
                            <li className="list-group-item"> Malamulele Head Office </li>
                            <li className="list-group-item"> Tel/Fax: 015 851 0100 </li>
                            <li className="list-group-item">E-mail: info@getready.co.za </li>
                        </ul>
                </div>

                <div className="box box-body">
                    <div className="box box-header">
                        <h3 className="box-title"> <strong> <i className='fa fa-map-o'> </i> Physical Address </strong></h3>
                    </div>

                    <ul className="list-group">
                        <li className="list-group-item"> 521 Section A </li>
                        <li className="list-group-item"> Blue Building Next to Traffic Department </li>
                        <li className="list-group-item">Malamulele Main Road </li>
                        <li className="list-group-item">0982 </li>
                    </ul>

                </div>

                <div className="box box-body">
                    <div className="box box-header">
                        <h3 className="box-title"> <strong> <i className='fa fa-envelope'> </i> Postal Address </strong></h3>
                    </div>

                    <ul className="list-group">
                        <li className="list-group-item"> Get Ready Centre </li>
                        <li className="list-group-item"> P.O. Box 1535 </li>
                        <li className="list-group-item"> Malamulele </li>
                        <li className="list-group-item"> 0982 </li>
                    </ul>
                </div>


                <div className="box box-body">

                    <div className="box box-header">
                        <h3 className="box-title"> <strong> <i className='fa fa-bullhorn'> </i> Managing Director</strong></h3>
                    </div>

                    <ul className="list-group">
                        <li className="list-group-item"> Chauke Tinyiku Thomas </li>
                        <li className="list-group-item"> Cell : 083 618 4027 </li>
                        <li className="list-group-item"> Tel/Fax : 015 851 0100 </li>
                        <li className="list-group-item"> E-Mail : chaukett@getready.co.za </li>
                    </ul>
                </div>

                <div className="box box-body">
                    <div className="box box-header">
                        <h3 className="box-title"><strong> <i className='fa fa-map-o'> </i> Physical Address (Gauteng Coordination Office) </strong></h3>
                    </div>

                    <ul className="list-group">
                        <li className="list-group-item"> Riversands Incubation Hub NPC </li>
                        <li className="list-group-item">  8 Incubation Drive </li>
                        <li className="list-group-item"> Riverside View Ext. 15, </li>
                        <li className="list-group-item"> Unit R14 MIDRAND </li>
                        <li className="list-group-item"> South Africa </li>
                    </ul>
                </div>

                <div className="box box-body">
                    <div className="box box-headeer">
                        <h3 className="box-title"> <strong> <i className='fa fa-map-marker'> </i> Physical Address (Kuruman Branch Office)</strong></h3>
                    </div>
                    <ul className="list-group">

                        <li className="list-group-item"> NORTHERN CAPE BRANCH OFFICE </li>
                        <li className="list-group-item"> Charkor Building 58 </li>
                        <li className="list-group-item"> Main Street </li>
                        <li className="list-group-item"> Office 18 </li>
                        <li className="list-group-item"> Kuruman </li>

                    </ul>
                </div>
            </div>
        )

    }
}

class Maps extends Component{
    constructor(){
        super();
        this.state = {
            map : ""

        }
    }


    render(){
        return (

                <div className="box box-body">

                    <div className="box box-header">
                        <h3 className="box-title"> Get Ready</h3>
                    </div>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.582627206851!2d30.6860600143031!3d-23.00237048496323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec5b04a6df2f405%3A0x219fcb2057fa8603!2sGet+Ready+Centre!5e0!3m2!1sen!2sza!4v1546344686172"
                        width="900"
                        height="600"
                        frameBorder="0"
                        allowFullScreen>
                    </iframe>

                </div>

        )
    }
}

class Contact extends Component{
    constructor(){
        super();
        this.state = {

            contact_details : {...contact_details},
            form_response : "",
            show_contact_form : true,
            show_contact_details : false,
            show_maps : false
        };
        this.onShow = this.onShow.bind(this);
    };

    onShow(e){
        switch(e.target.name){
            case "contact":
                this.setState({
                    show_contact_form : true,
                    show_contact_details : false,
                    show_maps : false,
                });break;

            case "details":
                this.setState({
                    show_contact_form : false,
                    show_contact_details : true,
                    show_maps : false,
                });break;

            case "maps" :
                this.setState({
                    show_contact_form : false,
                    show_contact_details : false,
                    show_maps : true,
                });break;
            default:break;

        }
    }

    render(){
        return (
          <div className="contact">
            <Intro />
                <div className="row">
                    <div className="col-md-3">
                        <ul className='list-group'>

                            <li className='list-group-item'><button className="btn btn-app btn-block btn-outline-dark" name="contact" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-envelope"> </i> Contact </strong></button></li>
                            <li className='list-group-item'><button className="btn btn-app btn-block btn-outline-dark" name="details" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-info"> </i> Details </strong></button></li>
                            <li className='list-group-item'><button className="btn btn-app btn-block btn-outline-dark" name="maps" onClick={e => this.onShow(e)}> <strong> <i className="fa fa-map-marker"> </i> Maps</strong></button></li>
                        </ul>
                    </div>
                    <div className="col-md-9">
                        {
                            (this.state.show_contact_details) ?
                                <ContactDetails />
                            :""
                        }
                        {
                            (this.state.show_contact_form) ?
                                <ContactForm />
                            :""
                        }
                        {
                            (this.state.show_maps) ?
                                <Maps />
                            :""
                        }
                    </div>
                </div>
            </div>

        )
    }

}

export default Contact