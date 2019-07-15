import moment from 'moment';
import 'moment/locale/pt-br';

//react, redux, rxjs files
import React                                        from 'react';
import ReactDOM                                     from 'react-dom';
import { Provider }                                 from 'react-redux';
import { Router, Route, Switch }                    from 'react-router-dom';
import { createEpicMiddleware }                     from 'redux-observable';
import { createStore, compose, applyMiddleware }    from 'redux';

import history      from './history';

import reducer      from './reducers';
import epics        from './epics';

//service workers
import registerServiceWorker from './serviceworkers/registerServiceWorker';

//style and first component
// import './index.css';
import './style.scss';
import Start from './components/start';
import CssBaseline from '@material-ui/core/CssBaseline';

moment.locale('pt-BR');

const epicMiddleware    = createEpicMiddleware();
const composeEnhancers  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store             = createStore(
    reducer,composeEnhancers(applyMiddleware(epicMiddleware))
    );
epicMiddleware.run(epics);

ReactDOM.render(
    <Provider store={store}>
        <div className="app">
            <CssBaseline />
            <Router history={history} >
                <Switch>
                    <Route exact path="/list"             component={Start} />
                    <Route exact path="/:id/:filter?"     component={Start} />
                    <Route path="/:id/:mod/:filter"       component={Start} />
                    <Route path="/"                       component={Start} />
                    <Route component={Start} />
                </Switch>
            </Router>
        </div>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
