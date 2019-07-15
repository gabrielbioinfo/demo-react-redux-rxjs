import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';

class LinkTab extends Component {
    render(){
        return (
            <Tab component="a" onClick={event => event.preventDefault()} {...this.props} />
        );
    }
}

export default LinkTab;
