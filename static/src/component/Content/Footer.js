import { extend } from "lodash";
import React from "react";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    ignoreSentiment = () => {
        var index = this.props.indexloop - 1;
        this.props.callbackFunction(index)
    }

    backwardSentiment = () => {
        var index = this.props.indexloop + 1;
        this.props.callbackFunction(index)
    }
    
    render(){
        return(
            <footer className="footer_button">
                <div className="div_button">
                    <button className="button_approve" title="accept (a)">
                    <i className="now-ui-icons ui-1_check" style={{fontSize:"xxx-large"}}></i></button>

                    <button className="button_reject" title="reject (x)">
                    <i className="now-ui-icons ui-1_simple-remove" style={{fontSize:"xxx-large"}}></i></button>

                    <button onClick={this.ignoreSentiment} className="button_back" title="ignore (space)">
                    <i className="now-ui-icons arrows-1_minimal-left" style={{fontSize:"xxx-large"}}></i></button>

                    <button onClick={this.backwardSentiment} className="button_back" title="back (backspace)">
                    <i className="now-ui-icons arrows-1_minimal-right" style={{fontSize:"xxx-large"}}></i></button>
                    
                </div>
            </footer>
        )
    }
}

export default Footer;