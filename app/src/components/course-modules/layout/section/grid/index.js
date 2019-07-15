import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import ActivitySimple from '../../activity/simple'
import ActivitySection from '../../activity/section'
import ActivityNextActivities from '../../activity/nextactivities'
import ActivityWeekReport from '../../activity/weekreport'

import './style.scss'
const styles = theme => ({
  root: {},
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
})

class CourseModuleLayoutGrid extends Component {
  getActivity (activity) {
    // if(activity.type==="section"){
    //     return(<ActivitySection key={activity.id} activity={activity} depth={1} weight={1} />);
    // }
    if (activity.type === 'weekreport') {
      return (<ActivityWeekReport key={activity.id} activity={activity} depth={1} weight={1} />)
    }
    if (activity.type === 'nextactivities') {
      return (<ActivityNextActivities key={activity.id} activity={activity} depth={1} weight={1} />)
    }
    return (<ActivitySimple key={activity.id} activity={activity} depth={1} weight={1} />)
  }

  render () {
    const { classes, argActivities } = this.props
    return (
      <div className={`${classes.root} course-module-layout-section-grid`}>
        {argActivities.map((e) => this.getActivity(e))}
      </div>
    )
  }
}

CourseModuleLayoutGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  argActivities: PropTypes.array.isRequired
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CourseModuleLayoutGrid))
