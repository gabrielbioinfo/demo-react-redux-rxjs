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

class NextActivities extends Component {
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
    const { classes, activity, menu, depth, weight, notifications, user, nextactivities, activities } = this.props

    const instance = activity
    const nextActivityAux = nextactivities.filter(next => (activity.instance === next.id))
    const nextActivity = nextActivityAux[0]

    const adicionarTipo = nextActivity.type == 1 ? ': Em Andamento' : ': Próximas Atividades'
    if (!instance.name.match(/\:\s+\w+/)) { instance.name = instance.name + adicionarTipo }

    const today = util.activity.getFullDay(moment())
    const tomorrow = util.activity.getFullDay(moment()).add(1, 'days')

    let items = []
    if (nextActivity.type == 0) {
      items = activities.filter(item => (item.startdate && moment().unix() < item.startdate.unix()))
    } else { items = activities.filter(item => (item.startdate && item.startdate.unix() < moment().unix() && item.enddate.unix() > moment().unix())) }

    items = items.filter(item => (
      !item.name.match(/Semana \w+/)
    ))
    items.sort((a, b) => {
      if (a.startdate < b.startdate) { return -1 }
      if (a.startdate > b.startdate) { return 1 }
      return 0
    })
    
    items = items.slice(0, 5)

    // view
    const canAccess = util.security.hasCapability(user, instance)
    if (!canAccess) { return '' }

    const calendarText = util.activity.getCalendarInfoFromNow(activity)
    let groupActivity = activity.group ? <span className='groupTag' title='Atividade de Grupos'>grupo</span> : ''
    instance.subname = calendarText

    const activityNotifications = notifications.filter(notification => (notification.instance === activity.id))
    return (
      <div className={`${classes.root} course-modules-layout-activity-newactivities ${activity.type} `}>
        <div className='fullLineAction'>
          <div className={`flex-grow`}>
            <div className={`newactivities-title`}>
              <div className={`titlebox centerWhenHasOnlyTitle`} >
                {activityNotifications.length === 0 &&
                <Typography className={`title`}>{instance.name}</Typography>
                }
                {activityNotifications.length > 0 &&
                <div>
                  <Badge color='secondary'
                    badgeContent={activityNotifications.length}>
                    <Typography className={`title`} onClick={this.handleClick}>{instance.name}</Typography>
                  </Badge>
                </div>
                }

                {instance.subname && <Typography className={`subtitle`}>{instance.subname}</Typography>}
              </div>

              <div className={`sectionLineAction sectionline-action`}>
                <ActivityCompletion activity={activity} />
                <MenuActivityLayouts menu={menu} user={user} activity={activity} />
                <MenuActivitySettings menu={menu} user={user} activity={activity} />
              </div>
            </div>
          </div>
        </div>
        <div className='next-activities'>
          {items.length === 0 && <p className='sectionLine'>Nenhuma atividade encontrada!</p>}
          <CourseModuleLayoutSectionGrid argActivities={items} />
        </div>
      </div>

    )
  }
}

NextActivities.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NextActivities))
