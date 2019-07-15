import moment from 'moment';
import utilapplication from '../application';

class Activity{

    getFullDay(date){
        return moment(`${date.format('YYYY')}-${date.format('MM')}-${date.format('DD')}`);
    }

    getActivitiesOrientedByDate(activities, argDate){

        let finalActivities = {};
        activities.forEach((activity)=>{

            let dayDate = this.getFullDay(activity[argDate]);
            let parDate = dayDate ? dayDate.unix() : "undated";

            if(!finalActivities.hasOwnProperty(parDate)){
                
                let aux      = dayDate.weekday();
                let weekDate = dayDate.clone();
                weekDate.subtract(aux-1, 'days');
                
                finalActivities[parDate] = {
                    label       : parDate,
                    day         : activity[argDate].format('DD'),
                    fullmonth   : activity[argDate].format('MMMM'),
                    month       : activity[argDate].format('MMM'),
                    dateDay     : dayDate,
                    distance    : moment(new Date()).diff(activity[argDate], 'days'),
                    
                    weekDate    : weekDate.format('DD/MM/YYYY'),
                    week        : 1,

                    activities  : [activity]
                };
            }else{
                finalActivities[parDate].activities.push(activity);
            }
            
        });
        return finalActivities;
    }

    getActivitiesByDate(activities){
        activities.sort((a, b)=>(a.startdate===null) ? 1 : ((b.startdate===null) ? -1 : a.startdate -  b.startdate));
        // let finalActivities = {...this.getActivitiesOrientedByDate(activities, "startdate"), ...this.getActivitiesOrientedByDate(activities, "enddate")};
        let finalActivities = {...this.getActivitiesOrientedByDate(activities, "startdate")};
        return finalActivities;
    }

    getBestDistanceBefore(dateActivities){
        let bestDistanceBefore = {item: null, distance: null};
        Object.keys(dateActivities).map((dateKey)=>{
            
            if(dateActivities[dateKey].distance>0 || bestDistanceBefore.distance===0)
                return bestDistanceBefore;
            
            let distance = dateActivities[dateKey].distance === 0 ? dateActivities[dateKey].distance : dateActivities[dateKey].distance * -1;

            if( (bestDistanceBefore.distance) && (distance > bestDistanceBefore.distance) )
                return bestDistanceBefore;
            
            bestDistanceBefore = {item: dateActivities[dateKey].label, distance: distance};
            return bestDistanceBefore;
        });
        return bestDistanceBefore;
    }

    getDateType(dateDay, startFullDay, endFullDay){
        if(!dateDay)
            return null;
        
        if((dateDay.diff(startFullDay)===0)&&(dateDay.diff(endFullDay)===0))
            return 3;
        
        if(dateDay.diff(startFullDay)===0)
            return 4;
        if(dateDay.diff(endFullDay)===0)
            return 5;
        return null;
    }

    getCalendarInfoFromNow(activity){
        if(!(activity.startdate)){//&& activity.enddate
            return '';
        }

        let todayFullDay    = this.getFullDay(moment());
        let startFullDay    = this.getFullDay(activity.startdate);
        let endFullDay      = this.getFullDay(activity.enddate  );

        let todayDiffStart  = todayFullDay.diff(startFullDay, 'days');
        let todayDiffEnd    = todayFullDay.diff(endFullDay  , 'days');

        let type = this.getDateType(activity.dateDay||null, startFullDay, endFullDay);

        switch (type) {
            case 1://start
                return `inicia ${activity.startdate.calendar()}`;
            
            case 2://end
                return `finaliza ${activity.enddate.calendar()}`;

            case 3://timeline
                return `${activity.startdate.format('HH:mm')} às ${activity.enddate.format('HH:mm')}`;
            
            case 4://timeline inicio
                return `inicia ${activity.startdate.format('HH:mm')}`;
            
            case 5://timeline fim
                return `finaliza ${activity.enddate.format('HH:mm')}`;
                
            default://calcula
                if(todayDiffStart<0){
                    return `inicia ${activity.startdate.calendar()}`;
                }
                if(todayDiffEnd<=0){
                    return `aberto até ${activity.enddate.calendar()}`;
                }
                return `encerrado ${activity.startdate.fromNow()}`;
        }

    }

    processUrlMenu(site, menuItem, activity){
        const protocol = site.protocol?`${site.protocol}`:'';
        const port = site.port?`:${site.port}`:'';
        let url    = menuItem.action;
        let params = url.match(/#(\w+)#/g);
        params.map( param => {
            let auxParam = param.replace(/#/g, '');
            url = url.replace( new RegExp(param, 'g') , activity[auxParam] );
            return true;
        });
        window.parent.location = `${protocol}://${site.domain}${port}${url}`;
    }

    processAppMenu(site, menuItem, activity){
        // config
        const prefix     = utilapplication.getHistory().location.pathname.match(/\/(\w+)/);
        if(prefix.length<2)
            return;
        
        const newLocation = `/${prefix[1]}/${activity.type}/${activity.id}`;
        utilapplication.getHistory().push(newLocation);
    }

    processGoBackMenuInformingId(id){
        if(utilapplication.getHistory().action==='POP')
            return utilapplication.getHistory().push(`/${id}`);
        utilapplication.getHistory().goBack();
    }

    getRootAppsSection(activities){
        const rootActivities = activities.filter(activity=>(activity.app));
        return rootActivities ? rootActivities[0] : false;
    }

    getAppsSections(activities, sections){
        let rootActivity  = this.getRootAppsSection(activities);
        let newActivities = [];
        rootActivity.activities.map(id=>{
            activities.map(activity=>{
                if(activity.id===id)
                    return newActivities.push(this.getSectionActivityFullData(activity, sections));
                return true;
            });
            return true;
        });

        return newActivities;
    }

    getRootMainSection(activities){
        const rootActivities = activities.filter(activity=>(activity.main));
        return rootActivities ? rootActivities[0] : false;
    }

    getMainSections(activities, sections){
        const ids = [38044,42981,38046];
        return activities.filter(a=>ids.includes(a.id));

        // activities.map(activity=>{
        //     if(ids.includes(activity.id))
        //         newActivities.push(this.getSectionActivityFullData(activity, sections));
        //     return true;
        // });
        // return newActivities;
    }

    getSectionActivityFullData(activity, sections){
        let filteredSections = sections.filter((section)=>(section.id===activity.instance));
        return filteredSections.length>0
                ?{ activity: {...activity}, instance: {...filteredSections[0]}}
                :{ activity: {...activity}, instance: {id: activity.instance, visible: false} };
    }


    getActivitiesByRootActivity(activities, rootActivity){
        let newActivities = [];
        rootActivity.activities.map(id=>{
            activities.map(activity=>{
                if(activity.id===id)
                    return newActivities.push(activity);
                return true;
            });
            return true;
        });
        return newActivities;
    }

    getSelectedTabFromActivitiesUsingFilter(activities=[], filter=''){
        for(let i=0;i<activities.length;i++){
            if((activities[i].id===parseInt(filter)) || (activities[i].name===filter))
                return i;
        }
        return 0;
    }
    
    getActivityById(activities, id){
        const auxActivity = activities.filter(a=>a.id===parseInt(id));
        return auxActivity.length>0?auxActivity[0]:null;
    }

    getSectionActivityFullDataById(activities, sections, id){
        const auxActivity = activities.filter(a=>a.id===parseInt(id));
        const activity    = auxActivity.length>0?auxActivity[0]:null;
        if(!activity)
            return null;
        
        const auxSection  = sections.filter  (s=>s.id===activity.id);
        const section     = auxActivity.length>0?auxSection[0]:null;
        return {activity, instance: section};
    }

}


export default new Activity();