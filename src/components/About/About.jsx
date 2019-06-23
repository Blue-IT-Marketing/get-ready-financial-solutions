
import React , {Component} from "react";

import "./About.css";
import Intro from "../Intro/Intro";





class About extends Component{
    constructor(){
        super();
        this.state = {
            show_main : true,
            show_head_office : false,
            show_vision : false,
            show_mission : false,
            show_logo_translation : false

        };

        this.onShow = this.onShow.bind(this);
    };

    onShow(e){
        switch (e.target.name) {

            case "ready" :
                this.setState({
                    show_main : true,
                    show_head_office : false,
                    show_vision : false,
                    show_mission : false,
                    show_logo_translation : false
                });break;

            case "office" :
                this.setState({
                    show_main : false,
                    show_head_office : true,
                    show_vision : false,
                    show_mission : false,
                    show_logo_translation : false
                });break;

            case "vision" :
                this.setState({
                    show_main : false,
                    show_head_office : false,
                    show_vision : true,
                    show_mission : false,
                    show_logo_translation : false
                });break;

            case "mission" :
                this.setState({
                    show_main : false,
                    show_head_office : false,
                    show_vision : false,
                    show_mission : true,
                    show_logo_translation : false
                });break;

            case "logo" :
                this.setState({
                    show_main : false,
                    show_head_office : false,
                    show_vision : false,
                    show_mission : false,
                    show_logo_translation : true
                });break;
            default: break;

        }
    }

    render(){
    return (
        <div className="about">    
        <Intro />
            <div className="row">
                                    
                        <div className="col-lg-3">

                            <div className="box box-primary">
                                <div className="box box-header">
                                    <h3 className="box-title"> <i className="fa fa-info"> </i> <strong>About</strong></h3>
                                </div>
                                <ul className='list-group'>
                                    <li className='list-group-item'><button type="button" className="btn btn-app btn-block btn-outline-dark" name={"ready"} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-globe'}> </i> Get Ready</strong></button></li>
                                    <li className='list-group-item'><button type="button" className="btn btn-app btn-block btn-outline-dark" name={"office"} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-building-o'}> </i>     Head Office</strong></button></li>
                                    <li className='list-group-item'><button type="button" className="btn btn-app btn-block btn-outline-dark" name={"vision"} onClick={e => this.onShow(e)}><strong> <i className={'fa fa-bullseye'}> </i>  Vision</strong></button></li>
                                    <li className='list-group-item'><button type="button" className="btn btn-app btn-block btn-outline-dark" name={"mission"} onClick={e => this.onShow(e)}><strong> <i className='fa fa-check-circle-o'> </i> Mission</strong></button></li>
                                    <li className='list-group-item'><button type="button" className="btn btn-app btn-block btn-outline-dark" name={"logo"} onClick={e => this.onShow(e)}><strong>  <i className='fa fa-arrow-circle-left'> </i>  Our Logo</strong></button></li>
                                </ul>
                            </div>

                        </div>
                        <div className="col-lg-9">
                            {
                                (this.state.show_main) ?
                                    <div className="box box-body">
                                        <div className="box box-header">
                                    <h3 className="box-title"> <strong> <i className={'fa fa-globe'}> </i>  About Us</strong></h3>
                                        </div>

                                        <blockquote>Get Ready Centre is a Non-Profit Organisation that was formed in 2000, it has three divisions:</blockquote>
                                        <ul className="list-group">
                                            <li className="list-group-item">Get Ready Developmental Microfinance Institution</li>
                                            <li className="list-group-item">Get Ready Information Services – Community Health Programmes ( CHBC, PLHIV & CARER Mentorship, EPWP Greenery).</li>
                                            <li className="list-group-item">Get Ready Cooperative Financial Institution</li>
                                        </ul>
                                    </div>
                                : ""

                            }

                            {
                                (this.state.show_head_office) ?
                                    <div className="box box-body">

                                        <div className="box box-header">
                                    <h3 className="box-title"> <strong>  <i className={'fa fa-building-o'}> </i> Head Office</strong></h3>
                                        </div>

                                        <blockquote>The Head office for Get Ready is in Malamulele and currently we have 3 Branches including the head office in Malamulele, a branch in Xikukwane Village, Mopane District and the third one is in Kuruman, Northern Cape.</blockquote>
                                        <blockquote>Get Ready also opened a Coordination Office in Gauteng Province,  Riversands Incubation Hub NPC, 8 Incubation Drive
                                                Riverside View Ext. 15, Unit R14 MIDRAND</blockquote>
                                    </div>
                                : ""
                            }

                            {
                                (this.state.show_vision) ?
                                    <div className="box box-body">
                                        <div className="box box-header">
                                    <h3 className="box-title"><strong> <i className={'fa fa-bullseye'}> </i> Vision</strong></h3>
                                        </div>

                                        <blockquote>‘To be the preferred centre that unleashes potential of human capital through health, social and economic development.’</blockquote>
                                    </div>
                                : ""
                            }
                            {
                                (this.state.show_mission) ?
                                    <div className="box box-body">
                                        <div className="box box-header">
                                    <h3 className="box-title"><strong> <i className='fa fa-check-circle-o'> </i> Mission</strong></h3>
                                        </div>

                                        <blockquote>‘To provide affordable access to finance and integrated non – financial services to low income marginalized people.’</blockquote>
                                    </div>
                                : ""

                            }
                            {
                                (this.state.show_logo_translation) ?
                                    <div className="box box-body">
                                        <div className="box box-header">
                                    <h3 className="box-title"> <strong>   <i className='fa fa-arrow-circle-left'> </i> Logo Translation</strong></h3>
                                        </div>
                                        <blockquote>It translates as embracing diversity that stretches empowerment towards development for poverty alleviation.</blockquote>
                                    </div>
                                :""
                            }

                        </div>
                    
            </div>            
        </div>
    )}
}


export default About