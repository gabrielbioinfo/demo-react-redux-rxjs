import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Badge from '@material-ui/core/Badge'
import LinkTab from '../../../layout/link-tab'
import actions from '../../../../actions'
import util from '../../../../util'
import config from '../../../../config'
// import { histo } from 'react-router-dom';

import './style.scss'
const styles = theme => ({
  root: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  }
})

class MainNavigation extends Component {
  renderSection (mainSection) {
    const { notifications } = this.props
    const activityNotifications = notifications.filter(notification => (notification.instance === mainSection.id))

    //(oculto)
    const visible = mainSection.visible ? '' : ''
    if (activityNotifications.length === 0) { return (<LinkTab key={mainSection.id} label={`${mainSection.name} ${visible}`} />) }
    return (<LinkTab key={mainSection.id} label={
      <Badge color='secondary' badgeContent={activityNotifications.length}>
        {mainSection.name}
      </Badge>
    } />)
  }

  render () {
    const { classes, mainSections, activityIndex, handleChange } = this.props

    return (
      <Tabs value={activityIndex} onChange={handleChange} className={`${classes.root} course-format-main-navigation`}>
        {mainSections.map((mainSection) =>
          (this.renderSection(mainSection))
        )}
      </Tabs>
    )
  }
}

MainNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  mainSections: PropTypes.array.isRequired,
  applicationChangeTab: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
  activityIndex: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = { applicationChangeTab: actions.application.applicationChangeTab }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainNavigation))
