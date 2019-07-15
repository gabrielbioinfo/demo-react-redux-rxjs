import { combineReducers } from 'redux'


import { activities } from './course/activities'
import { course } from './course/course'
import { mycourses } from './course/mycourses'
import { groups } from './course/groups'
import { sections } from './course/sections'

import { mainsections } from './course/mainsections'
import { appssections } from './course/appssections'
import { nextactivities } from './course/nextactivities'
import { weekreports } from './course/weekreports'

import { application } from './application'
import { menu } from './menu'
import { notifications } from './notifications'
import { site } from './site'
import { user } from './user'

export default combineReducers({
  application,
  menu,
  notifications,
  user,
  site,
  activities,
  course,
  mycourses,
  groups,
  sections,
  mainsections,
  appssections,
  nextactivities,
  weekreports
})
