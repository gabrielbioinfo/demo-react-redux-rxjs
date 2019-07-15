import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Badge from '@material-ui/core/Badge'
import ActivityIcon from '../../../activity-icon'
import util from '../../../../../util'
import ActivityCompletion from '../../../activity-completion/activity-completion'
import IconByName from '../../../../layout/icon-by-name'
import MenuActivityLayouts from '../../../../layout/menu/menu-activity-layouts'
import MenuActivitySettings from '../../../../layout/menu/menu-activity-settings'
import MenuActivityPlay from '../../../../layout/menu/menu-activity-play'
import ActivitySimple from '../simple'

import CourseModuleLayoutSectionGrid from '../../section/grid'

import './style.scss'
import moment from 'moment'


const styles = theme => ({
  root: {
    ...theme.mixins.gutters()

  },
  sectionContent: {
    ...theme.mixins.gutters()
  }
})

class WeekReport extends Component {
  getActivity (activityId) {
    const { activities } = this.props
    const activityAux = activities.filter((e) => e.id === parseInt(activityId))
    const activity = activityAux[0]

    console.log('activityId', activityId)
    return (<ActivitySimple key={activity.id} activity={activity} depth={1} weight={2} />)
  }

  getSubname (activity) {
    const { classes } = this.props
    return (
      <span>
        {activity.group ? <span className={classes.subnameitem} title='Atividade em Grupo'><IconByName name='group' /></span> : ''}
        {activity.hasgrade ? <span className={classes.subnameitem} title='Atividade em Compõe Avaliação'><IconByName name='grade' /></span> : ''}
      </span>
    )
  }

  render () {
    const { classes, weekreports } = this.props

    return (
      <div className={`course-modules-layout-activity-newactivities`}>
        <Typography className={`title`}>Você está na semana:</Typography>
        {weekreports.map((e) => this.getActivity(e.cmid))}
      </div>
    )
  }
}

WeekReport.propTypes = {
  classes: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  nextactivities: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WeekReport))
