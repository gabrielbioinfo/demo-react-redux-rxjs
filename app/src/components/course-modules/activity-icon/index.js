import React, { Component }     from 'react';
import PropTypes                from 'prop-types';

import Avatar                   from '@material-ui/core/Avatar';
import Folder                   from '@material-ui/icons/Folder';
import Assignment               from '@material-ui/icons/Assignment';
import Book                     from '@material-ui/icons/Book';
import Chat                     from '@material-ui/icons/Chat';
import AllOut                   from '@material-ui/icons/AllOut';
import DataUsage                from '@material-ui/icons/DataUsage';
import Feedback                 from '@material-ui/icons/Feedback';
import Forum                    from '@material-ui/icons/Forum';
import SortByAlpha              from '@material-ui/icons/SortByAlpha';
import Ballot                   from '@material-ui/icons/Ballot';
import Label                    from '@material-ui/icons/Label';
import Class                    from '@material-ui/icons/Class';
import PageView                 from '@material-ui/icons/Pageview';
import CheckBox                 from '@material-ui/icons/CheckBox';
import FolderShared             from '@material-ui/icons/FolderShared';
import RadioButtonChecked       from '@material-ui/icons/RadioButtonChecked';
import Launch                   from '@material-ui/icons/Launch';
import Input                    from '@material-ui/icons/Input';
import SpeakerGroup             from '@material-ui/icons/SpeakerGroup';
import Schedule                 from '@material-ui/icons/Schedule';
import Announcement             from '@material-ui/icons/Announcement';
import Grade                    from '@material-ui/icons/Grade';
import Event                    from '@material-ui/icons/Event';

class ActivityIcon extends Component {
    render(){

        switch (this.props.type) {
            case "assign":
                //assignment
                return (<Avatar {...this.props} ><Assignment /></Avatar>);
            case "assignment":
                //assignment
                return (<Avatar {...this.props} ><Assignment /></Avatar>);
            case "book":
                //book
                return (<Avatar {...this.props} ><Book /></Avatar>);
            case "chat":
                //chat
                return (<Avatar {...this.props} ><Chat /></Avatar>);
            case "choice":
                //all_out
                return (<Avatar {...this.props} ><AllOut /></Avatar>);
            case "data":
                //data_usage
                return (<Avatar {...this.props} ><DataUsage /></Avatar>);
            case "feedback":
                //feedback
                return (<Avatar {...this.props} ><Feedback /></Avatar>);
            case "section":
            case "folder":
                //folder
                return (<Avatar {...this.props} ><Folder /></Avatar>);
            case "forum":
            case "forum-widget":
                //forum
                return (<Avatar {...this.props} ><Forum /></Avatar>);
            case "glossary":
                //sort_by_alpha
                return (<Avatar {...this.props} ><SortByAlpha /></Avatar>);
            case "imscp":
            case "about-course-widget":
                //ballot
                return (<Avatar {...this.props} ><Ballot /></Avatar>);
            case "label":
                //label
                return (<Avatar {...this.props} ><Label /></Avatar>);
            case "lesson":
                //class
                return (<Avatar {...this.props} ><Class /></Avatar>);
            case "lti":
                //class
                return (<Avatar {...this.props} ><Class /></Avatar>);
            case "page":
                //pageview
                return (<Avatar {...this.props} ><PageView /></Avatar>);
            case "quiz":
                //check_box
                return (<Avatar {...this.props} ><CheckBox /></Avatar>);
            case "resource":
                //folder_shared
                return (<Avatar {...this.props} ><FolderShared /></Avatar>);
            case "scorm":
                //class
                return (<Avatar {...this.props} ><Class /></Avatar>);
            case "survey":
                //radio_button_checked
                return (<Avatar {...this.props} ><RadioButtonChecked /></Avatar>);
            case "url":
                //launch
                return (<Avatar {...this.props} ><Launch /></Avatar>);
            case "wiki":
            case "last-activities-widget":
                //input
                return (<Avatar {...this.props} ><Input /></Avatar>);
            case "workshop":
                //speaker_group
                return (<Avatar {...this.props} ><SpeakerGroup /></Avatar>);
            case "scheduler":
                //schedule
                return (<Avatar {...this.props} ><Schedule /></Avatar>);
            case "journal":
                //announcement
                return (<Avatar {...this.props} ><Announcement /></Avatar>);
            case "gradebook":
            case "gradebook-widget":
                //grade
                return (<Avatar {...this.props} ><Grade /></Avatar>);
            
            case "aula":
            case "encounter":
            case "reallife-lesson":
            case "lecture":
                //event
                return (<Avatar {...this.props} ><Event /></Avatar>)
        
            default:
                return (<Avatar {...this.props} ><Class /></Avatar>)
        }
    }
}

ActivityIcon.propTypes = {
    type: PropTypes.string.isRequired
}

export default ActivityIcon;
