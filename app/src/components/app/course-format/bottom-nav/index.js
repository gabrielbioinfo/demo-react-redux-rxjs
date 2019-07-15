import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import { connect }              from 'react-redux';
import { compose }              from 'recompose';
import { withStyles }           from '@material-ui/core/styles';

import BottomNavigation         from '@material-ui/core/BottomNavigation';
import BottomNavigationAction   from '@material-ui/core/BottomNavigationAction';
import Badge                    from '@material-ui/core/Badge';
import IconByName               from '../../../layout/icon-by-name';
import util                     from '../../../../util';
import actions                  from '../../../../actions';

import './style.scss';
const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    }
});

class CourseFormatBottomNav extends Component {

    state = {
        width: 600
    }

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.updateBodyDimentions();
        window.addEventListener("resize", this.updateBodyDimentions.bind(this));
    }

    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateBodyDimentions.bind(this));
    }
    
    updateBodyDimentions(){
        this.setState({width: document.body.clientWidth});
    }

    handleChange(event, value){
        this.props.applicationChangeTab(value);
    }

    getIcon(mainSection){
        const {notifications} = this.props;
        const activityNotifications = notifications.filter(notification=>(notification.instance===mainSection.activity.id));

        if(activityNotifications.length===0)
            return (<IconByName name={mainSection.activity.icon ? mainSection.activity.icon : mainSection.activity.type} />);
        
        return (
            <Badge color="secondary" badgeContent={activityNotifications.length}>
                <IconByName name={mainSection.activity.icon ? mainSection.activity.icon : mainSection.activity.type} />
            </Badge>
        )
    }

    getNavigationAction(mainSection){
        return (<BottomNavigationAction
            key={mainSection.activity.id}
            label={mainSection.instance.name}
            icon={this.getIcon(mainSection)}
            className="item"
            />)
    }

    render() {

        return '';

        const { classes, activities, sections } = this.props;
        const { selectedTab }                   = this.props.application;
        const { width }                         = this.state;

        const mainSectionsActivities = util.activity.getMainSections(activities, sections);
        return (
            <BottomNavigation
                    value       = {selectedTab}
                    onChange    = {this.handleChange}
                    className   = {`${classes.root} course-format-bottom-nav`}
                    elevation   = {1}
                    showLabels  = {width>=mainSectionsActivities.length*100}
                >
                {mainSectionsActivities.map((mainSection)=>(this.getNavigationAction(mainSection)))}
            </BottomNavigation>
        )
    }
}

CourseFormatBottomNav.propTypes = {
    classes         : PropTypes.object.isRequired,
    activities      : PropTypes.array.isRequired,
    sections        : PropTypes.array.isRequired,
    notifications   : PropTypes.array.isRequired,
    course          : PropTypes.object.isRequired,
    applicationChangeTab: PropTypes.func.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {applicationChangeTab: actions.application.applicationChangeTab};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(CourseFormatBottomNav);