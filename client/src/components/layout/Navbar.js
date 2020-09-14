import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogout } from './../../actions/authActions';
const Navbar = ({ history, auth, getLogout }) => {
    const logout = () => {
        getLogout();
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div className="container-fluid">
                <div className="navbar-wrapper">
                    <Link className="navbar-brand" to="/dashboard">
                        Dashboard
                    </Link>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    aria-controls="navigation-index"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                </button>
            </div>
        </nav>
    );
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch) => {
    return {
        getLogout: () => {
            dispatch(getLogout());
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
