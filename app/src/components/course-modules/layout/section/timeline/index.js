import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { compose }          from 'recompose';
import { withStyles }       from '@material-ui/core/styles';

import ActivitySimple       from '../../activity/simple';
import ActivitySection      from '../../activity/section';
import ActivityNextActivities      from '../../activity/nextactivities';

import util                 from '../../../../../util';


import './style.scss';
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    dateRow: {
        display: "flex",
        paddingBottom: "30px"
    },
    dateRowDate:{
        display: "flex",
        flexDirection: "column",
        padding: "0",
        paddingTop: "0",
        paddingLeft: "0"
    },
    dateRowDateHere:{
        display: "flex",
        flexDirection: "column",
        padding: "0",
        paddingTop: "0",
        paddingLeft: "0",
        color: theme.palette.primary.main
    },
    dateRowDateDate:{
        fontSize: "2em",
        [theme.breakpoints.up('sm')]: {
            fontSize: "1.6em",
        }
    },
    dateRowDateMonth:{
        
    },
    dateRowContent: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        paddingLeft: "10px"
    },
    dateRowContentHere:{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        marginTop: "5px",
        paddingLeft: "40px"
    },
    dateRowContentHereIndicator:{
        width: "15px",
        height: "15px",
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main
    },
    dateRowContentHereLine:{
        flexGrow: 1,
        borderTop: `2px solid ${theme.palette.primary.main}`
    },
    dateRowContentActivities: {
        paddingLeft: "15px",
        display: "flex",
        flexWrap: "wrap"
    },
    dateRowContentWeekLine: {
        padding: "0 15px 0 0",
        color: "#666",
        fontSize: "0.9em"
    }
});

class CourseModuleListTimeline extends Component {

    state = {
        weeks: []
    }

    getActivity(activity){
        if(activity.type==="section"){
            return(<ActivitySection key={activity.id} activity={activity} depth={1} />);
        }
        return(<ActivitySimple key={activity.id} activity={activity} depth={1}  />);
    }

    renderDateActivity(dateActivity, here){
        const { classes }   = this.props;
        const today         = (dateActivity.distance===0);

        return (
            <div key={dateActivity.dateDay.unix()+Math.random()}>
                {dateActivity.weekDate && <div className={classes.dateRowContentHere}>
                    <div className={classes.dateRowContentWeekLine}>Início da Semana {dateActivity.week}</div>
                    <div className={classes.dateRowContentHereLine}></div>
                </div>}

                {/* {here && <div className={classes.dateRowContentHere}>
                        <div className={classes.dateRowContentHereIndicator}></div>
                        <div className={classes.dateRowContentHereLine}></div>
                    </div>} */}

                <div className={classes.dateRow}>
                    <div className={today ? classes.dateRowDateHere: classes.dateRowDate}>
                        <div className={classes.dateRowDateDate}>{dateActivity.day}</div>
                        <div className={classes.dateRowDateMonth}>{dateActivity.month}</div>
                    </div>
                    <div className={classes.dateRowContent}>
                        <div className={classes.dateRowContentActivities}>
                            {dateActivity.activities.map( (e) => this.getActivity({...e, dateDay: dateActivity.dateDay}) )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { classes, argActivities } = this.props;
        const dateActivities    = util.activity.getActivitiesByDate(argActivities);
        let bestDistanceBefore  = util.activity.getBestDistanceBefore(dateActivities);

        let weeks = [];
        Object.keys(dateActivities).map((dateKey)=>{
            if(!weeks.includes(dateActivities[dateKey].weekDate)){
                weeks.push(dateActivities[dateKey].weekDate);
                dateActivities[dateKey].week = weeks.length;
            }else{
                dateActivities[dateKey].week = weeks.length;
                dateActivities[dateKey].weekDate = null;
            }
            return dateActivities;
        });

        return (
            <div className={`${classes.root} timeline-layout`}>
                {Object.keys(dateActivities).map((dateKey)=>
                    (this.renderDateActivity(dateActivities[dateKey], (bestDistanceBefore.item===dateActivities[dateKey].label) )))}
            </div>
        )
    }
}

CourseModuleListTimeline.propTypes = {
    classes         : PropTypes.object.isRequired,
    argActivities   : PropTypes.array.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(CourseModuleListTimeline);