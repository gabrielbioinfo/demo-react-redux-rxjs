import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import util from '../../../../util'

import CourseModuleLayoutGrid from '../../../course-modules/layout/section/grid'
import CourseModuleLayoutList from '../../../course-modules/layout/section/list'
import CourseModuleLayoutTimeline from '../../../course-modules/layout/section/timeline'
import FlashMessage from '../../../layout/flash-message'
import MenuActivityLayouts from '../../../layout/menu/menu-activity-layouts'
import MenuActivitySettings from '../../../layout/menu/menu-activity-settings'
import ActivityCompletion from '../../../course-modules/activity-completion/activity-completion'

import './style.scss'
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
})

class CourseFormatMainContent extends Component {
  renderContent (section, activities) {
    switch (section.layout) {
      case 'timeline':
        return (<CourseModuleLayoutTimeline section={section} argActivities={activities} />)
      case 'list':
        return (<CourseModuleLayoutList section={section} argActivities={activities} />)
      case 'grid':
      default:
        return (<CourseModuleLayoutGrid section={section} argActivities={activities} />)
    }
  }

  getConfigMainSection (activity) {
    const { menu, user } = this.props
    const configAccess = { restrictions: { capabilities: ['mod/section:manage'] } }
    const canAccess = util.security.hasCapability(user, configAccess)
    if (!canAccess) { return '' }

    const visible = activity.visible ? '' : '(oculto)'
    return (
      <div className={`section-activity-link flex`}>
        <div className={`flex-grow`}>{activity.name} {visible}</div>
        <ActivityCompletion activity={activity} />
        <MenuActivityLayouts menu={menu} user={user} activity={activity} />
        <MenuActivitySettings menu={menu} user={user} activity={activity} />
      </div>
    )
  }

  render () {
    const { classes, activities, rootActivity, visible } = this.props
    const sectionActivities = util.activity.getActivitiesByRootActivity(activities, rootActivity)
    
    const visibleCss = visible ? '' : 'hidden'
    return (
      <div className={`${classes.root} course-content flex flex-direction-column flex-grow padding-10px ${visibleCss}`}>
        <FlashMessage />
        {this.getConfigMainSection(rootActivity)}
        <div className={`activities flex flex-direction-column`}>
          {this.renderContent(rootActivity, sectionActivities)}
        </div>
      </div>
    )
  }
}

CourseFormatMainContent.propTypes = {
  classes: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  activities: PropTypes.array.isRequired,
  activityIndex: PropTypes.number.isRequired,
  rootActivity: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CourseFormatMainContent))
