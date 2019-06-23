import React ,{Component} from "react";
import axios from "axios";

class Finances extends Component{
    constructor(props) {
        super(props);
        this.state ={
            finances : '',
            show_disbursements : false
        };

        this.onSwitch = this.onSwitch.bind(this);
    };
    
    onSwitch(e){
        switch (e.target.name) {
            case 'disbursements':
                this.setState({
                    show_disbursements : true
                })
        }
    }

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-credit-card-alt'> </i> Finances </strong></h3>

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
                        <strong><i className={'fa fa-close'}> </i> Close </strong>

                    </button>

                    <button
                        type={'button'}
                        className={'btn btn-box-tool btn-outline-dark pull-right'}
                        name={'disbursements'}
                        onClick={e => this.onSwitch(e)}
                        title={'Disbursements'}
                    >
                        <strong><i className={'fa fa-bank'}> </i> Disbursements </strong>

                    </button>
                </div>
            </div>
        )
    }

}


export default Finances;