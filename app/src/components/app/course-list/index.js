import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'

import LoadingHeader from '../../layout/loading/header'
import LoadingActivityList from '../../layout/loading/activity-list'
import CourseHeader from './header'
import CourseLine from './course-line'
import MainContent from './main-content'

import actions from '../../../actions'
import util from '../../../util'
import './style.scss'

const styles = theme => ({
  root: {}
})
class AppCourseList extends Component {

  render () {
    const { mycourses, mainapp } = this.props
    return <MainContent mainapp={true} mycourselist={mycourses} />
  }
}

AppCourseList.propTypes = {
  classes: PropTypes.object.isRequired,
  mycourses: PropTypes.array.isRequired
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = { fetchAppCoursesData: actions.application.fetchAppCoursesData }
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(withRouter(AppCourseList)))
