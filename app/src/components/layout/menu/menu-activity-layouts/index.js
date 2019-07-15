import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import util                     from '../../../../util';
import MenuList                 from '../menu-list';

class MenuActivityLayouts extends Component {
    render(){
        const { menu, user, activity } = this.props;

        let canAccessMenuActivityLayouts = false;
        if(menu.hasOwnProperty("activity")
        && menu.activity.hasOwnProperty("itemLayouts"))
            canAccessMenuActivityLayouts = util.security.hasCapability(user, menu.activity.itemLayouts);

        if(!canAccessMenuActivityLayouts)
            return "";

        return (
            <MenuList menuconfig={menu.activity.itemLayouts} activity={activity} icon="apps" />
        );

    }
}

MenuActivityLayouts.propTypes = {
    menu     : PropTypes.object.isRequired,
    user     : PropTypes.object.isRequired,
    activity : PropTypes.object.isRequired
}

export default MenuActivityLayouts;
