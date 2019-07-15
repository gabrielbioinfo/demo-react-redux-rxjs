import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withStyles }       from '@material-ui/core/styles';

import IconButton           from '@material-ui/core/IconButton';
import Menu                 from '@material-ui/core/Menu';
import IconByName           from '../../../layout/icon-by-name';

import MenuItemToggle       from '../menu-item-toogle';
import MenuItemSimple       from '../menu-item-simple';

import actions              from '../../../../actions';
import util                 from '../../../../util';

const styles = theme => ({
    root: {
        display: "flex"
    },
    menuItem: {
        display: "flex",
        alignItems: "center"
    },
    menuItemText: {
        paddingLeft: "10px"
    }
});

class MenuList extends Component {
    
    state = {
        menu: false
    };

    constructor(props){
        super(props);
        this.openMenu    = this.openMenu.bind(this);
        this.closeMenu   = this.closeMenu.bind(this);
    }

    closeMenu(){
        this.setState({menu: false});
    }

    openMenu(event){
        event.preventDefault();
        this.setState({menu: true});
    }

    openMenuItem(event, value){
        event.preventDefault();
        this.gotTo(value);
        this.closeMenu();
    }
    
    gotTo(menuItem){
        const {site, menuconfig, applicationMessage, activity} = this.props;
        if(!menuconfig || menuconfig.length===0)
            return;

        switch (menuItem.type) {
            case "close":
                return this.closeMenu();
            case 'toggle-active':
                return util.activity.processUrlMenu(site, menuItem, activity);
            case 'url':
                return util.activity.processUrlMenu(site, menuItem, activity);
            default:
                applicationMessage(`Ação não suportada!`);
                return this.closeMenu();
        }
        
    }

    renderMenuItem(item){
        const { classes, activity, user } = this.props;
        
        if(item.hasOwnProperty('unimplemented') && item.unimplemented)
            return ("");
        
        item.activity = activity;
        if(!util.security.hasCapability(user, item))
            return ("");

        const auxNumber = Math.random() * new Date().getTime();
        switch(item.type){
            case 'toggle-active':
                return (
                    <MenuItemToggle
                        key={`${activity.id}__${auxNumber}`}
                        menuClassName={classes.menuItem}
                        textClassName={classes.menuItemText}
                        onClick={(e)=>this.openMenuItem(e, item)}
                        activity={activity}
                        user={user}
                        item={item}
                        />
                );
            case 'close':
                return (
                    <MenuItemSimple
                        key={`${activity.id}__${auxNumber}`}
                        menuClassName={classes.menuItem}
                        textClassName={classes.menuItemText}
                        onClick={(e)=>this.openMenuItem(e, item)}
                        activity={activity}
                        user={user}
                        item={{...item, icon:"cancel", name:"Fechar"}}

                    />
                );
            default:
                return (
                    <MenuItemSimple
                        key={`${activity.id}__${auxNumber}`}
                        menuClassName={classes.menuItem}
                        textClassName={classes.menuItemText}
                        onClick={(e)=>this.openMenuItem(e, item)}
                        activity={activity}
                        user={user}
                        item={item}
                    />
                );
        }
        
    }
    
    render(){
        const { activity, scope, classes, menuconfig, icon, user } = this.props;
        const { menu } = this.state;

        let iconName = icon ? icon : "more_vert";
        
        if(!menuconfig || menuconfig.length===0)
            return ("");
        
        if(Object.keys(menuconfig).includes('restrictions') && !util.security.hasCapability(user, menuconfig)){
            return ("");
        }

        let typeString = scope ? scope : "coursemodule";
        return (
            // <div key={`menu-${activity.id}-${Date.now()}`} className={classes.root}>
            <div key={`menu-${activity.id}`} className={classes.root}>
                <IconButton id={`menu-${typeString}-icon-${activity.id}`}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={this.openMenu}
                            size="small" >
                    <IconByName name={iconName} size="small" />
                </IconButton>
                <Menu   id={`menu-${typeString}-${activity.id}`}
                        open={!!(menu)}
                        anchorEl={document.getElementById(`menu-${typeString}-icon-${activity.id}`)}
                        onClose={this.closeMenu}>
                    
                    {menuconfig.items && menuconfig.items.map(item=> (
                        this.renderMenuItem(item)
                    ))}
                </Menu>
            </div>
        )
    }
}

MenuList.propTypes = {
    application : PropTypes.object.isRequired,
    activity    : PropTypes.object.isRequired,
    user        : PropTypes.object.isRequired,
    icon        : PropTypes.string,
    menuconfig  : PropTypes.object.isRequired,
    scope       : PropTypes.string,
    applicationMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {applicationMessage: actions.application.applicationMessage};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(MenuList) );
