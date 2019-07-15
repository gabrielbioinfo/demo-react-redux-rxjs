import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router';
import PropTypes            from 'prop-types';
import { withStyles }       from '@material-ui/core/styles';
import AppBar               from '@material-ui/core/AppBar';
import IconButton           from '@material-ui/core/IconButton';
import Toolbar              from '@material-ui/core/Toolbar';
import Typography           from '@material-ui/core/Typography';
import IconByName           from '../../icon-by-name';
import actions              from '../../../../actions';
import config               from '../../../../config';
import util                 from '../../../../util';

const styles = theme => ({
    root: {}
});
class HeaderAppSimple extends Component {

    constructor(props){
        super(props);
        this.backToMain = this.backToMain.bind(this);
    }

    backToMain(e){
        const {application, match:{params:{id}}, activities} = this.props;
        e.preventDefault();
        // this.props.applicationChangeApp(backAction ? backAction : 'course-format', null);
        util.activity.processGoBackMenuInformingId(id)
    }

    render(){
        const {classes, activity} = this.props;
        return (
            <AppBar className={`${classes.root} app-header`}
                    position="fixed"
                    elevation={1}
                    >
                <Toolbar className={`app-toolbar`}>
                    <IconButton onClick={this.backToMain} color="inherit">
                        <IconByName name="arrow_back" />
                    </IconButton>
                    <Typography component="h2" className={`title`}>{activity.name}</Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

HeaderAppSimple.propTypes = {
    classes     : PropTypes.object.isRequired,
    application : PropTypes.object.isRequired,
    activity    : PropTypes.object.isRequired,
    backAction  : PropTypes.string
}

const mapStateToProps = state => ({...state});

const mapDispatchToProps = {applicationChangeApp: actions.application.applicationChangeApp};
export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(withRouter(HeaderAppSimple)));