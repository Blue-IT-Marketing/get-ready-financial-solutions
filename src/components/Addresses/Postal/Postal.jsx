
import React, { Component } from "react";
import "./Postal.css";
import Axios from "axios";
import * as centers_routes from "../../../constants/centers-routes";
import * as Utils from '../../../constants/utilities';
import InlineError from "../../Forms/InlineError";
import InlineMessage from "../../Forms/InlineMessage";

export let postal_address_detail = {
            postal_id : "",
            box : "",
            cityTown : "",
            province : "",
            country : "",
            postal_code : "",
};
export class DisplayPostal extends Component{
    constructor(props){
        super(props);
        this.state = {
            postal_address : {...this.props.postal_address},

        };
    };

    render(){
        return(
            <div className={'box box-body'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}> <strong> <i className={'fa fa-envelope'}> </i> Postal Address </strong></h3>
                </div>

                <div className={'box box-footer'}>
                    <ul className={'list-group'}>
                        <li className={'list-group-item'}><strong> Box Number : </strong> <em>{this.state.postal_address.box}</em></li>
                        <li className={'list-group-item'}><strong> City Town : </strong> <em> {this.state.postal_address.cityTown }</em></li>
                        <li className={'list-group-item'}><strong> Province : </strong> <em> {this.state.postal_address.province }</em></li>
                        <li className={'list-group-item'}><strong> Country : </strong> <em> {this.state.postal_address.country }</em></li>
                        <li className={'list-group-item'}><strong> Postal Code : </strong> <em> {this.state.postal_address.postal_code }</em></li>
                        <li className={'list-group-item'}><button className={'btn btn-success'}><strong><i className={'fa fa-print'}> </i> Print </strong></button> <button className={'btn btn-info'}><strong><i className={'fa fa-edit'}> </i> Edit </strong></button></li>
                    </ul>
                </div>
            </div>
        )
    }
}

class Postal extends Component{
    constructor(props){
        super(props);
        this.state = {
            postal_address : {...postal_address_detail},

            box_errors : '',
            cityTown_errors : '',
            province_error : '',
            country_error : '',
            postal_code_error : '',
            form_response : ''
        };

        this.onChange = this.onChange.bind(this);
        this.SavePostalAddress = this.SavePostalAddress.bind(this);
        this.assignProps = this.assignProps.bind(this);
        this.doCheckErrors = this.doCheckErrors.bind(this);
    };

    onChange(e){
        let postal_address = Object.assign({},this.state.postal_address);

        switch(e.target.name){
            case "box" : postal_address.box = e.target.value;break;
            case "cityTown" : postal_address.cityTown = e.target.value;break;
            case "province" : postal_address.province = e.target.value;break;
            case "country" : postal_address.country = e.target.value;break;
            case "postal_code" : postal_address.postal_code = e.target.value;break;
            default:break;
        }

        this.setState({
            postal_address:postal_address
        });
    };

    SavePostalAddress(e){
        let self = this;
        let postal_address = Object.assign({},this.state.postal_address);

        Axios.post(centers_routes.save_centers_postal_address_url,"&data="+JSON.stringify(postal_address)).then(function(response){
            if (response.status === 200){

                return response.data;
            }else{
                let message = response.statusText;
                throw new Error(message);
            }
        }).then(function(json_data){
            let message = json_data.message;
            console.log("RETURNED MESSAGE : " + message);

            self.setState({
                form_response : message,
                postal_address : postal_address
            });
            

            
        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            });
        });

        // self.props.onPostalSaved(e);

    };

    assignProps(e){
        let postal_address = Object.assign({}, this.state.postal_address);
        postal_address.postal_id = this.props.postal_id;
        postal_address.box = this.props.postal_address.box;
        postal_address.cityTown = this.props.postal_address.cityTown;
        postal_address.province = this.props.postal_address.province;
        postal_address.country = this.props.postal_address.country;
        postal_address.postal_code = this.props.postal_address.postal_code;

        this.setState({
            postal_address: postal_address
        });

    }

    doCheckErrors(){
        let isError = false;
        let postal_address = Object.assign({}, this.state.postal_address);

        if (Utils.isEmpty(postal_address.box) === true){
            this.setState({
                box_errors : 'Box field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(postal_address.cityTown) === true){
            this.setState({
                cityTown_errors : 'City Town field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isProvince(postal_address.province) === false){
            this.setState({
                province_error : 'Please select a province'
            });
            isError = true;
        }

        if (Utils.isEmpty(postal_address.country) === true){
            this.setState({
                country_error : 'Please select a country'
            });
            isError = true
        }

        if (Utils.isEmpty(postal_address.postal_code) === true){
            this.setState({
              postal_code_error : 'Postal Code cannot be empty'
            });
            isError = true
        }

        return isError
    }

    componentWillMount(e){
        this.assignProps(e);
    }



    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <i className="fa fa-send-o"> </i> Postal Address</h3>
                </div>

                <form className="form-horizontal">
                    <div className="form-group">
                        <label> <strong> <i className={'fa fa-bookmark-o'}> </i> Box </strong></label>

                        <input type="text" className="form-control" placeholder="Box Number" name="box" value={this.state.postal_address.box} onChange={e => this.onChange(e)}/>
                        {(this.state.box_errors) ? <InlineError message={this.state.box_errors} /> : ''}

                    </div>
                    <div className="form-group">
                        <label><strong> <i className={'fa fa-building'}> </i> City/Town </strong></label>

                            <input type="text" className="form-control" placeholder="City Town" name="cityTown" value={this.state.postal_address.cityTown} onChange={e => this.onChange(e)} />
                            {(this.state.cityTown_error) ? <InlineError message={this.state.cityTown_error}/>: ''}
                    </div>
                    <div className="form-group">
                        <label> <strong><i className='fa fa-map-marker'> </i> Province </strong></label>

                            <select className={"form-control"} name={"province"} value={this.state.postal_address.province} onChange={e => this.onChange(e)} >
                                <option value={'limpopo'}>Limpopo</option>
                                <option value={'mpumalanga'}>Mpumalanga</option>
                                <option value={'north west'}>North West</option>
                                <option value={'gauteng'}>Gauteng</option>
                                <option value={'bloemfontein'}>Bloemfontein</option>
                                <option value={'eastern cape'}>Eastern Cape</option>
                                <option value={'western cape'}>Western Cape</option>
                                <option value={'southern cape'}>Southern Cape</option>
                                <option value={'kwazulu natal'}>Kwa Zulu Natal</option>
                            </select>
                            {(this.state.province_error) ? <InlineError message={this.state.province_error}/> : ''}
                    </div>
                    <div className="form-group">
                        <label> <strong><i className='fa fa-globe'> </i> Country </strong> </label>

                            <select className={'form-control'} name={'country'} value={this.state.postal_address.country} onChange={e => this.onChange(e)} >
                                <option value={'south africa'}>South Africa</option>
                                <option value={'botswana'}>Botswana</option>
                                <option value={'namibia'}>Namibia</option>
                                <option value={'lesotho'}>Lesotho</option>
                                <option value={'mozambique'}>Mozambique</option>
                                <option value={'tanzania'}>Tanzania</option>
                                <option value={'malawi'}>Malawi</option>
                                <option value={'zambia'}>Zambia</option>
                                <option value={'congo'}>Congo</option>
                            </select>
                        {(this.state.country_error) ? <InlineError message={this.state.country_error}/> : ''}
                    </div>
                    <div className="form-group">
                        <label> <strong> <i className={'fa fa-code'}> </i> Postal Code </strong> </label>

                            <input type="text" className="form-control" placeholder="Postal Code" name="postal_code" value={this.state.postal_address.postal_code} onChange={e => this.onChange(e)} />
                        {(this.state.postal_code_error) ? <InlineError message={this.state.postal_code_error}/> : ''}
                    </div>

                    <div className="form-group">
                        <div className="input-group">

                            <button type="button" className="btn btn-primary"
                                    onClick={e =>
                                    { if (this.doCheckErrors() === false) {
                                        this.SavePostalAddress(e)
                                    }}}>
                                <strong> <i className={'fa fa-save'}> </i> Save Postal Address</strong>
                            </button>

                            <button

                                type='button'
                                className='btn btn-warning'
                                onClick={ e => this.setState({
                                        postal_address : {...postal_address_detail},

                                        box_errors : '',
                                        cityTown_errors : '',
                                        province_error : '',
                                        country_error : '',
                                        postal_code_error : '',
                                        form_response : ''
                                    })}>

                                <strong><i className='fa fa-eraser'> </i> Reset

                                </strong>


                            </button>

                        </div>
                    </div>
                    {(this.state.form_response)? <InlineMessage message={this.state.form_response} message_type={'info'}/> :""}

                </form>
            </div>
        )
    }
};

export default Postal;