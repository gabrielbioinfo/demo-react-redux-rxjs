import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withStyles }       from '@material-ui/core/styles';

import ActivityCompletionSingle from '../activity-completion-single';
// import ActivityCompletionSection from '../activity-completion-section';
import util                 from '../../../../util';

import './style.scss';
const styles = theme => ({
    root: {}
});

class ActivityCompletion extends Component {
    render() {
        const { classes, activity, user } = this.props;
        if(!activity.completion)
            return "";
        
        if(!util.security.hasCapability(user, {restrictions:{rules:['student_only']}}))
            return "";
        
        // if(activity.type==="section" && Object.keys(activity).includes('activities') && activity.activities.length>0 )
        //     return (<ActivityCompletionSection activity={activity} />);
        
        return(<ActivityCompletionSingle className={`${classes.root} course-modules-activity-completion`} activity={activity} />);
    }
}

ActivityCompletion.propTypes = {
    classes      : PropTypes.object.isRequired,
    activity     : PropTypes.object.isRequired,
    user         : PropTypes.object.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(ActivityCompletion) );