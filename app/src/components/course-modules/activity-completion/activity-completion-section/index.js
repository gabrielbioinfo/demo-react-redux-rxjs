import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withStyles }       from '@material-ui/core/styles';

import Typography           from '@material-ui/core/Typography';
import util                 from '../../../../util';

import './style.scss';
const styles = theme => ({
    root: {}
});

class ActivityCompletionSection extends Component {

    render() {
        const { classes, activity, user } = this.props;
        if(!activity.completion)
            return "";
        
        if(!util.security.hasCapability(user, {restrictions:{roles:['student']}}))
            return "";
        
        const totalActivities     = activity.activities.length;
        const totalActivitiesDone = activity.activities.filter(activityId=>(user.completions.includes(activityId))).length;
        const completed           = ((totalActivitiesDone===totalActivities) || user.completions.includes(activity.id));

        return (
            <div className={`${classes.root} course-modules-activity-completion-section`}>
                { activity.completion && 
                    <div className={`${"completion-container"} ${completed ? "completion-container-completed" : ''}`}>
                        <Typography component="span" className={"completion"}>{`${totalActivitiesDone}/${totalActivities}`}</Typography>
                    </div>
                }
            </div>
        );
    }
}

ActivityCompletionSection.propTypes = {
    classes      : PropTypes.object.isRequired,
    activity     : PropTypes.object.isRequired,
    user         : PropTypes.object.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(ActivityCompletionSection) );