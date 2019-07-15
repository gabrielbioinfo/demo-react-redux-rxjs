import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withStyles }       from '@material-ui/core/styles';
import Typography           from '@material-ui/core/Typography';
import AppBar               from '@material-ui/core/AppBar';
import AppsNavigation       from '../apps-navigation';
import MainNavigation       from '../main-navigation';
import CourseSettingsMenu   from '../../../course-modules/course-settings-menu';

import './style.scss';
import actions from '../../../../actions';
const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main
    },
    title:{
        ...theme.typography.title
    }
});

class CourseFormatHeader extends Component {

    render() {
        const { classes, course, mainSections, activityIndex, handleChange } = this.props;
        let activity    = {...course};
        activity.title  = activity.name;

        return (
            <AppBar className={`${classes.root} course-format-header`} position="static" elevation={1}>
                <div className={`first-line`}>
                    <Typography component="h2" className={`${classes.title} title`}>{course.name}</Typography>
                    <div className={`optionbar`}>
                        <AppsNavigation />
                        <CourseSettingsMenu activity={activity}/>
                    </div>
                </div>
                <div className={`mainNavigation`}>
                    <MainNavigation mainSections={mainSections} activityIndex={activityIndex} handleChange={handleChange} />
                </div>
            </AppBar>
        );
    }
}

CourseFormatHeader.propTypes = {
    classes      : PropTypes.object.isRequired,
    application  : PropTypes.object.isRequired,
    course       : PropTypes.object.isRequired,
    menu         : PropTypes.object.isRequired,
    activityIndex: PropTypes.number.isRequired,
    mainSections : PropTypes.array.isRequired,
    rootActivity : PropTypes.object.isRequired,
    handleChange : PropTypes.func.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {applicationChangeApp: actions.application.applicationChangeApp};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(CourseFormatHeader) );