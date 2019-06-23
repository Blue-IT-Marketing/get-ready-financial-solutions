import React ,{Component} from 'react';
import Intro from '../../Intro/Intro';
import { auth } from '../../../firebase';
import './SignOut.css';

class SignoutPage extends Component{
    constructor(){
        super();
        this.state = {
            message : ""
        };
        this.onSignOut = this.onSignOut.bind(this);
    }

    onSignOut(e){
        auth.doSignOut();
        this.setState({
            message : "Successfully signed out"
        })
    }

    render(){
        return (
            <div className="box box-body box-danger">
                <div className="box box-header">
                    <h3 className="box-title"><strong>Sign Out </strong></h3>
                </div>
                <button className="btn btn-danger btn-block" type="button" onClick={e => this.onSignOut(e)}>
                    <strong>  <i className="fa fa-sign-out"> </i> Sign Out </strong>
                </button>

                <span className="label-info center-block">{this.state.message}</span>

            </div>
        )
    }
}

const SignOutButton = () =>
{
    return (
        <button className="btn btn-danger btn-block" type="button" onClick={auth.doSignOut}>
            <strong>  <i className="fa fa-sign-out"> </i> Sign Out </strong>
        </button>
    );

};

export default SignoutPage;