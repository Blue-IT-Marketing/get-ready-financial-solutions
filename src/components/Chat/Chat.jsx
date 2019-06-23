
import React from "react";
import ChatMenu from "./ChatMenu/ChatMenu";
import "./Chat.css";
import Intro from "../Intro/Intro";

const Chat = props => {
    return (
        <div className="chat">
            <Intro />
            <div className="row">
                <div className="col-md-3">
                    <ChatMenu />
                </div>
                <div className="col-md-9">
                </div>
            
            </div>

        </div>
    )
}


export default Chat