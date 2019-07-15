import React, { Component } from 'react';
import './style.scss';

class LoadingHeader extends Component {
    render() {
        return (
            <div className="Loading flex column">
                <div className="header colored">&nbsp;</div>
                <div className="nav colored marg-bot-10 flex">
                    &nbsp;
                    {/* <div className="colored2 pad15 w20">&nbsp;</div> */}
                </div>
            </div>
        );
    }
}
export default LoadingHeader;
