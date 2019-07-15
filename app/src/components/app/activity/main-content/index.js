import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withStyles }       from '@material-ui/core/styles';

import CourseModuleLayoutSectionGrid     from '../../../course-modules/layout/section/grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        paddingTop: "80px"
    },
    activities: {
        display: "flex",
        flexDirection: "column"
    },
    message: {
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#eeeeee"
    }
});

class SinglePageContent extends Component {

    render() {
        const { classes, filteredActivities }  = this.props;
        
        return (
            <div className={`${classes.root} app-single-page-main-content`}>
                <div className={classes.activities}>
                    <CourseModuleLayoutSectionGrid argActivities={filteredActivities} />
                </div>
            </div>
        )
    }
}

SinglePageContent.propTypes = {
    classes     : PropTypes.object.isRequired,
    application : PropTypes.object.isRequired,
    course      : PropTypes.object.isRequired,
    filteredActivities: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(SinglePageContent) );