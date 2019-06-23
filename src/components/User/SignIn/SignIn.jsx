import React, { Component } from 'react';
import './signin.css';

import Intro from '../../Intro/Intro';
import { withRouter } from 'react-router-dom';

import SignUpPage  from '../Signup/Signup';
import { auth } from '../../../firebase';
import * as routes from '../../../constants/routes';


class SignInPage extends Component{
    constructor(){
        super();
        this.state = {
            message : "",
            load_signin : true,
            load_signup : false,
        };

        this.onSignUp = this.onSignUp.bind(this);
        this.onShow = this.onShow.bind(this);
    }

    onSignUp(e){
        console.log("On Sign Up");
    };
    onShow(e){
        switch (e.target.name) {
            case "signup":
                this.setState({
                    load_signin : false,
                    load_signup : true,
                });break;
            case "signin":
                this.setState({
                    load_signin : true,
                    load_signup : false,
                });break;
            default:break;
        }
    }

    render() {
        return (

            <div className="sign-in">

                <Intro/>

                <div className="row">
                    <div className="col-lg-3">

                        <div className="box box-primary">
                            <div className="box box-header">
                                <h3 className="box-title"> Login </h3>
                            </div>
                        </div>

                        <button name={"signup"} type="button" className="btn btn-info btn-block"
                                onClick={e => this.onShow(e)}><strong> <i className="fa fa-sign-in"> </i> Sign Up
                        </strong></button>
                        <button name={"signin"} type="button" className="btn btn-success btn-block"
                                onClick={e => this.onShow(e)}><strong> <i className="fa fa-sign-in"> </i> Sign In
                        </strong></button>


                    </div>

                    <div className="col-lg-9">
                        <div className="box box-body">
                            {
                                (this.state.load_signin) ?
                                    <SignInForm
                                        history={[routes.home]}
                                    />
                                :""
                            }
                            {
                                (this.state.load_signup) ?
                                    <SignUpPage />
                                :""

                            }

                        </div>

                    </div>
                </div>

            </div>
        )
    }
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const Initial_State = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...Initial_State };
    }

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...Initial_State });
                history.push(routes.home);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    };

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div className="col-lg-6">
            <div className="box box-header">
                <h3 className="box-title"> Sign In </h3>
            </div>
            <form className="form-horizontal" onSubmit={this.onSubmit}>

                <div className="form-group">
                    <input className="form-control"
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"
                    />
                </div>

                <div className="form-group">
                    <input className="form-control"
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className="form-group">
                    <button disabled={isInvalid} type="submit" className="btn btn-primary btn-block">
                            <strong>Sign In</strong>
                    </button>
                </div>

                {error && <p>{error.message}</p>}
            </form>
            </div>
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm,
};