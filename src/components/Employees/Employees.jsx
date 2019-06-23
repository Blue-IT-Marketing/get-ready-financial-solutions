
import React from "react";

import "./Employees.css";
import Intro from "../Intro/Intro";

const Employees = props => {
    return (
        <div className="employees">
        <Intro />
            <div className="row">
                <div className="col-lg-3">

                    <div className="box box-primary">
                        <div className="box box-header">
                            <h3 className="box box-title">Employees</h3>
                        </div>


                    </div>

                </div>
                <div className="col-lg-9">

                </div>

            </div>   
        </div>
    )
}


export default Employees