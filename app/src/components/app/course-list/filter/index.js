import React, { Component } from 'react'
import PropTypes, { number } from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import IconByName from '../../../layout/icon-by-name'

import './style.scss'
import actions from '../../../../actions'
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main
  },
  title: {
    ...theme.typography.title
  },
  toolbar: theme.mixins.toolbar
})

class Filter extends Component {
  state = {
    open: false,
    filters: []
  }

  constructor (props) {
    super(props)
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  toggleDrawer () {
    this.setState({ open: !this.state.open })
  }

  toggleFilter(filter) {

    let filters = [ ...this.state.filters ]
    let indexOf = filters.indexOf(filter)

    if(indexOf === -1) {
      filters.push(filter)
    } else {
      filters.splice(indexOf, 1)
    }

    this.setState({ filters: filters })
  }

  sideList () {
    const { classes, auxFilters } = this.props

    let filters = [...new Set([...auxFilters])].sort()
    let numberFilters = filters.filter(filter =>(filter.match(/^\d+-?\d+$/)))
    let alphaFilters = filters.filter(filter =>(!filter.match(/^\d+-?\d+$/)))
    // console.log("filters", filters)
    // console.log("numberFilters", numberFilters)
    // console.log("alphaFilters", alphaFilters)

    return (
      <div className={`menu`}>
        <List className={`${classes.toolbar}`}>
            <ListItem key={`Filtrar por Períodos Letivos`}>
              <ListItemText primary={`Filtrar por Períodos Letivos`} className={`bolder`} />
            </ListItem>
        </List>
        <Divider />
        <List>
          {numberFilters.map((text, index) => (
            <ListItem button key={text} onClick={() =>(this.toggleFilter(text))}>
              <Checkbox value={text} checked={this.state.filters.includes(text)} />
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List className={`${classes.toolbar}`}>
            <ListItem key={`Filtrar por Categorias`}>
              <ListItemText primary={`Filtrar por Categorias`} />
            </ListItem>
        </List>
        <Divider />
        <List>
          {alphaFilters.map((text, index) => (
            <ListItem button key={text} onClick={() =>(this.toggleFilter(text))}>
              <Checkbox value={text} checked={this.state.filters.includes(text)} />
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }

  render () {
    const { classes, application, mycourses } = this.props
    
    return (
      <div className={`filter`}>
        <div className={`selected-filters`}>
          {this.state.filters.map(filter =>(
            <div key={Math.random()*999} className='active-filter'>
              {filter}
              <IconButton className='deactivate-filter' onClick={()=>this.toggleFilter(filter)}>
                <IconByName name='close' color="red" />
              </IconButton>
            </div>
          ))}
        </div>
        <IconButton onClick={()=>this.toggleDrawer()}>
          <IconByName name='filter_list' />
        </IconButton>
        
        <SwipeableDrawer
          anchor='right'
          open={this.state.open}
          onClose={()=>this.toggleDrawer()}
          onOpen={()=>this.toggleDrawer()}
        >
          <div
            tabIndex={0}
            role='button'
            onClick={()=>(this.toggleFilter)}
            onKeyDown={()=>this.toggleDrawer()}
          >
            {this.sideList()}
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  mycourses: PropTypes.array.isRequired
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = { applicationChangeApp: actions.application.applicationChangeApp }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Filter))
