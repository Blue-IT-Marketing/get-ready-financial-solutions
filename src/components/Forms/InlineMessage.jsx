
import React, { Component } from 'react'

export default class InlineMessage extends Component {
    constructor(props){
        super(props);
        this.state = {message : this.props.message,
        message_type : this.props.message_type}
    }
  render() {
    let myClass = '';

    if (this.state.message_type === 'error'){
        myClass = 'alert-dismissable alert-danger'
    }else{
        myClass = 'alert-dismissable alert-info'
    }

    return (
                <p className={myClass}>
                    {this.state.message}
                </p>
            )
  }
}
