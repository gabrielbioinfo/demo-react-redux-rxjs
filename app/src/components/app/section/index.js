import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes                from 'prop-types';
import { withStyles }           from '@material-ui/core/styles';
import { withRouter }           from 'react-router';

import LoadingHeader            from '../../layout/loading/header';
import LoadingActivityList      from '../../layout/loading/activity-list';

import LayoutHeaderAppSimple    from '../../layout/header/app-simple';
import actions                  from '../../../actions';
import util                     from '../../../util';

import CourseModuleLayoutSectionGrid     from '../../course-modules/layout/section/grid';

import './style.scss';

const styles = theme => ({
    root: {},
});
class AppSection extends Component {

    state = {
        activities: [],
        rootActivity: null
    };

    componentWillMount(){
        const {filter, activities, sections} = this.props;
        const rootActivity    = util.activity.getSectionActivityFullDataById(activities, sections, filter);
        const childActivities = [];
        this.setState({rootActivity, activities: childActivities});
    }

    componentDidMount(){
        const {application, match:{params:{id}}, course, activities} = this.props;
        
        if((!course || Object.keys(course).length===0) && application.loading)
            return this.props.fetchAppCourseData( {api: util.application.getPathApiCourse(), id} );
        
        const childActivities = util.activity.getActivitiesByRootActivity(activities, this.state.rootActivity.activity);
        this.setState({activities: childActivities});
    }

    render() {
        const {classes, application: {loading}, filter, activities, sections} = this.props;

        if(loading){
            return (<div className="app-section">
                <LoadingHeader      />
                <LoadingActivityList/>
            </div>);
        }

        const rootActivity = util.activity.getSectionActivityFullDataById(activities, sections, filter);
        const myActivities = util.activity.getActivitiesByRootActivity(activities, rootActivity.activity);
        
        return(
            <div className={`${classes.root} app-section`}>
                <LayoutHeaderAppSimple activity={rootActivity.activity} />
                <div className="app-content padding-10px">
                    <CourseModuleLayoutSectionGrid argActivities={myActivities} />
                </div>
            </div>
        );
    }
}

AppSection.propTypes = {
    classes     : PropTypes.object.isRequired,
    filter      : PropTypes.string,
    application : PropTypes.object.isRequired,
    activities  : PropTypes.array.isRequired,
    sections    : PropTypes.array.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {fetchAppCourseData : actions.application.fetchAppCourseData};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(withRouter(AppSection)));
