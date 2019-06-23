import React, { Component } from 'react';

export default class Print extends Component {
    constructor(props){
        super(props);
        this.state = { 
            page_title :'',
            print_text : '',
            page_footer : ''
         };

        this.onDoPrint = this.onDoPrint.bind(this);
        this.assignProps = this.assignProps.bind(this);
    };

    onDoPrint(e){

    }

    assignProps(e){
      this.setState({
        page_title: this.props.page_title,
        print_text: this.props.print_text,
        page_footer: this.props.page_footer
      });
    }

    componentWillMount(e){
      this.assignProps(e);
    }

  render() {
    return (
    <div className='box box-footer'>
        <div className='box box-header'>
              {this.state.page_title}
        </div>
              {this.state.print_text}
              {this.state.page_footer}
      </div>  
    )
  }
}
