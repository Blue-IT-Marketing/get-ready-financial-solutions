import React from 'react';
import "./ToggleButton.css";


const ToggleButton = props => (
        <button className="toggle_button" onClick={props.click}>
            <i className='fa fa-bars'> </i>
        </button>    
);

export default ToggleButton;