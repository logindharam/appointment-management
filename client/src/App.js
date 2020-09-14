import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import './style/material-dashboard.min.css';
import './style/demo.css';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/Login';
import About from './components/About';
import Dashboard from './components/dashboard';
import PreLoader from './components/layout/PreLoader';
import Users from './components/users';
import Appointments from './components/appointments';
import AddAppointment from './components/appointments/AddAppointment';
import EditAppointment from './components/appointments/EditAppointment';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';

const App = () => {
    useEffect(() => {
        // init materialize JS
        // M.AutoInit();
    });
    return (
        <Provider store={store}>
            <Router>
                <React.Fragment>
                    {/* <Navbar /> */}
                    {/* <div className="row"> */}
                    <PreLoader />
                    <ToastContainer />
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/about" component={About} />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <Route exact path="/appointments" component={Appointments} />
                        <Route exact path="/appointment-add" component={AddAppointment} />
                        <Route exact path="/appointment-edit/:id" component={EditAppointment} />
                        <Route exact path="/users" component={Users} />
                        <Route exact path="/user-add" component={AddUser} />
                        <Route exact path="/user-edit/:id" component={EditUser} />
                    </Switch>
                    {/* </div> */}
                    {/* <Footer /> */}
                </React.Fragment>
            </Router>
        </Provider>
    );
};

export default App;
