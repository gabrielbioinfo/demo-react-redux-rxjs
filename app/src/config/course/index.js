class ConfigCourse{

    constructor(history){
        this.history    = history;
        this.hostname   = window.location.hostname;
        this.courseId       = this.getCourseId();
        this.initialApp     = this.getInitialApp();
        this.courseDataApi  = this.getCourseDataApi();
        this.coursesDataApi  = this.getCoursesDataApi();
    }

    getCourseId(){
        const auxLocation = this.history.location.pathname.match(/^\/([\w\d]+)/);
        return auxLocation && auxLocation.length>1 ? auxLocation[1] : 0;
    }

    getInitialApp(){
        return this.hostname==='graduacao.unisuam.edu.br'?'course-format':'course-list';
    }

    getCourseDataApi(){
        switch(this.hostname){
            case 'graduacao.unisuam.edu.br':
            case 'demo.comeex.com.br':
            case 'wordfy.comeex.com.br':
                return `http://${this.hostname}/course/format/reactive/api.php?id=${this.courseId}`;
            default:
                return `/data.${this.courseId}.json`;
        }
    }

    getCoursesDataApi(){
        switch(this.hostname){
            case 'graduacao.unisuam.edu.br':
            case 'demo.comeex.com.br':
            case 'wordfy.comeex.com.br':
                return `http://${this.hostname}/course/format/reactive/api.php?action=courses`;
            default:
                return `/data.json`;
        }
    }

    getConfig(){
        return {
            history : this.history,
            hostname: this.hostname,
            courseId: this.courseId,
            initialApp: this.initialApp,
            courseDataApi: this.courseDataApi,
            coursesDataApi: this.coursesDataApi
        };
    }
}

export default ConfigCourse;