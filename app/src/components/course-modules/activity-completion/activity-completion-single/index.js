import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withStyles }       from '@material-ui/core/styles';

import Typography           from '@material-ui/core/Typography';
import IconByName           from '../../../layout/icon-by-name';
import util                 from '../../../../util';

import './style.scss';
const styles = theme => ({
    root: {}
});

class ActivityCompletionSingle extends Component {
    render() {
        const { classes, activity, user } = this.props;
        if(!activity.completion)
            return "";
        
        if(!util.security.hasCapability(user, {restrictions:{roles:['student']}}))
            return "";
        
        let completed = !!user.completions.filter(activityId=>activityId===activity.id).length;
        
        return (
            <div className={`${classes.root} course-modules-activity-completion-single`}>
                { activity.completion && 
                    <div className={`${`completion-container`} ${completed ? classes.completionContainerCompleted : ''}`}>
                        <Typography component="span" className={`completion`}> </Typography>
                        <IconByName className={`${completed ? "icon-check-completed" : "icon-check"}`} name={completed ? 'radio_button_checked' : 'radio_button_unchecked'} />
                    </div>
                }
            </div>
        );
    }
}

ActivityCompletionSingle.propTypes = {
    classes      : PropTypes.object.isRequired,
    activity     : PropTypes.object.isRequired,
    user         : PropTypes.object.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(ActivityCompletionSingle) );