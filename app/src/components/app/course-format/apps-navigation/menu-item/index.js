import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withStyles }       from '@material-ui/core/styles';
import IconButton           from '@material-ui/core/IconButton';
import actions              from '../../../../../actions';
import IconByName           from '../../../../layout/icon-by-name';
import util                 from '../../../../../util';

import './style.scss';
const styles = theme => ({
    root: {},
    app:{}
});

class AppsNavigationMenuItem extends Component {

    constructor(props){
        super(props);
        this.callApp = this.callApp.bind(this);
    }

    callApp(e, rootActivity=null){
        e.preventDefault();
        if(!rootActivity)
            return;
        
        util.application.getHistory().push(util.application.getPathToActivity(rootActivity));
    }

    render() {
        const { classes, activity } = this.props;
        let appType = activity.layout ? activity.layout : activity.type;
        return (
            <IconButton onClick={(e)=>(this.callApp(e, activity))}>
                <IconByName name={activity.icon} className={`${classes.app} ${appType}-icon menu-item-icon`} />
            </IconButton>
        );
    }
}

AppsNavigationMenuItem.propTypes = {
    classes     : PropTypes.object.isRequired,
    activity    : PropTypes.object.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {applicationChangeApp: actions.application.applicationChangeApp};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(AppsNavigationMenuItem) );