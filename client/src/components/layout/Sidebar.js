import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = ({ location }) => {
    const getNavLinkClass = (path) => {
        return location.pathname === path ? 'active' : '';
    };
    return (
        <div
            className="sidebar"
            data-color="rose"
            data-background-color="white">
            <div className="logo">
                <Link to="/dashboard" className="simple-text logo-normal">
                    Appointment Management
                </Link>
            </div>
            <div className="sidebar-wrapper ps-container ps-theme-default">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/appointments">
                            <i className="material-icons">account_circle</i>
                            <p>Appointments</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            <i className="material-icons">exit_to_app</i>
                            <p>Logout</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
