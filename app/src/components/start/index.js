import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.scss'
import actions from '../../actions'
import { withRouter } from 'react-router'

import AppCourseFormat from '../app/course-format'
import AppMyPage from '../app/mypage'
import AppSection from '../app/section'
import AppCourseList from '../app/course-list'

class Start extends Component {
  constructor (props) {
    super(props)
    this.state = { loading: true }
  }

  render () {
    const { application: { error, loading }, match } = this.props
    const params = this.props.match.params

    console.log(match.path)

    if (match.path === '/') { return <AppMyPage /> }

    if (!params.hasOwnProperty('id')) { return <AppCourseList /> }

    if (!params.hasOwnProperty('mod') || params.mod.match(/^\d+$/)) { return (<AppCourseFormat filter={params.filter} />) }
    
    switch (params.mod) {
      // case 'activity':
      // return (<AppActivity filter={params.filter} />);
      // case 'grades':
      // return (<AppGrades   filter={params.filter} />);
      // case 'search':
      // return (<AppSearch   filter={params.filter} />);
      case 'section':
        return (<AppSection filter={params.filter} />)
      default:
        return (<AppSection filter={params.filter} />)
    }
  }
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = { fetchAppCourseData: actions.application.fetchAppCourseData }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Start))
