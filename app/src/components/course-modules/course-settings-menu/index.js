import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withStyles }       from '@material-ui/core/styles';
import actions              from '../../../actions';
import MenuList             from '../../layout/menu/menu-list';
import util                 from '../../../util';

import './style.scss';
const styles = theme => ({root: {}});

class CourseSettingsMenu extends Component {

    render() {
        const { menu, user, activity } = this.props;
        
        let canAccessSettings = false;
        if(menu.hasOwnProperty("course") && menu.course.hasOwnProperty("settings"))
            canAccessSettings = util.security.hasCapability(user, menu.course.settings);

        return (
            <div className="course-modules-course-settings-menu">
                {  canAccessSettings &&
                    <div className={`menu-list`}>
                        <MenuList  menuconfig={menu.course.settings} activity={activity} scope="course" />
                    </div>
                }
            </div>
        )
    }
}

CourseSettingsMenu.propTypes = {
    classes     : PropTypes.object.isRequired,
    menu        : PropTypes.object.isRequired,
    user        : PropTypes.object.isRequired,
    activity    : PropTypes.object.isRequired,
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {applicationChangeApp: actions.application.applicationChangeApp};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(CourseSettingsMenu) );