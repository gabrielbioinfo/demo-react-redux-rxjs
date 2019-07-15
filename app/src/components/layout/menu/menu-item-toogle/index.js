import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import IconByName               from '../../../layout/icon-by-name';
import MenuItem                 from '@material-ui/core/MenuItem';
import util                     from '../../../../util';

class MenuItemToggle extends Component {
    render(){
        const { item, activity, onClick, menuClassName, textClassName, user } = this.props;
        const property = item.hasOwnProperty("property") ? item.property : "active";
        
        if(!util.security.hasCapability(user, item))
            return ("");

        const whenItem  = !activity.hasOwnProperty(property) || activity[property] ? item.when.active : item.when.inactive;

        return (
            <MenuItem   className={menuClassName}
                        onClick={onClick}>
                <IconByName name={whenItem.icon} size="small" />
                <span className={textClassName}>
                    {whenItem.name}
                </span>
            </MenuItem>
        );

    }
}

MenuItemToggle.propTypes = {
    item         : PropTypes.object.isRequired,
    activity     : PropTypes.object.isRequired,
    user         : PropTypes.object.isRequired,
    onClick      : PropTypes.func.isRequired,
    menuClassName: PropTypes.string,
    textClassName: PropTypes.string
}

export default MenuItemToggle;
