import React, { Component } from "react";
import Axios from "axios";
import * as centers_routes from "../../constants/centers-routes";
import * as Utils from '../../constants/utilities';
import InlineError from "../Forms/InlineError";
import InlineMessage from "../Forms/InlineMessage";

export let client_files_type = {
    client_id : '',
    file_id : '',
    filename : '',
    file_type : '',
    file_size : '',
    date_uploaded : ''
};

class ClientFiles extends Component{
    constructor(props){
        super(props);
        this.state = {
            client_files : {...client_files_type}
        };
    };


    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-file-archive-o'> </i> Client Files </strong></h3>

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

                </div>






            </div>
        )
    }
}

export class FileServer extends Component{
    constructor(props){
        super(props);
        this.state = {
            file_list : []
        };
    };

    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className={'fa fa-server'}> </i> File Server </strong></h3>
                </div>

                <table className='table table-responsive table-striped'>
                    <thead>
                        <tr>
                            <td><strong> <i className='fa fa-file'> </i> Filename</strong></td>
                            <td><strong> <i className='fa fa-file-o'> </i> File Type</strong></td>
                            <td><strong> <i className='fa fa-file-text-o'> </i>  File Size</strong></td>
                            <td><strong> <i className='fa fa-calendar'> </i> Date Uploaded</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>picture</td>
                            <td>jpg</td>
                            <td>256 KB</td>
                            <td>2019/03/21</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong> <i className='fa fa-file'> </i> Filename</strong></td>
                            <td><strong> <i className='fa fa-file-o'> </i> File Type</strong></td>
                            <td><strong> <i className='fa fa-file-text-o'> </i>  File Size</strong></td>
                            <td><strong> <i className='fa fa-calendar'> </i> Date Uploaded</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export class UploadFiles extends Component{
    constructor(props) {
        super(props);
        this.state ={
            uploaded_file : {...client_files_type}
        };

        this.doUploadFile = this.doUploadFile.bind(this);
    };


    doUploadFile(e){
        console.log('uploading file from client files module');
        let self = this;

    }


    render(){
        return(
            <div className={'box box-footer'}>
                <div className={'box box-header'}>
                    <h3 className={'box-title'}><strong> <i className='fa fa-cloud-upload'> </i> Upload Files </strong></h3>
                </div>


                <form className={'form-horizontal'}>
                    <div className={'form-group'}>
                        <label> <strong> <i className='fa fa-cloud-upload'> </i> Select File  </strong> </label>
                        <input
                            type={'file'}
                            name={'upload_file'}
                            className={'form-control'} />
                    </div>

                    <div className={'form-group'}>
                        <button
                            type={'button'}
                            className={'btn btn-success'}
                            name={'upload-button'}
                            onClick={e => this.doUploadFile(e)}
                        >
                            <strong> <i className='fa fa-cloud-upload'> </i> Upload File </strong>


                        </button>
                    </div>

                </form>

            </div>
        )
    }

}


export default ClientFiles;