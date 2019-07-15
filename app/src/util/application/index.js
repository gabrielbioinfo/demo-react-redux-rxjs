import history from '../../history';

class Application{
    constructor(history){
        this.history = history;
    }

    getHistory(){
        return this.history;
    }

    getPathId(){
        const prefix     = this.getHistory().location.pathname.match(/\/(\w+)/);
        if(prefix.length<2)
            return;
        return prefix[1];
    }

    getPathToRoot(){
        return '/';
    }

    getPathToRootCourse(){
        const id = this.getPathId();
        if(!id)
            return ;
        
        return `/${id}/`;
    }

    getPathToActivity(activity){
        const id = this.getPathId();
        if(!id)
            return ;
        let appLayout = activity.layout ? activity.layout : activity.type;
        return `/${id}/${appLayout}/${activity.id}`;
    }

    getHostname(){
        return window.location.hostname;
    }

    getPathApiCourse(){
        const id = this.getPathId();
        if(!id)
            return;
        switch(this.getHostname()){
            case 'localhost':
                return `/data.${id}.json`;
            default:
                return `http://${this.getHostname()}/course/format/reactive/api.php?id=${id}`;
        }
    }

    getPathApiCourses(){
        switch(this.getHostname()){
            case 'localhost':
                return `/data.json`;
            default:
                return `http://${this.getHostname()}/course/format/reactive/api.php?action=mycourses`;
        }
    }

}

export default new Application(history);