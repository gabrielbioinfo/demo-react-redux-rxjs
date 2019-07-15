import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';

class TabContainer extends Component {
    render(){
        return (
            <Tab component="a" onClick={event => event.preventDefault()} {...this.props} />
        );
    }
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TabContainer;
