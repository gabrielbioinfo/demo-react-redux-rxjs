import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { withStyles }           from '@material-ui/core/styles';
import PropTypes                from 'prop-types';
import { withRouter }           from 'react-router';

import CourseFormatHeader       from './header';
import CourseFormatMainContent  from './main-content';
import CourseFormatBottomNav    from './bottom-nav';

import LoadingHeader            from '../../layout/loading/header';
import LoadingActivityList      from '../../layout/loading/activity-list';

import './style.scss';
import actions from '../../../actions';
import util from '../../../util';

const styles = theme => ({root: {}});
class AppCourseFormat extends Component {

    state = {
        id: null
    };

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, activityIndex){
        const {mainsections, match} = this.props;
        event.preventDefault();

        const idSelected = mainsections[activityIndex].id;
        const prefix     = util.application.getHistory().location.pathname.match(/\/(\w+)/);
        if(prefix.length<2)
            return;
        
        const newLocation = `/${prefix[1]}/${idSelected}`;
        if(match.url===newLocation)
            return;
        util.application.getHistory().push(newLocation);
    }

    changeActiveSection(activityIndex, mainSectionsActivities=[]){
        const activities = mainSectionsActivities ? mainSectionsActivities : mainSectionsActivities;
        const rootActivity = activities[activityIndex];

        this.setState({activityIndex,rootActivity});
    }

    componentDidMount(){
        const {course, application:{hasData, loading}, match:{params:{id}}} = this.props;
        //TODO se quiser cacher precisa de estratégia de recarregar quando mudar a id
        if(this.sameCourse(course, id))
            return;
        
        this.props.fetchAppCourseData( {api: util.application.getPathApiCourse(), id} );
    }

    sameCourse(course, id){
        return (course.id === id) || (course.shortname === id);
    }
    
    render() {
        const {application: {id, loading, hasData, error}, filter, mainsections, course} = this.props;
        
        if(loading || (this.props.application.id && Object.keys(course).length===0)){
            return (<div className="app-course-format">
                <LoadingHeader      />
                <LoadingActivityList/>
            </div>);
        }
        
        // const mainSectionsActivities = mainsections;
        let mainSectionsActivities   = mainsections.filter(section => (section.visible||section.adminVisible))
        const activityIndex          = util.activity.getSelectedTabFromActivitiesUsingFilter(mainsections, filter);
        const rootActivity           = mainSectionsActivities[activityIndex];
        return (
            <div className="app-course-format padbottom">
                <CourseFormatHeader      activityIndex={activityIndex} mainSections={mainSectionsActivities} rootActivity={rootActivity} handleChange={this.handleChange} />
                
                {mainSectionsActivities.map((activity, index)=>(
                    <CourseFormatMainContent key={activity.id} activityIndex={activityIndex} rootActivity={activity} visible={activityIndex===index} />
                ))}
                <CourseFormatBottomNav   activityIndex={activityIndex} mainSections={mainSectionsActivities} rootActivity={rootActivity} />
            </div>
        );
    }
}

AppCourseFormat.propTypes = {
    classes         : PropTypes.object.isRequired,
    // filter          : PropTypes.string,
    course          : PropTypes.object.isRequired,
    application     : PropTypes.object.isRequired,
    activities      : PropTypes.array.isRequired,
    mainsections    : PropTypes.array.isRequired,
    appssections    : PropTypes.array.isRequired,
    sections        : PropTypes.array.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {
    fetchAppCourseData  : actions.application.fetchAppCourseData,
    applicationSetId    : actions.application.applicationSetId
};
export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(withRouter(AppCourseFormat)));