
import React ,{ Component} from "react";
import "./Meetings.css";
import Intro from "../Intro/Intro";
import Axios from "axios";
import * as centers_routes from '../../constants/centers-routes';


export let meeting_details = {
    center_id : "",
    meeting_id : "",
    meeting_date : "",
    meeting_time : "",
    meeting_subject : "",
    meeting_memorandum : "",
    meeting_notes : "",

};


export class DisplayMeetings extends Component{
    constructor(props){
        super(props);
        this.state = {
            center_id : {...this.props.center_id},
            meetings_list : []
        };

        this.loadMeetings  = this.loadMeetings.bind(this);

    };

    loadMeetings(e){

        let self = this;

        Axios.get(centers_routes.load_meetings_url + self.props.center_id).then(function (response) {
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error fetching meetings")
            }
        }).then(function(data){
            console.log("Meetings List loaded");
            console.log(data);
            self.setState({
                meetings_list : data
            })

        }).catch(function(err){
            console.log(err.message)
        })
    }


    componentWillMount(e){
        this.loadMeetings(e);

    }

    render(){
        return(
            <div className={'box box-body'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}> Meetings </h3>
                </div>

                <div className={'box box-footer'}>
                    {
                        this.state.meetings_list.map( (meeting,index)=> {
                            return(
                                <div className={'box box-footer'}>
                                    <ul className={'list-group'}>
                                        <li className={'list-group-heading'}><strong> <i className={'fa fa-bullhorn'}> </i> Meeting # </strong> <em>{index + 1}</em></li>
                                        <li className={'list-group-item'}><strong> Date : </strong> <em> {meeting.meeting_date}</em></li>
                                        <li className={'list-group-item'}><strong> Time : </strong> <em> {meeting.meeting_time}</em></li>
                                        <li className={'list-group-item'}><strong> Subject : </strong> <em> {meeting.meeting_subject}</em></li>
                                        <li className={'list-group-item'}><strong> Notes : </strong> <em> {meeting.meeting_notes}</em></li>
                                        <li className={'list-group-item'}><strong> Memorandum : </strong> <em> {meeting.meeting_memorandum}</em></li>
                                        <li className={'list-group-item'}><strong> <button className={'btn btn-success'}><strong><i className={'fa fa-print'}> </i> Print </strong></button> <button className={'btn btn-info'}><strong><i className={'fa fa-edit'}> </i> Edit </strong></button></strong></li>
                                    </ul>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}


class MeetingListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            meeting : this.props.meeting
        };
    };

    render(){
        return(
            <tr>
                <td>{this.state.meeting.meeting_date}</td>
                <td>{this.state.meeting.meeting_time}</td>
                <td>{this.state.meeting.meeting_subject}</td>
                <td>{this.state.meeting.meeting_notes}</td>
            </tr>



        )
    }
}

class ShowMeeting extends Component{
    constructor(props){
        super(props);
        this.state = {
            meetings_list : []
        };
    };


    componentWillMount(e){
        let meetings_list = this.props.meetings_list;
        let this_meetings_list = Object.assign([],this.state.meetings_list);

        console.log("big meetings RESULTS");
        console.dir(meetings_list);
        console.dir(this_meetings_list);

        if (meetings_list !== undefined){
            this_meetings_list = meetings_list
        }


        this.setState({
            meetings_list : this_meetings_list
        });

    }

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> Meeting Details</h3>
                </div>


                <table className={"table table-responsive"}>
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Subject</td>
                            <td>Notes</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.meetings_list.map(meeting => {
                                return(
                                    <MeetingListItem
                                        meeting={meeting}
                                        key={meeting.meeting_id}
                                    />
                                );
                            })
                        }


                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Subject</td>
                            <td>Notes</td>
                        </tr>
                    </tfoot>

                </table>



            </div>
        )
    }
}

class CreateMeeting extends Component{
    constructor(props){
        super(props);
        this.state = {
            meeting : {...meeting_details},
            form_response : ""
        };

        this.onChange = this.onChange.bind(this);
        this.onCreateMeeting = this.onCreateMeeting.bind(this);
        this.meetingCreated = this.meetingCreated.bind(this);
    };

    onChange(e){
        console.log(e.target.name);
        let meeting = Object.assign({},this.state.meeting);

        meeting.center_id = this.props.center_id;

        switch(e.target.name){
            case "meeting_subject": meeting.meeting_subject = e.target.value; break;
            case "meeting_date" : meeting.meeting_date = e.target.value;break;
            case "meeting_time" : meeting.meeting_time = e.target.value;break;
            case "meeting_memorandum" : meeting.meeting_memorandum = e.target.value;break;
            case "meeting_notes" : meeting.meeting_notes = e.target.value;break;
            default:break;
        }

        this.setState({
            meeting:meeting
        });
    }

    meetingCreated(e){
        this.props.onMeetingCreated(this.state.meeting);
    }

    onCreateMeeting(e){
        console.log("creating meeting from " + e.target);
        let self = this;

        Axios.post(centers_routes.create_meetings_url,"&data=" + JSON.stringify(this.state.meeting)).then(function (response) {
            if(response.status === 200){
                return response.data
            }else{
                throw new Error("Error creating new Meeting please try again later");
            }
        }).then(function(response_json){
            let message = response_json.message;
            self.setState({
                meeting : {...meeting_details},
                form_response: message
            });
            self.meetingCreated(e);
        }).catch(function (err) {
            let message = err.message;
            self.setState({
                form_response: message
            })
        })
    };


    render(){
        return (
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> Creating Meeting</h3>
                </div>

                <form className="form-horizontal">
                    <div className="form-group">
                        <label> Subject </label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="meeting_subject" value={this.state.meeting.meeting_subject} onChange={e => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label> Notes </label>
                        <div className="input-group">
                            <textarea className="form-control" name="meeting_notes" value={this.state.meeting.meeting_notes} onChange={e => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label> Memorandum </label>
                        <div className="input-group">
                            <textarea className="form-control" name="meeting_memorandum" value={this.state.meeting.meeting_memorandum} onChange={e => this.onChange(e)} />
                        </div>
                    </div>


                    <div className="form-group">
                        <label> Date </label>
                        <div className="input-group">
                            <input type="date" className="form-control" name="meeting_date" value={this.state.meeting.meeting_date} onChange={e => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label> Time </label>
                        <div className="input-group">
                            <input type="time" className="form-control" name="meeting_time" value={this.state.meeting.meeting_time} onChange={e => this.onChange(e)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="button" className="btn btn-outline-dark btn-app btn-block" onClick={e => this.onCreateMeeting(e)}> <strong> Create Meeting</strong></button>
                    </div>

                    {
                        (this.state.form_response) ?
                            <div className="form-group">
                                <label>{this.state.form_response}</label>
                            </div>
                        :""
                    }

                </form>
            </div>
        )
    }
}

class Meetings extends Component{
    constructor(props){
        super(props);
        this.state = {
            meetings_list : [],
            meeting : {...meeting_details},
            show_meeting : true,
            show_create_meeting : false
        };

        this.onShow = this.onShow.bind(this);
        this.onMeetingCreated = this.onMeetingCreated.bind(this);
        // this.loadMeetings = this.loadMeetings.bind(this);
    };

    onShow(e){

        switch(e.target.name){
            case "meetings" :
                this.setState({
                    show_meeting : true,
                    show_create_meeting : false

                });break;
            case "createmeeting":
                this.setState({
                    show_meeting : false,
                    show_create_meeting : true

                });break;
            default:break;
        }

    };

    onMeetingCreated(meeting){
        let meetings_list = Object.assign([],this.state.meetings_list);
        meetings_list.push(meeting);
        this.setState({
            meetings_list : meetings_list
        });

        console.log("Meeting Added to list");
    }

    loadMeetings(e){

        let self = this;

        Axios.get(centers_routes.load_meetings_url + self.props.center_id).then(function (response) {
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error fetching meetings")
            }
        }).then(function(data){
            console.log("Meetings List loaded");
            console.log(data);
            self.setState({
                meetings_list : data
            })

        }).catch(function(err){
            console.log(err.message)
        })
    }

    componentWillMount(e){
        this.loadMeetings(e);

        // let meetings_list = this.props.meetings_list;
        // let this_meetings_list = Object.assign([],this.state.meetings_list);
        //
        // if (meetings_list !== undefined){
        //     this_meetings_list = meetings_list;
        // }
        //
        // this.setState({
        //     meetings_list : this_meetings_list
        // });
    }

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> Meetings </h3>

                    <div className="row pull-right">
                        <button className="btn btn-outline-dark btn-box-tool" name="meetings" onClick={e => this.onShow(e)}> <strong> Meetings  </strong></button>
                        <button className="btn btn-outline-dark btn-box-tool" name="createmeeting"  onClick={e => this.onShow(e)}> <strong> Create Meeting </strong></button>
                    </div>
                </div>

                {
                    (this.state.show_meeting) ?
                        <ShowMeeting
                            meetings_list={this.state.meetings_list}
                        />
                    :""
                }

                {
                    (this.state.show_create_meeting) ?
                        <CreateMeeting
                            onMeetingCreated={this.onMeetingCreated}
                            center_id = {this.props.center_id}
                        />

                    :""
                }
            </div>
        )
    }
}

export default Meetings;


