// import createBrowserHistory                      from 'history/createBrowserHistory';
import createHashHistory                        from 'history/createHashHistory';
import ConfigCourse                             from './course';

const history       = createHashHistory();
const courseConfig  = new ConfigCourse(history);
const course        = courseConfig.getConfig();

export default {history, courseConfig: course, ConfigCourse};