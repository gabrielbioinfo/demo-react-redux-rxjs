import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'

import LoadingHeader from '../../layout/loading/header'
import LoadingActivityList from '../../layout/loading/activity-list'
import CourseHeader from './header'
import CourseLine from './course-line'
import MyCoursesMainContent from '../course-list/main-content'

import actions from '../../../actions'
import util from '../../../util'
import './style.scss'

const styles = theme => ({
  root: {}
})
class AppMyPage extends Component {

  state = {
    activityIndex: 0
  }
  
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event, activityIndex) {
    const { mainsections, match } = this.props
    event.preventDefault()

    const idSelected = mainsections[activityIndex].id
    const prefix = util.application.getHistory().location.pathname.match(/\/(\w+)/)
    if (prefix.length < 2) { return }

    const newLocation = `/${prefix[1]}/${idSelected}`
    if (match.url === newLocation) { return }
    util.application.getHistory().push(newLocation)
  }

  changeActiveSection (activityIndex, mainSectionsActivities = []) {
    const activities = mainSectionsActivities || mainSectionsActivities
    const rootActivity = activities[activityIndex]

    this.setState({ activityIndex, rootActivity })
  }

  componentDidMount () {
    const { mycourses } = this.props
    if (!mycourses || mycourses.length === 0) { return this.props.fetchAppCoursesData(util.application.getPathApiCourses()) }
  }

  render () {
    const { classes, application: { loading }, mycourses } = this.props
    const { activityIndex } = this.state
    if (loading) {
      return (<div className='app-course-list'>
        <LoadingHeader />
        <LoadingActivityList />
      </div>)
    }

    return (
      <div className={`${classes.root} app-course-list padbottom`}>
        <CourseHeader activityIndex={activityIndex} handleChange={this.handleChange} />
        <h3>Avisos</h3>
        <div className='contents'>
          <div key={Math.random(1, 999)} className='flex padding-10px'>
            <CourseLine instance={mycourses[0]} />
          </div>
        </div>
        <MyCoursesMainContent mainapp={false} mycourselist={mycourses} />
    </div>
    )
  }
}

AppMyPage.propTypes = {
  classes: PropTypes.object.isRequired,
  mycourses: PropTypes.array.isRequired,
  site: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = { fetchAppCoursesData: actions.application.fetchAppCoursesData }
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(withRouter(AppMyPage)))
