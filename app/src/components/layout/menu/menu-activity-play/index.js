import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withStyles }       from '@material-ui/core/styles';

import util                 from '../../../../util';
import actions              from '../../../../actions';

import IconButton           from '@material-ui/core/IconButton';
import IconByName           from '../../../layout/icon-by-name';

const styles = theme => ({root: {}});
class MenuActivityPlay extends Component {

    constructor(props){
        super(props);
        this.handleGoTo = this.handleGoTo.bind(this);
    }

    handleGoTo(event, activity, menu){
        event.preventDefault();
        const {site, applicationMessage} = this.props;

        switch (menu.type) {
            case 'url':
                return util.activity.processUrlMenu(site, menu, activity);
            case 'app':
                return util.activity.processAppMenu(site, menu, activity);
            default:
                applicationMessage(`Ação não suportada!`);
        }
        
    }

    renderMenuItem(cta, user, activity){

        cta.activity = activity;
        if(!util.security.hasCapability(user, cta))
            return "";
        
        return (
            <div key={Math.random(1,999)}>
                <IconButton className="menu-activity-cta" onClick={(e)=>this.handleGoTo(e, activity, cta)} >
                    <IconByName name={cta.icon} className="go-to-activity-image" />
                </IconButton>
            </div>
        );
    }

    render(){
        const { menu, user, activity } = this.props;

        if(!menu.hasOwnProperty("activity")
        || !menu.activity.hasOwnProperty("cta")
        || !menu.activity
        || !menu.activity.cta
        || menu.activity.cta.items.length===0)
            return '';
        
        return (
            <div className="go-to-activity">
                {menu.activity.cta.items.map(item=>(
                    this.renderMenuItem(item, user, activity)
                ))}
            </div>
        );

    }
}

MenuActivityPlay.propTypes = {
    menu     : PropTypes.object.isRequired,
    user     : PropTypes.object.isRequired,
    activity : PropTypes.object.isRequired,
    site     : PropTypes.object.isRequired,
    applicationMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {applicationMessage: actions.application.applicationMessage};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(MenuActivityPlay) );
