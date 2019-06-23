
import React, { Component } from "react";
import "./ContactDetails.css";
import Axios from "axios";
import * as centers_routes from "../../constants/centers-routes";
import * as Utils from '../../constants/utilities';
import InlineError from "../Forms/InlineError";
import InlineMessage from "../Forms/InlineMessage";

export let contact_details = {
    contact_id : "",
    contact_person: "",
    position:"",
    cell: "",
    tel: "",
    fax:"",
    email:""
};


export class DisplayContactDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            contact_details : {...this.props.contact_details}
        };
    };

    render(){
        return(
            <div className={'box box-body'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}> <strong><i className={'fa fa-mobile-phone'}> </i> Contact Details</strong></h3>
                </div>

                <div className={'box box-footer'}>
                    <ul className={'list-group'}>
                        <li className={'list-group-item'}><strong>Contact Person / Next Of Kin : </strong> {this.state.contact_details.contact_person}</li>
                        <li className={'list-group-item'}><strong>position : </strong> {this.state.contact_details.position}</li>
                        <li className={'list-group-item'}><strong>Cell : </strong> {this.state.contact_details.cell}</li>
                        <li className={'list-group-item'}><strong>Tel : </strong> {this.state.contact_details.tel}</li>
                        <li className={'list-group-item'}><strong>Fax : </strong> {this.state.contact_details.fax}</li>
                        <li className={'list-group-item'}><strong>Email : </strong> {this.state.contact_details.email}</li>
                        <li className={'list-group-item'}><button className={'btn btn-success'}><strong><i className={'fa fa-print'}> </i> Print </strong></button> <button className={'btn btn-info'}><strong><i className={'fa fa-edit'}> </i> Edit </strong></button></li>
                    </ul>
                </div>

            </div>
        )
    }
}

class ContactDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            contact_details :{...contact_details},

            contact_person_error : '',
            position_error : '',
            cell_error : '',
            tel_error : '',
            fax_error : '',
            email_error : '',



            contact_details_saved : false,
            form_response : ""
        };

        this.onHandleChange = this.onHandleChange.bind(this);
        this.SaveContactDetails = this.SaveContactDetails.bind(this);
        this.assignProps  = this.assignProps.bind(this);
        this.doCheckErrors = this.doCheckErrors.bind(this);

    }
    
    onHandleChange(e){
        let contact_details = Object.assign({}, this.state.contact_details);

        switch(e.target.name){
            case "contact_person": contact_details.contact_person = e.target.value; break;
            case "position" : contact_details.position = e.target.value; break;
            case "cell" : contact_details.cell = e.target.value; break;
            case "tel" : contact_details.tel = e.target.value; break;
            case "fax" : contact_details.fax = e.target.value; break;
            case "email" : contact_details.email = e.target.value; break;
            case "contact_id" : contact_details.contact_id = this.props.contact_id;break;
            default: break;
        };
        console.log(contact_details);
        this.setState({contact_details : contact_details});
    }

    SaveContactDetails(e){
        //send contact details to backend
        let contact_details = Object.assign({}, this.state.contact_details);
        contact_details = JSON.stringify(contact_details);
        let self = this;

        Axios.post(centers_routes.save_centers_contact_details_url,"&data=" + contact_details).then(function(response){
            if (response.status === 200){
                // this.setState({contact_details_saved:true});
                self.props.onContactSaved(e);
                return response.data;
            }else{
                let message = response.data.message;
                throw new  Error(message);
            }
        }).then(function(json_data){
            let message = json_data.message;
            self.setState({
                contact_details_saved:true,
                form_response : message
            });

        }).catch(function(err){
            let message = err.message;
            self.setState({
                contact_details_saved:false,
                form_response : message
            })
        });
    }

    assignProps(){
        let contact_details = Object.assign({}, this.state.contact_details);
        contact_details.contact_id = this.props.contact_id;
        contact_details.contact_person = this.props.contact_details.contact_person;
        contact_details.position = this.props.contact_details.position;
        contact_details.cell = this.props.contact_details.cell;
        contact_details.tel = this.props.contact_details.tel;
        contact_details.fax = this.props.contact_details.fax;
        contact_details.email = this.props.contact_details.email;
        this.setState({contact_details : contact_details});

    }


    doCheckErrors(){
        let isError = false;
        let contact_details = Object.assign({},this.state.contact_details);

        if (Utils.isEmpty(contact_details.contact_person) === true){
            this.setState({
                contact_person_error : 'Contact Person field cannot be empty'
            });

            isError = true;
        }

        if (Utils.isEmpty(contact_details.position) === true){
            this.setState({
                position_error : 'Position field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isCell(contact_details.cell) === false){
            this.setState({
                cell_error : 'Cell Field cannot be empty'
            });
            isError = true;
        }

        if (Utils.validateEmail(contact_details.email) === false){
            this.setState({
                email_error : 'Email field cannot be empty'
            });

            isError = true;
        }


        return isError;



    }


    componentWillMount(e){
        this.assignProps();
    }

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <strong><i className='fa fa-mobile-phone'> </i> Contact Details</strong></h3>
                </div>

                <form className="form-horizontal">
                    <div className="form-group">
                        <label><strong> <i className={'fa fa-user'}></i> Contact Person </strong></label>
                        <input type="text" className="form-control" name="contact_person" value={this.state.contact_details.contact_person} onChange={e => this.onHandleChange(e)}/>
                        {(this.state.contact_person_error) ? <InlineError message={this.state.contact_person_error} /> : ''}
                    </div>
                    <div className="form-group">
                        <label><strong> <i className={'fa fa-building-o'}></i> Position</strong></label>
                        <input type="text" className="form-control" name="position" value={this.state.contact_details.position} onChange={e => this.onHandleChange(e)} />
                        {(this.state.position_error) ? <InlineError message={this.state.position_error} /> : ''}
                    </div>
                    <div className="form-group">
                        <label><strong><i className={'fa fa-mobile-phone'}> </i> Cell</strong></label>

                        <input type="tel" className="form-control" name="cell" value={this.state.contact_details.cell} onChange={e => this.onHandleChange(e)} />
                        {(this.state.cell_error) ? <InlineError message={this.state.cell_error} /> : ''}

                    </div>
                    <div className="form-group">
                        <label><strong><i className={'fa fa-phone'}> </i> Tel</strong></label>

                        <input type="tel" className="form-control" name="tel" value={this.state.contact_details.tel} onChange={e => this.onHandleChange(e)} />
                        {(this.state.tel_error) ? <InlineError message={this.state.tel_error}/> : ''}

                    </div>
                    <div className="form-group">
                        <label><strong> <i className={'fa fa-phone-square'}> </i> Fax</strong></label>

                        <input type="tel" className="form-control" name="fax" value={this.state.contact_details.fax} onChange={e => this.onHandleChange(e)} />
                        {(this.state.fax_error) ? <InlineError message={this.state.fax_error} /> : ''}
                    </div>
                    <div className="form-group">
                        <label><strong> <i className={'fa fa-send'}> </i> Email</strong></label>
                        <input type="email" className="form-control" name="email" value={this.state.contact_details.email} onChange={e => this.onHandleChange(e)} />
                        {(this.state.email_error) ? <InlineError message={this.state.email_error} /> : ''}
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <button type="button" className="btn btn-primary "
                                    onClick={e => {
                                        if (this.doCheckErrors() === false){
                                            this.SaveContactDetails(e)
                                        }
                                    }}
                            >
                                <strong> <i className='fa fa-save'> </i> Save Contact Details</strong>
                            </button>

                            <button type={'button'} className={'btn btn-warning'} onClick={ e =>
                                this.setState({
                                    contact_details :{...contact_details},

                                    contact_person_error : '',
                                    position_error : '',
                                    cell_error : '',
                                    tel_error : '',
                                    fax_error : '',
                                    email_error : '',

                                    contact_details_saved : false,
                                    form_response : ""
                                })

                                }
                            >
                                <strong><i className='fa fa-eraser'> </i> Reset</strong>


                            </button>
                        </div>
                    </div>
                    {(this.state.form_response) ? <InlineMessage message={this.state.form_response} message_type={'INFO'}/> : ''}


                </form>


            </div>
        )
    }
};


export default ContactDetails;