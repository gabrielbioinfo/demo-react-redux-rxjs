import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withStyles }       from '@material-ui/core/styles';

import Typography           from '@material-ui/core/Typography';
import IconButton           from '@material-ui/core/IconButton';
import ExpandLess           from '@material-ui/icons/ExpandLess';
import ExpandMore           from '@material-ui/icons/ExpandMore';
import Paper                from '@material-ui/core/Paper';
import Badge                from '@material-ui/core/Badge';
import ActivityIcon         from '../../../activity-icon';
import ActivitySimple       from '../simple';
import util                 from '../../../../../util';

import MenuActivitySettings from '../../../../layout/menu/menu-activity-settings';
import ActivityCompletion   from '../../../activity-completion/activity-completion';

import './style.scss';
const styles = theme => ({
    root: {
        ...theme.mixins.gutters()
    },
    sectionContent:{
        ...theme.mixins.gutters()
    }
});

class Section extends Component {

    state = {
        open: false
    };

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleGotTo = this.handleGotTo.bind(this);
    }

    handleClick = () => {
        this.setState(state => ({ open: !this.state.open }));
    };

    handleGotTo = () => {
        alert('Clicou');
    }
    
    handleClose(){
        this.setState({open: false});
    }

    getActivity(activityId){
        const { activities }= this.props;
        const activityAux   = activities.filter((e)=>e.id===activityId);
        const activity      = activityAux[0];
        return(<ActivitySimple key={activity.id} activity={activity} depth={0} weight={2} />);
    }

    
    render() {
        const { classes, activity, sections, menu, depth, weight, notifications, user } = this.props;
        const { open }   = this.state;
        
        const sectionAux            = sections.filter((e)=>e.id===activity.instance);
        const instance              = sectionAux[0];
        const expandedCss           = open===true ? 'expanded'  : '';

        if(!activity.hasOwnProperty('activities'))
            activity.activities = [];

        const calendarText           = util.activity.getCalendarInfoFromNow(activity);
        const groupActivity          = activity.group ? <span className="groupTag" title="Atividade de Grupos">grupo</span> : "";
        const activityNotifications  = notifications.filter(notification=>(notification.instance===activity.id));
        // instance.subname             = (!instance.hasOwnProperty('subname')) ? instance.subname : calendarText;
        instance.subname             = calendarText;
        activity.main                = activity.hasOwnProperty('main') ? activity.main : false;

        return (
            <Paper className={`${classes.root} ${expandedCss} course-modules-activity-section ${activity.type} ${weight===2?'child':''}`} elevation={depth?depth:0} square={true}>
                
                {activity.media && <div className="mediaLine">
                    <img alt={activity.name} src={activity.media.url} />
                </div>}

                <div className={`${!activity.media ? "margin-top-16px":""} firstFullLine`}>
                    <ActivityIcon className={`avatar background-color-primary`} type={activity.type}  onClick={this.handleClick} />

                    <div className={`sectionLine sectionLineTitle`}>
                        <div className={`titlebox centerWhenHasOnlyTitle`}  >
                            {activityNotifications.length===0 && 
                                <Typography className={`title`} onClick={this.handleClick}>{instance.name}</Typography>
                            }
                            {activityNotifications.length>0 && 
                                <div>
                                    <Badge color="secondary"
                                        badgeContent={activityNotifications.length}>
                                        <Typography className={`title`} onClick={this.handleClick}>{instance.name}</Typography>
                                    </Badge>
                                </div>
                            }
                            {instance.subname && <Typography className={`subtitle`}>{instance.subname}</Typography>}
                        </div>
                        <div className={"actions"}>
                            <ActivityCompletion activity={activity} />
                            <MenuActivitySettings menu={menu} user={user} activity={activity} />
                        </div>
                    </div>
                </div>
                
                <div className={`fullLine`}>
                    <Typography className={`${classes.sectionLineText}`} 
                                dangerouslySetInnerHTML={{__html: instance.content}}
                    />
                </div>
                <div className={`fullLine iconsLine`}>
                    <div>{groupActivity}</div>
                </div>
                <div className={`sectionLine sectionLineExpandind fullRight`} onClick={this.handleClick}>
                    <div className={`sectionLineAction`}>
                        <span>possui {activity.activities.length} atividade{activity.activities.length!==1?"s":""}</span>
                        <IconButton onClick={this.handleClick} size="small">
                            {open ? <ExpandLess/> : <ExpandMore />}
                        </IconButton>
                    </div>
                </div>
                {activity.activities.length>0 &&
                <div className={`${classes.sectionContent} sectionContent`} hidden={!open}>
                    <div>
                        {activity.activities.map( e => this.getActivity(e)) }
                    </div>
                </div>
                }
            </Paper>
        )
    }
}

Section.propTypes = {
    classes      : PropTypes.object.isRequired,
    activity     : PropTypes.object.isRequired,
    menu         : PropTypes.object.isRequired,
    user         : PropTypes.object.isRequired,
    application  : PropTypes.object.isRequired,
    notifications : PropTypes.array.isRequired,
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(Section) );