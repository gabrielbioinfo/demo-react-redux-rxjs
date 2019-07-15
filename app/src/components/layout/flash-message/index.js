import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { compose }          from 'recompose';
import { withStyles }       from '@material-ui/core/styles';
import Typography               from '@material-ui/core/Typography';

const styles = theme => ({
    root: {}
});

class FlashMessage extends Component {
    render(){
        const { application: {flash}, classes } = this.props;
        if(!flash.message)
            return "";
        
        return (
            <Typography component="p" className={`${classes.root} message secondary-area padding-10px margin-bottom-10px`}>
                {flash.message}
            </Typography>
        );
    }
}

FlashMessage.propTypes = {
    application: PropTypes.object.isRequired
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(FlashMessage);
