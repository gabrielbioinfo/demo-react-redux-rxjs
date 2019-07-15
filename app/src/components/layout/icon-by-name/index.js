import React, { Component }     from 'react';
import PropTypes                from 'prop-types';

import AccountBox               from '@material-ui/icons/AccountBox';
import AccountCircle            from '@material-ui/icons/AccountCircle';
import Add                      from '@material-ui/icons/Add';
import AddBox                   from '@material-ui/icons/AddBox';
import AddCircle                from '@material-ui/icons/AddCircle';
import AddCircleOutline         from '@material-ui/icons/AddCircleOutline';
import Archive                  from '@material-ui/icons/Archive';
import Apps                     from '@material-ui/icons/Apps';
import AllOut                   from '@material-ui/icons/AllOut';
import Announcement             from '@material-ui/icons/Announcement';
import ArrowBack                from '@material-ui/icons/ArrowBack';
import Assignment               from '@material-ui/icons/Assignment';
import Ballot                   from '@material-ui/icons/Ballot';
import Book                     from '@material-ui/icons/Book';
import Block                    from '@material-ui/icons/Block';
import Cancel                   from '@material-ui/icons/Cancel';
import Category                 from '@material-ui/icons/Category';
import Chat                     from '@material-ui/icons/Chat';
import Check                    from '@material-ui/icons/Check';
import CheckBox                 from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank     from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckCircle              from '@material-ui/icons/CheckCircle';
import CheckCircleOutline       from '@material-ui/icons/CheckCircleOutline';
import Class                    from '@material-ui/icons/Class';
import Close                    from '@material-ui/icons/Close';
import ClosedCaption            from '@material-ui/icons/ClosedCaption';
import Create                   from '@material-ui/icons/Create';
import DataUsage                from '@material-ui/icons/DataUsage';
import Event                    from '@material-ui/icons/Event';
import Error                    from '@material-ui/icons/Error';
import ErrorOutline             from '@material-ui/icons/ErrorOutline';
import Edit                     from '@material-ui/icons/Edit';
import Feedback                 from '@material-ui/icons/Feedback';
import FilterList               from '@material-ui/icons/FilterList';
import Folder                   from '@material-ui/icons/Folder';
import FolderShared             from '@material-ui/icons/FolderShared';
import Forum                    from '@material-ui/icons/Forum';
import Fullscreen               from '@material-ui/icons/Fullscreen';
import FullscreenExit           from '@material-ui/icons/FullscreenExit';
import Grade                    from '@material-ui/icons/Grade';
import Group                    from '@material-ui/icons/Group';
import GroupAdd                 from '@material-ui/icons/GroupAdd';
import GroupWork                from '@material-ui/icons/GroupWork';
import Image                    from '@material-ui/icons/Image';
import Info                     from '@material-ui/icons/Info';
import Input                    from '@material-ui/icons/Input';
import IndeterminateCheckBox    from '@material-ui/icons/IndeterminateCheckBox';
import QuestionAnswer           from '@material-ui/icons/QuestionAnswer';
import Label                    from '@material-ui/icons/Label';
import Launch                   from '@material-ui/icons/Launch';
import LinearScale              from '@material-ui/icons/LinearScale';
import LocalLibrary             from '@material-ui/icons/LocalLibrary';
import MoreVert                 from '@material-ui/icons/MoreVert';
import NewReleases              from '@material-ui/icons/NewReleases';
import NotificationImportant    from '@material-ui/icons/NotificationImportant';
import NotInterested            from '@material-ui/icons/NotInterested';
import PageView                 from '@material-ui/icons/Pageview';
import Pause                    from '@material-ui/icons/Pause';
import PauseCircleFilled        from '@material-ui/icons/PauseCircleFilled';
import PauseCircleOutline       from '@material-ui/icons/PauseCircleOutline';
import Photo                    from '@material-ui/icons/Photo';
import PlayArrow                from '@material-ui/icons/PlayArrow';
import PlayArrowOutlined        from '@material-ui/icons/PlayArrowOutlined';
import PlayCircleOutline        from '@material-ui/icons/PlayCircleOutline';
import PlusOne                  from '@material-ui/icons/PlusOne';
import Portrait                 from '@material-ui/icons/Portrait';
import RadioButtonChecked       from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked     from '@material-ui/icons/RadioButtonUnchecked';
import Search                   from '@material-ui/icons/Search';
import Settings                 from '@material-ui/icons/Settings';
import Share                    from '@material-ui/icons/Share';
import Schedule                 from '@material-ui/icons/Schedule';
import SortByAlpha              from '@material-ui/icons/SortByAlpha';
import SpeakerGroup             from '@material-ui/icons/SpeakerGroup';
import SupervisorAccount        from '@material-ui/icons/SupervisorAccount';
import SupervisorAccountOutlined from '@material-ui/icons/SupervisorAccountOutlined';
import Timer                    from '@material-ui/icons/Timer';
import TimerOff                 from '@material-ui/icons/TimerOff';
import ThumbUp                  from '@material-ui/icons/ThumbUp';
import ThumbUpOutlined          from '@material-ui/icons/ThumbUpOutlined';
import ThumbDown                from '@material-ui/icons/ThumbDown';
import ThumbDownOutlined        from '@material-ui/icons/ThumbDownOutlined';
import Today                    from '@material-ui/icons/Today';
import TouchApp                 from '@material-ui/icons/TouchApp';
import TrendingUp               from '@material-ui/icons/TrendingUp';
import Update                   from '@material-ui/icons/Update';
import Visibility               from '@material-ui/icons/Visibility';
import VisibilityOff            from '@material-ui/icons/VisibilityOff';
import Warning                  from '@material-ui/icons/Warning';
import Work                     from '@material-ui/icons/Work';
import WorkOff                  from '@material-ui/icons/WorkOff';
import WorkOutline              from '@material-ui/icons/WorkOutline';

class IconByName extends Component {
    render(){

        const data = {...this.props};

        data.className = (data.hasOwnProperty('className')) ? data.className : '';
        data.className += ' menu-item-icon';

        switch (data.name) {
            case "account_box":
                return (<AccountBox {...data} />);
            case "account_circle":
                return (<AccountCircle {...data} />);
            case "add":
                return (<Add {...data} />);
            case "add_box":
                return (<AddBox {...data} />);
            case "add_circle":
                return (<AddCircle {...data} />);
            case "add_circle_outline":
                return (<AddCircleOutline {...data} />);
            case "archive":
                return (<Archive {...data} />);
            case "apps":
                return (<Apps {...data} />);
            case "all_out":
                return (<AllOut {...data} />);
            case "announcement":
                return (<Announcement {...data} />);
            case "arrow_back":
                return (<ArrowBack {...data} />);
            case "assignment":
                return (<Assignment {...data} />);
            case "book":
                return (<Book {...data} />);
            case "block":
                return (<Block {...data} />);
            case "ballot":
                return (<Ballot {...data} />);
            case "cancel":
                return (<Cancel {...data} />);
            case "category":
                return (<Category {...data} />);
            case "check":
                return (<Check {...data} />);
            case "check_box":
                return (<CheckBox {...data} />);
            case "check_circle":
                return (<CheckCircle {...data} />);
            case "check_circle_outline":
                return (<CheckCircleOutline {...data} />);
            case "check_box_outline_blank"://check_box_outline_blank CheckBoxOutlineBlank
                return (<CheckBoxOutlineBlank {...data} />);
            case "chat":
                return (<Chat {...data} />);
            case "class":
                return (<Class {...data} />);
            case "close":
                return (<Close {...data} />);
            case "closed_caption":
                return (<ClosedCaption {...data} />);
            case "create":
                return (<Create {...data} />);
            case "data_usage":
                return (<DataUsage {...data} />);
            case "edit":
                return (<Edit {...data} />)
            case "event":
                return (<Event {...data} />)
            case "error":
                return (<Error {...data} />)
            case "error_outline":
                return (<ErrorOutline {...data} />)
            case "feedback":
                return (<Feedback {...data} />);
            case "filter_list":
                return (<FilterList {...data} />);
            case "folder":
                return (<Folder {...data} />);
            case "forum":
                return (<Forum {...data} />);
            case "fullscreen":
                return (<Fullscreen {...data} />);
            case "fullscreen_exit":
                return (<FullscreenExit {...data} />);
            case "folder_shared":
                return (<FolderShared {...data} />);
            case "grade":
                return (<Grade {...data} />);
            case "group":
                return (<Group {...data} />);
            case "group_add":
                return (<GroupAdd {...data} />);
            case "group_work":
                return (<GroupWork {...data} />);
            case "image":
                return (<Image {...data} />);
            case "indeterminate_check_box":
                return (<IndeterminateCheckBox {...data} />);
            case "info":
                return (<Info {...data} />);
            case "input":
                return (<Input {...data} />);
            case "question_answer":
                return (<QuestionAnswer {...data} />);
            case "label":
                return (<Label {...data} />);
            case "launch":
                return (<Launch {...data} />);
            case "linear_scale":
                return (<LinearScale {...data} />);
            case "local_library":
                return (<LocalLibrary {...data} />);
            case "more_vert":
                return (<MoreVert {...data} />);
            case "new_releases":
                return (<NewReleases {...data} />);
            case 'notification_important':
                return (<NotificationImportant {...data} />);
            case 'not_interested':
                return (<NotInterested {...data} />);
            case "pageview":
                return (<PageView {...data} />);
            case "pause":
                return (<Pause {...data} />);
            case "pause_circle_filled":
                return (<PauseCircleFilled {...data} />);
            case "pause_circle_outline":
                return (<PauseCircleOutline {...data} />);
            case "photo":
                return (<Photo {...data} />);
            case "play_arrow":
                return (<PlayArrow {...data} />);
            case "play_arrow_outlined":
                return (<PlayArrowOutlined {...data} />);
            case "play_circle_outline":
                return (<PlayCircleOutline {...data} />);
            case "plus_one":
                return (<PlusOne {...data} />);
            case "portrait":
                return (<Portrait {...data} />);
            case "radio_button_checked":
                return (<RadioButtonChecked {...data} />);
            case "radio_button_unchecked":
                return (<RadioButtonUnchecked {...data} />);
            case "search":
                return (<Search {...data} />)
            case "settings":
                return (<Settings {...data} />)
            case "share":
                return (<Share {...data} />)
            case "schedule":
                return (<Schedule {...data} />);
            case "sort_by_alpha":
                return (<SortByAlpha {...data} />);
            case "speaker_group":
                return (<SpeakerGroup {...data} />);
            case "supervisor_account":
                return (<SupervisorAccount {...data} />);
            case "supervisor_account_outlined":
                return (<SupervisorAccountOutlined {...data} />);
            case "timer":
                return (<Timer {...data} />);
            case "timer_off":
                return (<TimerOff {...data} />);
            case "thumb_up":
                return (<ThumbUp {...data} />);
            case "thumb_up_outline":
                return (<ThumbUpOutlined {...data} />);
            case "thumb_down":
                return (<ThumbDown {...data} />);
            case "thumb_down_outline":
                return (<ThumbDownOutlined {...data} />);
            case "today":
                return (<Today {...data} />);
            case "touch_app":
                return (<TouchApp {...data} />);
            case "trending_up":
                return (<TrendingUp {...data} />);
            case "update":
                return (<Update {...data} />);
            case "visibility":
                return (<Visibility {...data} />);
            case "visibility_off":
                return (<VisibilityOff {...data} />);
            case "warning":
                return (<Warning {...data} />);
            case "work":
                return (<Work {...data} />);
            case "work_off":
                return (<WorkOff {...data} />);
            case "work_outline":
                return (<WorkOutline {...data} />);
            
            default:
                return (<Folder {...data} />)
        }
    }
}

IconByName.propTypes = {
    name: PropTypes.string.isRequired
}

export default IconByName;
