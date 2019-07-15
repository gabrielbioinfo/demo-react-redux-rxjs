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
import MenuActivityGotTo from '../../../../layout/menu/menu-activity-gotto'

import './style.scss'
const styles = theme => ({
  root: {
    ...theme.mixins.gutters()

  },
  sectionContent: {
    ...theme.mixins.gutters()
  }
})

class Simple extends Component {
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
    const { classes, activity, menu, depth, weight, notifications, user } = this.props
    const instance = activity

    // view
    const canAccess = util.security.hasCapability(user, instance) && (activity.visible || activity.adminVisible)
    if (!canAccess) { return '' }

    const calendarText = util.activity.getCalendarInfoFromNow(activity)
    // let groupActivity = activity.group ? <span title="Atividade de Grupos"><IconByName name="group" /></span> : "";
    let groupActivity = activity.group ? <span className='groupTag' title='Atividade de Grupos'>grupo</span> : ''

    // instance.subname = this.getSubname(activity);
    instance.subname = calendarText

    let restrictedGroups = ''
    if (instance.hasOwnProperty('groups') && instance.groups.length > 0) {
      let auxGroups = instance.groups.map(group => (group.name))
      restrictedGroups = auxGroups.join(' ')
    }

    const activityNotifications = notifications.filter(notification => (notification.instance === activity.id))
    return (
      <Paper className={`${classes.root} course-modules-activity-section ${activity.type} ${weight === 2 ? 'child' : ''}`} elevation={depth || 0} square>

        {activity.media && <div className='mediaLine'>
          <img alt={activity.name} src={activity.media.url} />
        </div>}

        <div className={`${!activity.media ? 'margin-16px ' : ''} firstFullLine`}>
          <ActivityIcon className={`avatar background-color-primary`} type={activity.type} />
          <div className={`sectionLine`}>
            <div className={`titlebox centerWhenHasOnlyTitle`} >
              {activityNotifications.length === 0 &&
              <MenuActivityGotTo activity={activity} />
              }
              {activityNotifications.length > 0 &&
              <div>
                <Badge color='secondary' badgeContent={activityNotifications.length}>
                  <MenuActivityGotTo activity={activity} />
                </Badge>
              </div>
              }

              {instance.subname &&
              <Typography className={`subtitle`}>{instance.subname}</Typography>
              }
              {groupActivity &&
              <Typography className={`subtitle`}>{groupActivity}</Typography>
              }
              {restrictedGroups &&
              <Typography className={`subtitle`}>{restrictedGroups}</Typography>
              }
              {!activity.visible &&
              <Typography className={`subtitle`}>Atividade Oculta</Typography>
              }
            </div>

            <div className={`sectionLineAction sectionline-action`}>
              <ActivityCompletion activity={activity} />
              <MenuActivityLayouts menu={menu} user={user} activity={activity} />
              <MenuActivitySettings menu={menu} user={user} activity={activity} />
            </div>
          </div>
        </div>

      </Paper>
    )
  }
}

Simple.propTypes = {
  classes: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Simple))
