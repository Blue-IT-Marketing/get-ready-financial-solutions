
import React, { Component } from 'react'

export default class InlineError extends Component {
    constructor(props){
        super(props);
        this.state= {message : this.props.message}
    }
  render() {
    return (
            <p className='alert-dismissable alert-danger'>
                {this.state.message}
            </p>
            )
  }
}
