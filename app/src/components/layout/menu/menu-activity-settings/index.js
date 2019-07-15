import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import util                     from '../../../../util';
import MenuList                 from '../menu-list';

class MenuActivitySettings extends Component {
    render(){
        const { menu, user, activity, icon } = this.props;

        let canAccessMenuActivitySettings = false;
        if(menu.hasOwnProperty("activity")
        && menu.activity.hasOwnProperty("settings"))
            canAccessMenuActivitySettings = util.security.hasCapability(user, menu.activity.settings);

        if(!canAccessMenuActivitySettings)
            return "";

        return (
            <MenuList menuconfig={menu.activity.settings} activity={activity} icon={icon ? icon : null} />
        );

    }
}

MenuActivitySettings.propTypes = {
    menu     : PropTypes.object.isRequired,
    user     : PropTypes.object.isRequired,
    activity : PropTypes.object.isRequired,
    icon     : PropTypes.string,
}

export default MenuActivitySettings;
