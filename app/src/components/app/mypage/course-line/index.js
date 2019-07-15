import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import util from '../../../../util'
import './style.scss'
const styles = theme => ({
  root: {
    ...theme.mixins.gutters()

  },
  sectionContent: {
    ...theme.mixins.gutters()
  }
})

class CourseLine extends Component {

  constructor (props) {
    super(props)
    this.goToCourse = this.goToCourse.bind(this)
  }

  goToCourse (e, course) {
    const { site } = this.props
    if (course.target === 'blank') {
      util.navigation.goToUrl(site, `/course/view.php?id=${course.id}`)
    } else {
      util.navigation.pushLocation(`${course.shortname}`)
    }

  }

  render () {
    const { classes, instance } = this.props
    instance.title = instance.name
    instance.contents = instance.contents || []
    const { completion } = instance
    return (
      <Paper className={`${classes.root} course-list-line ${instance.type}`} elevation={1} square>
        {instance.media && <div className='media-line' onClick={(e) => (this.goToCourse(e, instance))} title={instance.name}>
          <img alt={instance.name} src={instance.media.url} />
        </div>}

        <div className={`full-line column`}>
          <div>
            <div className={`titlebox`} >
              <div className='titleheader'>
                <Typography className={`title`} onClick={(e) => (this.goToCourse(e, instance))} >{instance.name}</Typography>
                <div className='subtitle'>
                  {instance.categories.map(category => (
                    <Typography key={Math.random() * 999} className='category'>{category}</Typography>
                  ))}
                </div>
              </div>
              { completion &&
              <Typography className={`percentage ${completion.style}`} >{completion.percentage}%</Typography>
              }
            </div>
          </div>
          {instance.hasOwnProperty('contents') && instance.contents.length > 0 &&
          <div className={`section-line flex-grow details`}>
            {instance.contents.map(content => (
              <div key={Math.random() * 999} className={`detail`} dangerouslySetInnerHTML={{ __html: content }} />
            ))}
          </div>}
        </div>
      </Paper>
    )

  }
}

CourseLine.propTypes = {
  classes: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  site: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CourseLine))
