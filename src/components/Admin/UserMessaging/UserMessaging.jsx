import React, {Component} from "react";
import Axios from "axios";
import * as centers_routes from "../../../constants/centers-routes";
import * as Utils from '../../../constants/utilities';
import InlineError from "../../Forms/InlineError";
import InlineMessage from "../../Forms/InlineMessage";
import {loan_requests_details} from "../../Home/Home";
import {contact_details,contact_message_response} from '../../Contact/Contact';


class LoanRequestItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            loan_request_item : {...loan_requests_details},
        };

        this.onAssignProps = this.onAssignProps.bind(this);
    };

    onAssignProps(e){
        let loan_request_item = Object.assign({},this.state.loan_request_item);
        if (this.props.loan_request !== undefined){
            loan_request_item = this.props.loan_request
        }

        this.setState({
            loan_request_item : loan_request_item
        });
    }


    componentWillMount() {
        this.onAssignProps();
    }

// onClickItem
    render(){
        return(
            <tr>
                <td
                    className={'btn active'}
                    onClick={e => {
                        let request_id = this.state.loan_request_item.request_id;
                        return(
                            this.props.onClickItem(request_id)
                        )
                    }}
                >
                    <strong> <em> {this.state.loan_request_item.names} </em></strong>
                </td>
                <td>{this.state.loan_request_item.cell}</td>
                <td>{this.state.loan_request_item.email}</td>
                <td>{this.state.loan_request_item.province}</td>
                <td>{this.state.loan_request_item.city}</td>
                <td>{this.state.loan_request_item.estimated_income}</td>
                <td>{this.state.loan_request_item.loan_amount}</td>
            </tr>
        )
    }
}

class LoanRequests extends Component{
    constructor(props){
        super(props);
        this.state = {
            loan_requests : [],
        };

        this.onClickItem = this.onClickItem.bind(this);
        this.onAssignProps = this.onAssignProps.bind(this);
    };

    onAssignProps(){
        let loan_requests = Object.assign({},this.state.loan_requests);

        if (this.props.loan_requests !== undefined){
            loan_requests = this.props.loan_requests;

        }
        this.setState({
            loan_requests: loan_requests
        });

    }

    onClickItem(request_id)
    {
        console.log('You clicked this loan request item ' + request_id);
        let loan_requests = Object.assign([],this.state.loan_requests);
        let loan_request = loan_requests.find(loan_request => loan_request.request_id === request_id);
        console.log(loan_request);
        this.props.OpenLoanRequest(loan_request);
    }


    


    componentWillMount() {
        this.onAssignProps();
    }


    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className={'fa fa-money'}> </i> Loan Requests </strong></h3>


                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong> <i className={'fa fa-close'}> </i> Close </strong>

                    </button>

                </div>

                <table className={'table table-responsive table-striped'}>
                        <thead>
                            <tr>
                                <td><strong> <i className='fa fa-user'> </i> Names</strong></td>
                                <td><strong> <i className='fa fa-mobile-phone'> </i> Cell</strong></td>
                                <td><strong> <i className='fa fa-envelope-o'> </i>  Email</strong></td>
                                <td><strong> <i className='fa fa-map-marker'> </i> Province</strong></td>
                                <td><strong> <i className='fa fa-street-view'> </i>  City</strong></td>
                                <td><strong> <i className='fa fa-money'> </i>  Estimated Income</strong></td>
                                <td><strong> <i className='fa fa-money'> </i>  Loan Amount</strong></td>
                            </tr>
                        </thead>
                        <tbody>

                        {
                            this.state.loan_requests.map(loan_request => {
                                return(
                                    <LoanRequestItem
                                        key={loan_request.request_id}
                                        loan_request={loan_request}
                                        onClickItem={this.onClickItem}
                                    />
                                )
                            })
                        }

                        </tbody>
                        <tfoot>
                            <tr>
                                <td><strong> <i className='fa fa-user'> </i> Names</strong></td>
                                <td><strong> <i className='fa fa-mobile-phone'> </i> Cell</strong></td>
                                <td><strong> <i className='fa fa-envelope-o'> </i>  Email</strong></td>
                                <td><strong> <i className='fa fa-map-marker'> </i> Province</strong></td>
                                <td><strong> <i className='fa fa-street-view'> </i>  City</strong></td>
                                <td><strong> <i className='fa fa-money'> </i>  Estimated Income</strong></td>
                                <td><strong> <i className='fa fa-money'> </i>  Loan Amount</strong></td>
                            </tr>
                        </tfoot>
                </table>
            </div>
        )
    }
}


class DisplayLoanRequest extends Component{
    constructor(props){
        super(props);
        this.state = {
            loan_request : {...loan_requests_details},
        };

        this.onAssignProps = this.onAssignProps.bind(this);
        this.onAuthorizeLoan = this.onAuthorizeLoan.bind(this);
    };

    onAuthorizeLoan(e){
        console.log('on Authorize loan clicked');
    }

    onAssignProps(){
        let loan_request = Object.assign({},this.state.loan_request);

        if (this.props.loan_request !== undefined){
            loan_request = this.props.loan_request
        }
        this.setState({
            loan_request: loan_request
        });
    }

    componentWillMount() {
        this.onAssignProps();
    }

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}> <strong> Loan Request Viewer </strong> </h3>
                </div>

                <form className={'form-horizontal'}>
                    <div className={'form-group'}>
                        <label>Names</label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'names'}
                               value={this.state.loan_request.names}
                               readOnly={true}
                               />
                    </div>
                    <div className={'form-group'}>
                        <label>Cell</label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'cell'}
                               value={this.state.loan_request.cell}
                               readOnly={true}
                           />
                    </div>
                    <div className={'form-group'}>
                        <label>Email</label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'email'}
                               value={this.state.loan_request.email}
                               readOnly={true}
                           />
                    </div>
                    <div className={'form-group'}>
                        <label>Province</label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'province'}
                               value={this.state.loan_request.province}
                               readOnly={true}
                               />
                    </div>
                    <div className={'form-group'}>
                        <label>City</label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'city'}
                               value={this.state.loan_request.city}
                               readOnly={true}
                               />
                    </div>
                    <div className={'form-group'}>
                        <label>Loan Amount</label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'loan_amount'}
                               value={this.state.loan_request.loan_amount}
                               readOnly={true}
                               />
                    </div>
                    <div className={'form-group'}>
                        <label>Estimated Income</label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'estimated_income'}
                               value={this.state.loan_request.estimated_income}
                               readOnly={true}
                               />
                    </div>
                    <div className={'form-group'}>
                        <button
                            type={'button'}
                            className={'btn btn-success'}
                            name={'authorize'}
                            onClick={e => this.onAuthorizeLoan(e)}
                        >
                            <strong><i className='fa fa-bank'> </i> Authorize </strong>

                        </button>

                    </div>
                </form>


            </div>
        )
    }
}


class ContactMessageItem extends Component{
    constructor(props){
        super(props);
        this.state={
            contact_message : {...contact_details},
        };

        this.onAssignProps = this.onAssignProps.bind(this);
    };

    onAssignProps(){
        let contact_message = Object.assign({},this.state.contact_message);
        if (this.props.contact_message !== undefined){
            contact_message = this.props.contact_message
        }

        this.setState({
            contact_message:contact_message
        });
    }

    componentWillMount() {
        this.onAssignProps();
    }

    render(){
        return(
            <tr>
                <td
                    className={'btn active'}
                    onClick={e => {
                        let message_id = this.state.contact_message.message_id;
                        return(
                            this.props.onClickItem(message_id)
                        )
                    }}
                >
                    <strong><em>{this.state.contact_message.names}</em></strong>

                </td>
                <td>{this.state.contact_message.email}</td>
                <td>{this.state.contact_message.cell}</td>
                <td>{this.state.contact_message.subject}</td>
            </tr>
        )
    }
}

class ContactMessages extends Component{
    constructor(props){
        super(props);
        this.state = {

            contact_messages : [],

            previous_messages : [],

            inbox_messages : [],

            show_all_messages : false,
            show_previous_messages : false,
            show_inbox_messages : false,
        };
        this.onAssignProps = this.onAssignProps.bind(this);
        this.onClickItem = this.onClickItem.bind(this);
        this.onSwitch = this.onSwitch.bind(this);
    };


    onSwitch(e){
        switch (e.target.name) {
            case 'previous':
                this.setState({
                    show_all_messages : false,
                    show_previous_messages : true,
                    show_inbox_messages : false,
                });break;
            case 'inbox':
                this.setState({
                    show_all_messages : false,
                    show_previous_messages : false,
                    show_inbox_messages : true
                });break;

            case 'all':
                this.setState({
                    show_all_messages : true,
                    show_previous_messages : false,
                    show_inbox_messages : false

                });
            break;

            default:break;
            
        }
    }

    onClickItem(message_id){
        let contact_messages = Object.assign([],this.state.contact_messages);
        let contact_message = contact_messages.find(contact_message => contact_message.message_id === message_id)
        this.props.onDisplayContactMessage(contact_message);
    }

    onAssignProps(){
        let contact_messages = Object.assign([],this.state.contact_messages);
        if (this.state.contact_messages !== undefined){
            contact_messages = this.props.contact_messages
        }
        this.setState({
            contact_messages: contact_messages
        });
    }

    componentWillMount() {
        this.onAssignProps();
    }

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className={'fa fa-envelope'}> </i> Contact Messages </strong></h3>
                    <button type={'button'}
                            className={'btn btn-outline-danger btn-box-tool pull-right' }
                            name={'close'}
                            onClick = {e => {
                                return(this.props.onClose(e))
                    }}> <strong> <i className={'fa fa-eraser'}> </i> Close </strong>
                    </button>

                    <button
                        type={'button'}
                        className={'btn btn-outline-dark btn-box-tool pull-right'}
                        name={'previous'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong><i className='fa fa-send-o'> </i> Read Messages </strong>

                    </button>

                    <button
                        type={'button'}
                        className={'btn btn-outline-dark btn-box-tool pull-right'}
                        name={'inbox'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong><i className='fa fa-inbox'> </i> UnRead Messages </strong>

                    </button>

                    <button
                        type={'button'}
                        className={'btn btn-outline-dark btn-box-tool pull-right'}
                        name={'all'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong><i className={'fa fa-envelope'}> </i> All Messages </strong>

                    </button>

                </div>

                <table className='table table-responsive table-striped'>

                    <thead>
                        <tr>
                            <td><strong> <i className={'fa fa-user'}> </i> Names</strong></td>
                            <td><strong> <i className={'fa fa-envelope'}> </i> Email </strong></td>
                            <td><strong> <i className={'fa fa-mobile-phone'}> </i> Cell</strong></td>
                            <td><strong> <i className={'fa fa-sticky-note'}> </i> Subject</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.contact_messages.map(contact_message => {
                            return(
                                <ContactMessageItem
                                    key={contact_message.message_id}
                                    contact_message={contact_message}
                                    onClickItem={this.onClickItem}
                                />
                            )
                        })
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong> <i className={'fa fa-user'}> </i> Names</strong></td>
                            <td><strong> <i className={'fa fa-envelope'}> </i> Email </strong></td>
                            <td><strong> <i className={'fa fa-mobile-phone'}> </i> Cell</strong></td>
                            <td><strong> <i className={'fa fa-sticky-note'}> </i> Subject</strong></td>
                        </tr>
                    </tfoot>

                </table>


            </div>
        )
    }
}



class ContactMessagingResponse extends Component{
    constructor(props){
        super(props);
        this.state = {
            contact_messaging_response : {...contact_message_response},
            form_response : ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onAssignProps = this.onAssignProps.bind(this);
        this.onSendResponse = this.onSendResponse.bind(this);
    };

    onSendResponse(e){
        console.log('Sending Response');
        // let messaging_response = Object.assign({},this.state.contact_messaging_response);

        let messaging_response = JSON.stringify(this.state.contact_messaging_response);
        let self = this;
        console.log('Sending the following data ');
        console.log(messaging_response);

        Axios.post(centers_routes.send_contact_message_responses,'&data=' + messaging_response).then(
            function(response){
                if (response.status === 200){
                    return response.data
                }
            }
        ).then(function(json_data){
            let message = json_data.message;
            self.setState({
                form_response : message
            });
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response:message
            })
        })
    }


    onChangeHandler(e){
        let contact_messaging_response = Object.assign({},this.state.contact_messaging_response);
        switch (e.target.name) {
            case 'response' : contact_messaging_response.response = e.target.value;break;
            default:break;
        }

        this.setState({
            contact_messaging_response : contact_messaging_response
        })

    }


    onAssignProps(){

        let message_id = this.props.message_id;
        let contact_messaging_response = Object.assign({},this.state.contact_messaging_response);
        contact_messaging_response.message_id = message_id;

        this.setState({
            contact_messaging_response:contact_messaging_response
        });
    }

    componentWillMount() {
        this.onAssignProps()
    }

    render(){
        return(
            <div>
            <div className={'form-group'}>
                <label><strong> <i className='fa fa-mail-reply'> </i> Response  </strong></label>
                <textarea
                    className={'form-control'}
                    name={'response'}
                    value={this.state.contact_messaging_response.response}
                    onChange={e => this.onChangeHandler(e)}
                >

                </textarea>
            </div>
            <div className={'form-group'}>
                <button type={'button'}
                        className={'btn btn-warning'}
                        onClick={e => this.onSendResponse(e)}
                ><strong> <i className='fa fa-send-o'> </i> Send </strong></button>
            </div>
                {
                    (this.state.form_response)?
                        <InlineMessage
                            message={this.state.form_response}
                            message_type={'INFO'}/>: ''
                }
            </div>

        )
    }
}



class DisplayContactMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            contact_message : {...contact_details},
            responses : [],
            response : {...contact_message_response},
            display_response_windows : false,

        };
        this.onAssignProps = this.onAssignProps.bind(this);
        this.onResponse = this.onResponse.bind(this);
        this.onDeleteMessage = this.onDeleteMessage.bind(this);
        this.onMarkAsRead = this.onMarkAsRead.bind(this);
        this.loadMessageResponses = this.loadMessageResponses.bind(this);
    };


    loadMessageResponses(e){
        let self = this;

        Axios.get(centers_routes.load_contact_message_responses).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error loading contact message responses");
            }
        }).then(function (json_data) {
            self.setState({
                responses : json_data
            })
        }).catch(function (err){
            console.log(err.message);
        });

    }

    onMarkAsRead(e){
        console.log('Mark as read');
        console.dir(this.state.contact_message);
    }

    onDeleteMessage(e){
        console.log('ready to delete message');
        console.dir(this.state.contact_message);
    }

    onResponse(e){
        console.log('Responding to ? ');
        this.setState({
            display_response_windows : true
        })
    }

    onAssignProps(){
        let contact_message = Object.assign({},this.state.contact_message);
        if (this.props.contact_message !== undefined){
            contact_message = this.props.contact_message;
        }

        this.setState({
            contact_message : contact_message
        });
    }

    componentWillMount() {
        this.onAssignProps();
        this.loadMessageResponses();
    }

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className={'fa fa-mobile-phone'}> </i> Contact Message Viewer </strong></h3>

                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-danger pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong> <i className={'fa fa-close'}> </i> Close </strong>

                    </button>

                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'mark-as-read'}
                        onClick={e => this.onMarkAsRead(e)}
                    >
                        <strong><i className='fa fa-file-text'> </i> Mark as Read </strong>

                    </button>

                </div>


                <form className={'form form-horizontal'}>

                    <div className={'form-group'}>
                        <label>Names</label>
                        <input
                            type={'text'}
                            className={'form-control'}
                            name={'names'}
                            value={this.state.contact_message.names}
                            readOnly={true}
                        />
                    </div>
                    <div className={'form-group'}>
                        <label>Cell</label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'cell'}
                               value={this.state.contact_message.cell}
                               readOnly={true}
                        />
                    </div>
                    <div className={'form-group'}>
                        <label>Email</label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'email'}
                            value={this.state.contact_message.email}
                               readOnly={true}
                       />
                    </div>
                    <div className={'form-group'}>
                        <label>Subject</label>
                        <input type={'text'}
                               className={'form-control'}
                               name={'subject'}
                               value={this.state.contact_message.subject}
                               readOnly={true}
                        />
                    </div>
                    <div className={'form-group'}>
                        <label>Message</label>
                        <textarea
                            name={'message'}
                            className={'form-control'}
                            value={this.state.contact_message.message}
                            readOnly={true}
                        >

                        </textarea>
                    </div>
                    {/*TODO- show previous responses / conversation*/}
                    {/*TODO- show response box*/}

                    {
                        (this.state.responses && this.state.responses.map(response => {
                            return(
                                    <ContactMessagingResponse
                                        message_id={this.state.contact_message.message_id}
                                        response={response}
                                        onClose={this.onClose}/>
                            )
                        }))
                    }
                    {
                        (this.state.display_response_windows) ?
                            <ContactMessagingResponse
                                response={this.state.response}
                                onClose = {this.onClose}
                            />: ''
                    }
                    <div className={'form-group'}>
                        <button
                            type={'button'}
                            className={'btn btn-success'}
                            name={'respond'}
                            onClick={e => this.onResponse(e)}
                        >
                            <strong>
                                <i className='fa fa-send-o'> </i> Respond </strong>

                        </button>

                        <button
                            type={'button'}
                            className={'btn btn-danger pull-right'}
                            name={'delete-message'}
                            onClick={e => this.onDeleteMessage(e)}
                        >
                            <strong><i className={'fa fa-eraser'}> </i> Delete </strong>

                        </button>

                    </div>


                </form>
            </div>
        )
    }
}

class UserMessaging extends Component{
    constructor(props){
        super(props);
        this.state = {
            contact_messages : [],
            contact_message: {...contact_details},

            loan_requests : [],

            loan_request : {...loan_requests_details},

            show_loan_requests : false,
            show_contact_messages : false,

            open_loan_request : false,
            open_contact_message : false

        };

        this.onSwitch = this.onSwitch.bind(this);
        this.onClose = this.onClose.bind(this);
        this.loadLoanRequests = this.loadLoanRequests.bind(this);
        this.loadContactMessages = this.loadContactMessages.bind(this);
        this.OpenLoanRequest = this.OpenLoanRequest.bind(this);
        this.onDisplayContactMessage = this.onDisplayContactMessage.bind(this);
    };

    loadLoanRequests(){
        let self = this;
        Axios.get(centers_routes.load_loan_requests_url).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error('Error loading loan requests')
            }
        }).then(function(json_data){
            self.setState({
                loan_requests:json_data
            });
        }).catch(function(err){
            let message = err.message;

            console.log(message);
        })
    }

    loadContactMessages(){
        let self = this;

        Axios.get(centers_routes.load_user_contact_messages).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error('Error loading user contact messages')
            }
        }).then(function(json_data){
            console.log("Our Contact Messages");
            console.dir(json_data);
            self.setState({
                contact_messages : json_data
            });
        });
    }

    onClose(e){
        this.setState({
            show_loan_requests : false,
            show_contact_messages : false,
            open_loan_request : false,
            open_contact_message : false,
        });
    }

    OpenLoanRequest(loan_request){
        console.log('We are inside noe');
        console.dir(loan_request);
        this.setState({
            show_loan_requests : false,
            show_contact_messages : false,
            open_loan_request : true,
            open_contact_message : false,
            loan_request:loan_request
        })
    }

    onDisplayContactMessage(contact_message){
        this.setState({
            show_loan_requests : false,
            show_contact_messages : false,
            open_loan_request : false,
            open_contact_message : true,
            contact_message:contact_message

        })
    }

    onSwitch(e){
        switch (e.target.name) {

            case 'contact-messages':
                this.setState({
                    show_loan_requests : false,
                    show_contact_messages : true,
                    open_loan_request : false,
                    open_contact_message : false

                });break;

            case 'loan-requests':
                this.setState({
                    show_loan_requests : true,
                    show_contact_messages : false,
                    open_loan_request : false,
                    open_contact_message : false
                });break;

            default: break;
        }
    }

    componentWillMount() {
        this.loadLoanRequests();
        this.loadContactMessages();
    }

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className={'fa fa-envelope'}> </i> User Messaging </strong></h3>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-danger pull-right'}
                        name={'close'}
                        onClick={e => {
                            return(
                                this.props.onClose(e)
                            )
                        }}
                    >
                        <strong><i className={'fa fa-eraser'}> </i> Close </strong>

                    </button>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'contact-messages'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong><i className={'fa fa-envelope'}> </i> Contact </strong>

                    </button>
                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'loan-requests'}
                        onClick={e => this.onSwitch(e)}
                    >
                        <strong><i className={'fa fa-money'}> </i> Loan Requests </strong>

                    </button>
                </div>

                {
                    (this.state.show_loan_requests) ?
                        <LoanRequests
                            onClose={this.onClose}
                            loan_requests={this.state.loan_requests}
                            OpenLoanRequest={this.OpenLoanRequest}
                        /> : ''
                }
                {
                    (this.state.open_loan_request) ?
                        <DisplayLoanRequest
                            loan_request={this.state.loan_request}
                            onClose = {this.onClose}
                        /> : ''
                }
                {
                    (this.state.show_contact_messages)?
                        <ContactMessages
                            contact_messages={this.state.contact_messages}
                            onClose={this.onClose}
                            onDisplayContactMessage={this.onDisplayContactMessage}
                            />:''
                }
                {
                    (this.state.open_contact_message)?
                        <DisplayContactMessage
                            contact_message={this.state.contact_message}
                            onClose={this.onClose}
                        />:''
                }
            </div>
        )
    }
}


export default UserMessaging;
