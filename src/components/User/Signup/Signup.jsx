
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../../../constants/routes';

import {auth} from '../../../firebase';
import Intro from '../../Intro/Intro';


const SignUpPage = (history) =>{
    return(
            <div>
                <div className="box box-header">
                    <h3 className="box-title">Sign Up</h3> <br />
                    <small> if you do not have an account please use this page to create a new account</small>
                </div>

                <SignUpForm />
            </div>
    );
};


const Initial_State = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,    
};


const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});



class SignUpForm extends Component {
    constructor(props){
        super(props);
        this.state = { ...Initial_State };
    };

    onSubmit = (event) => {

        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...Initial_State });
                history.push(routes.home);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();        

    };

    render () {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div className="col-md-6">
            <form className="form-horizontal" onSubmit={this.onSubmit}>

            <div className="form-group">
                <input className="form-control"
                    value={username}
                    onChange={event => this.setState(byPropKey('username', event.target.value))}
                    type="text"
                    placeholder="Full Name"
                />            
            </div>

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
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                    />
                </div>
                <div className="form-group">

                    <input className="form-control"
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                />
                </div>
                <div className="form-group">

                    <button disabled={isInvalid}  type="submit" className="btn btn-primary btn-block">
                    Sign Up
                </button>
                </div>
                {error && <p>{error.message}</p>}            

            </form>
            
            </div>
        )
    };
}


const SignUpLink = () => {
    return (
    <div className="form-group">
        <blockquote>
            Don't have an account ?account
            {' '}
            <NavLink to={routes.signup}> Sign Up </NavLink>
        </blockquote>
    </div>
    );
}

export default SignUpPage;
export {
    SignUpForm,
    SignUpLink
};