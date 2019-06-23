
import React, {Component} from "react";
import './Physical.css';
import Axios from "axios";
import * as centers_routes from '../../../constants/centers-routes';
import * as Utils from '../../../constants/utilities';
import InlineError from "../../Forms/InlineError";
import InlineMessage from "../../Forms/InlineMessage";

export let physical_address_details = {
            physical_id : "",
            stand : "",
            street_name: "",
            cityTown: "",
            province: "",
            country: "",
            postal_code: ""
};


export class DisplayPhysical extends Component{
    constructor(props){
        super(props);
        this.state = {
            physical_address : {...this.props.physical_address}
        };
        this.onPrint = this.onPrint.bind(this);
    };

    onPrint(e){

    }

    render(){
        return(
            <div className={'box box-body'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-map-pin'> </i> Physical Address </strong></h3>
                </div>

                <div className={'box box-footer'}>
                    <ul className={'list-group'}>
                        <li className={'list-group-item'}><strong>Stand : </strong> <em> {this.state.physical_address.stand}</em></li>
                        <li className={'list-group-item'}><strong>Street Name : </strong> <em> {this.state.physical_address.street_name}</em></li>
                        <li className={'list-group-item'}><strong>City / Town : </strong> <em> {this.state.physical_address.cityTown}</em></li>
                        <li className={'list-group-item'}><strong>Province : </strong> <em> {this.state.physical_address.province}</em></li>
                        <li className={'list-group-item'}><strong>Country : </strong> <em> {this.state.physical_address.country}</em></li>
                        <li className={'list-group-item'}><strong>Postal Code : </strong> <em> {this.state.physical_address.postal_code}</em></li>
                        <li className={'list-group-item'}><button className={'btn btn-success'} onClick={e => this.onPrint(e)}><strong><i className={'fa fa-print'}> </i> Print </strong></button> <button className={'btn btn-info'}><strong><i className={'fa fa-edit'}> </i> Edit </strong></button></li>
                    </ul>
                </div>
                
            </div>
        )
    }
}

// export let physical_address_details = {
//             physical_id : "",
//             stand : "",
//             street_name: "",
//             cityTown: "",
//             province: "",
//             country: "",
//             postal_code: ""
// };
//



class Physical extends Component{
    constructor(){
        super();
        this.state ={
            physical_address : {...physical_address_details},

            stand_error : '',
            street_name_error : '',
            cityTown_error : '',
            province_error : '',
            country_error : '',
            postal_code_error : '',

            form_response : ''
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onSavePhysicalAddress = this.onSavePhysicalAddress.bind(this);
        this.assignProps = this.assignProps.bind(this);
        this.doCheckErrors = this.doCheckErrors.bind(this);
    };

    onSavePhysicalAddress(e){
        // save the physical address to the back end
        let self = this;
        let physical_address = Object.assign({},this.state.physical_address);

        Axios.post(centers_routes.save_centers_physical_address_url, "&data="+JSON.stringify(physical_address)).then(function(response){
            if (response.status === 200){
                self.props.onPhysicalSaved(e);
                return response.data
            }else{
                throw new Error('Error saving physical address')
            }
        }).then(function(json_data){
            let message = json_data.message;
            self.setState({
                form_response : message
            })

        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response: message
            })
        })
    };

    assignProps(e){

        let physical_address = Object.assign({}, this.state.physical_address);

        physical_address.physical_id = this.props.physical_id;
        physical_address.stand = this.props.physical_address.stand;
        physical_address.street_name = this.props.physical_address.street_name;
        physical_address.cityTown = this.props.physical_address.cityTown;
        physical_address.province = this.props.physical_address.province;
        physical_address.country = this.props.physical_address.country;
        physical_address.postal_code = this.props.physical_address.postal_code;

        this.setState({
            physical_address: physical_address
        });

    }

    onHandleChange(e){
        let physical_address = Object.assign({}, this.state.physical_address);
        switch (e.target.name) {
            case 'stand': physical_address.stand = e.target.value; break;
            case 'street_name': physical_address.street_name = e.target.value; break;
            case 'cityTown': physical_address.cityTown = e.target.value; break;
            case 'province': physical_address.province = e.target.value; break;
            case 'country': physical_address.country = e.target.value; break;
            case 'postal_code': physical_address.postal_code = e.target.value; break;
            default: break;
        }

        this.setState({
            physical_address: physical_address,
            stand_error : '',
            street_name_error : '',
            cityTown_error : '',
            province_error : '',
            country_error : '',
            postal_code_error : '',

            form_response : ''

        });

    };


    doCheckErrors(){

        let isError = false;
        let physical_address = Object.assign({}, this.state.physical_address);

        if (Utils.isEmpty(physical_address.stand) === true){
            this.setState({
                stand_error : 'Stand field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(physical_address.street_name) === true){
            this.setState({
                street_name_error : 'Street Name field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(physical_address.cityTown) === true){
            this.setState({
                cityTown_error : 'City Town field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isProvince(physical_address.province) === false){
            this.setState({
                province_error : 'Province field cannot be empty'
            });
            isError = true;
        }

        if (Utils.isEmpty(physical_address.country) === true){
            this.setState({
                country_error : 'Country field cannot be empty'
            });
            isError = true
        }

        if (Utils.isEmpty(physical_address.postal_code) === true){
            this.setState({
                postal_code_error : 'Postal Code field cannot be empty'
            });
            isError = true
        }


        return isError;



    }

    componentWillMount(e){
        this.assignProps(e);
    };

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <i className="fa fa-building"> </i> Physical Address </h3>
                </div>

                <form className="form-horizontal">
                    <div className="form-group">
                        <label><strong><i className={'fa fa-map-pin'}> </i> Stand</strong></label>

                            <input type="text" className="form-control" name="stand" value={this.state.physical_address.stand} onChange={e => this.onHandleChange(e)} />
                            {(this.state.stand_error) ? <InlineError message={this.state.stand_error}/> : ''}

                    </div>
                    <div className="form-group">
                        <label><strong><i className={'fa fa-map-signs'}> </i> Street Name</strong></label>

                            <input type="text" className="form-control" name="street_name" value={this.state.physical_address.street_name} onChange={e => this.onHandleChange(e)} />
                            {(this.state.street_name_error) ? <InlineError message={this.state.street_name_error} /> : '' }

                    </div>

                    <div className="form-group">
                        <label><strong> <i className={'fa fa-building'}> </i> City Town</strong></label>

                            <input type="text" className="form-control" name="cityTown" value={this.state.physical_address.cityTown} onChange={e => this.onHandleChange(e)} />
                            {(this.state.cityTown_error) ? <InlineError message={this.state.cityTown_error} /> : ''}

                    </div>
                    <div className="form-group">
                        <label><strong><i className='fa fa-map-marker'> </i> Province</strong></label>


                            <select className={"form-control"} name={"province"} value={this.state.physical_address.province} onChange={e => this.onHandleChange(e)} >
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
                        <label><strong><i className='fa fa-globe'> </i> Country</strong></label>

                            <select className={'form-control'} name={'country'} value={this.state.physical_address.country} onChange={e => this.onHandleChange(e)} >
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
                        <label><strong> <i className={'fa fa-code'}> </i> Postal Code</strong></label>

                        <input type="text" className="form-control" name="postal_code" value={this.state.physical_address.postal_code} onChange={e => this.onHandleChange(e)} />
                        {(this.state.postal_code_error) ? <InlineError message={this.state.postal_code_error}/> : ''}

                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <button type="button" className="btn btn-primary btn-outline-dark"
                                    onClick={e => {
                                        if (this.doCheckErrors() === false){
                                            this.onSavePhysicalAddress(e)
                                        }
                                    } }>
                                <strong> <i className='fa fa-save'> </i> Save Physical Address</strong>
                            </button>

                            <button
                                type='button' className='btn btn-warning btn-outline-dark'
                                onClick={e => {
                                    this.setState({
                                        physical_address : {...physical_address_details},

                                        stand_error : '',
                                        street_name_error : '',
                                        cityTown_error : '',
                                        province_error : '',
                                        country_error : '',
                                        postal_code_error : '',

                                        form_response : ''

                                    });
                                }}
                            >
                                <strong> <i className='fa fa-eraser'> </i> Reset</strong>


                            </button>
                        </div>
                    </div>
                    {(this.state.form_response) ? <InlineMessage message={this.state.form_response} message_type={'INFO'}/> : '' }
                </form>

            </div>
        )
    }
};

export default Physical;

