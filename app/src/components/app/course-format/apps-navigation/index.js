import PropTypes            from 'prop-types';
import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { withStyles }       from '@material-ui/core/styles';
import actions              from '../../../../actions';
import util                 from '../../../../util';
import AppsNavigationMenuItem   from './menu-item';
import './style.scss';

const styles = theme => ({
    root: {},
    app:{}
});

class AppsNavigation extends Component {

    render() {
        const { appssections, classes } = this.props;
        return (
            <div className={`${classes.root} course-format-apps-navigation`}>
                {appssections.map(activity=>(
                    <AppsNavigationMenuItem activity={activity} key={Math.random(1,1600)} />
                ))}
            </div>
        )
    }
}

AppsNavigation.propTypes = {
    classes      : PropTypes.object.isRequired,
    activities   : PropTypes.array.isRequired,
    sections     : PropTypes.array.isRequired,
    appssections : PropTypes.array.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {applicationChangeApp: actions.application.applicationChangeApp};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(AppsNavigation) );