import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes            from 'prop-types';
import { withStyles }       from '@material-ui/core/styles';
import './style.scss';

import LoadingHeader        from '../../layout/loading/header';
import LoadingActivityList  from '../../layout/loading/activity-list';
import SearchMainContent    from './main-content';

import AppBar               from '@material-ui/core/AppBar';
import IconButton           from '@material-ui/core/IconButton';
import FormControl          from '@material-ui/core/FormControl';
import InputLabel           from '@material-ui/core/InputLabel';
import Input                from '@material-ui/core/Input';
import Toolbar              from '@material-ui/core/Toolbar';

import IconByName           from '../../layout/icon-by-name';

import './style.scss';
import actions from '../../../actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main,
        display: "flex",
    },
    firstLine:{
        display: "flex",
        alignItems: "center"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        flexGrow: 1
    },
    noResults: {
        padding: "10px",
        paddingTop: "80px",
        fontSize: "0.9em",
        color: "#666"
    }
});
class AppSearch extends Component {

    state = {
        name: "",
        activities: [],
        filteredActivities: [],
    }

    constructor(props){
        super(props);
        this.backToMain = this.backToMain.bind(this);
        this.search     = this.search.bind(this);

        const simpleActivities = props.activities.map( item =>{
            if(item.type==='section'){
                let aux = this.props.sections.filter(e=>e.id===item.instance)[0];
                return {id:item.id, title: aux.title||'' ,content: aux.content||'' };
            }
            return {id:item.id, title: item.title||'', content: item.content||''};
        });
        this.state = {...this.state, filteredActivities: props.activities, simpleActivities, activities: props.activities };
    }

    backToMain(e){
        e.preventDefault();
        this.props.applicationChangeApp('course-format');
    }

    
    search(e){
        e.preventDefault();
        this.setState({
            name: document.getElementById('app-search-component').value
        });

        if(this.state.name===""){
            this.setState({
                filteredActivities: this.state.activities
            });
            return;
        }

        let regExSearch = new RegExp(this.state.name.toLowerCase(), "ig");
        let filteredAux      = this.state.simpleActivities.map( (item) => {
            return (item.title.match(regExSearch) || item.content.match(regExSearch)) ? item.id : null
        }).filter(e=>e);
        let newActivities = this.state.activities.filter(e=> filteredAux.indexOf(e.id)>-1 );
        this.setState({
            filteredActivities: newActivities
        });
        
    }

    renderSearch() {
        const { classes } = this.props;
        
        return (
            <AppBar className={`${classes.root} app app-search`}
                    position="fixed"
                    elevation={1}
                    >
                <Toolbar className="app-toolbar">
                    <IconButton onClick={this.backToMain} color="inherit">
                        <IconByName name="arrow_back" />
                    </IconButton>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                                htmlFor="app-search-component" className={classes.formControlLabel}>Pesquisar</InputLabel>
                        <Input  id="app-search-component"
                                onChange={this.search}
                                className={`${classes.underline} input-search`} />
                    </FormControl>
                </Toolbar>
            </AppBar>
        )
    }


    render() {
        const { filteredActivities } = this.state;
        const { classes } = this.props;

        if(!this.props.course.hasOwnProperty('name'))
            return (<div className="App">
                        <LoadingHeader />
                        <LoadingActivityList />
                    </div>);

        return (
            <div >
                {this.renderSearch()}
                
                {filteredActivities.length>0 &&
                    <SearchMainContent filteredActivities={filteredActivities} />
                }

                {filteredActivities.length===0 &&
                    <div className={classes.noResults}>Nenhum resultado encontrado para a busca!</div>
                }
                
            </div>
        );
    }
}

AppSearch.propTypes = {
    classes     : PropTypes.object.isRequired,
    application : PropTypes.object.isRequired,
    activities  : PropTypes.array.isRequired,
    sections    : PropTypes.array.isRequired,
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = {applicationChangeApp: actions.application.applicationChangeApp};
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(AppSearch) );