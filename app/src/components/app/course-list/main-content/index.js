import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'

import LoadingHeader from '../../../layout/loading/header'
import LoadingActivityList from '../../../layout/loading/activity-list'
import CourseHeader from '../header'
import CourseLine from '../course-line'
import Filter from '../filter'

import actions from '../../../../actions'
import util from '../../../../util'
import './style.scss'

const styles = theme => ({
  root: {}
})
class AppCourseListMainContent extends Component {

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
    const { classes, application, mycourses, mainapp } = this.props
    const { activityIndex } = this.state
    if (application.loading) {
      return (<div className='app-course-list'>
        <LoadingHeader />
        <LoadingActivityList />
      </div>)
    }

    let auxFilters = mycourses.map( course =>(
        course.categories
    ))
    .flat(1)

    return (
      <div className={`${classes.root} main-content padbottom`}>
        {mainapp &&
          <CourseHeader activityIndex={activityIndex} handleChange={this.handleChange} />}
        {!mainapp &&
          <div className={`flex column`}>
            <h3>Minhas Disciplinas</h3>
            <Filter auxFilters={[...new Set([...auxFilters])].sort()} />
          </div>}

        {/* <Filter filters={application.filters.coursecategories} /> */}
        <div className='contents'>
          {mycourses.map(course => (
            <div key={Math.random(1, 999)} className='flex padding-10px'>
              <CourseLine instance={course} />
            </div>
          ))}
        </div>
    </div>
    )
  }
}

AppCourseListMainContent.propTypes = {
  classes: PropTypes.object.isRequired,
  mycourselist: PropTypes.array.isRequired,
  site: PropTypes.object.isRequired,
  mainapp: PropTypes.bool
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = { fetchAppCoursesData: actions.application.fetchAppCoursesData }
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(withRouter(AppCourseListMainContent)))
