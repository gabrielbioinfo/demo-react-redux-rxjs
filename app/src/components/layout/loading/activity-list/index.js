import React, { Component } from 'react';
import './style.scss';

class LoadingActivityList extends Component {
    render() {
        return (
            <div className="Loading flex column">
                <div className="body flex column">
                    {['', '', '' ,''].map((e,i)=>(
                        <div key={i} className="item flex">
                            <div className="icon colored marg10 circle">&nbsp;</div>
                            <div className="content marg10 grow flex column">
                                <div className="colored marg-bot-5 marg-right-20">&nbsp;</div>
                                <div className="colored w50">&nbsp;</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
export default LoadingActivityList;
