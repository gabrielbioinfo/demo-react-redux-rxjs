import actions from '../../actions'

const initialState = {
  protocol: 'http',
  domain: 'localhost',
  port: ''
}

export const site = (state = initialState, action) => {
  switch (action.type) {
    case actions.application.FETCH_APP_COURSE_DATA_SUCCESS:
    case actions.application.FETCH_APP_COURSES_DATA_SUCCESS:
      return { ...action.payload.site }
    default:
      return state
  }
}

export default site
