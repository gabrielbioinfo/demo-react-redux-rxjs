import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import IconByName               from '../../../layout/icon-by-name';
import MenuItem                 from '@material-ui/core/MenuItem';

class MenuItemSimple extends Component {
    render(){
        const { item, onClick, menuClassName, textClassName } = this.props;
        return (
            <MenuItem   className={menuClassName}
                        onClick={onClick}>
                <IconByName name={item.icon} size="small" />
                <span className={textClassName}>
                    {item.name}
                </span>
            </MenuItem>
        );

    }
}

MenuItemSimple.propTypes = {
    item         : PropTypes.object.isRequired,
    activity     : PropTypes.object.isRequired,
    onClick      : PropTypes.func.isRequired,
    menuClassName: PropTypes.string,
    textClassName: PropTypes.string
}

export default MenuItemSimple;
