import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import LoadingHeader from '../../layout/loading/header'
import LoadingActivityList from '../../layout/loading/activity-list'
import SinglePageMainContent from './main-content'
import IconByName from '../../layout/icon-by-name'

import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import './style.scss'
import actions from '../../../actions'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    display: 'flex'
  },
  firstLine: {
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    flexGrow: 1,
    color: '#ffffff'
  },
  formControlLabel: {
    color: '#ffffff !important'
  },
  underline: {
    borderBottomColor: '#ffffff',
    color: '#ffffff !important'
  },
  noResults: {
    padding: '10px',
    paddingTop: '80px',
    fontSize: '0.9em',
    color: '#666'
  }
})
class AppActivity extends Component {
  constructor (props) {
    super(props)
    this.backToMain = this.backToMain.bind(this)
  }

  backToMain (e) {
    e.preventDefault()
    this.props.applicationChangeApp('course-format')
  }

  renderGrades () {
    const { classes } = this.props
    return (
      <AppBar className={`${classes.root} app app-single-page`}
        position='fixed'
        elevation={1}
      >
        <Toolbar className={`app-toolbar`}>
          <IconButton onClick={this.backToMain} color='inherit'>
            <IconByName name='arrow_back' />
          </IconButton>
          <Typography component='h2' className={`title`}>Minhas Notas</Typography>
        </Toolbar>
      </AppBar>
    )
  }

  render () {
    const { classes, activities } = this.props

    let filteredGradebooks = activities.filter(a => (a.type === 'gradebook'))
    let filteredCompetencies = activities.filter(a => (a.type === 'section' && a.competency))
    let newActivities = filteredGradebooks.concat(filteredCompetencies)

    if (!this.props.course.hasOwnProperty('name')) {
      return (<div className='App'>
        <LoadingHeader />
        <LoadingActivityList />
      </div>)
    }

    return (
      <div className='AppGrades'>
        {this.renderGrades()}

        {newActivities.length > 0 &&
        <SinglePageMainContent filteredActivities={newActivities} />
        }

        {newActivities.length === 0 &&
        <div className={classes.noResults}>Nenhum quadro de notas encontrado!</div>
        }

      </div>
    )
  }
}

AppActivity.propTypes = {
  classes: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  rootActivity: PropTypes.object.isRequired,
  activities: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = { applicationChangeApp: actions.application.applicationChangeApp }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppActivity))
