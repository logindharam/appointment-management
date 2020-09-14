import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toastErrorMessage } from './../../util';
import { addUser } from './../../actions/usersActions';
import { setLoading } from './../../actions/miscActions';
import Sidebar from './../layout/Sidebar';
import Navbar from './../layout/Navbar';

const AddUser = ({ history, setLoading, addUser, users, location }) => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        roles: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(false);

    const {
        firstname,
        lastname,
        email,
        username,
        roles,
        password,
        confirmPassword,
    } = user;

    const onchange = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onsubmit = (e) => {
        e.preventDefault();
        setError(false);
        if (
            firstname === '' &&
            lastname === '' &&
            email === '' &&
            username === '' &&
            password === '' &&
            confirmPassword === '' &&
            roles === ''
        ) {
            toastErrorMessage('All feild required');
            setError(true);
            return false;
        } else if (password !== confirmPassword) {
            toastErrorMessage('Password and confirm password should be same');
            setError(true);
            return false;
        } else if (
            firstname &&
            lastname &&
            email &&
            username &&
            password &&
            confirmPassword &&
            roles &&
            password === confirmPassword &&
            !error
        ) {
            setLoading(true);
            addUser(user);
            history.push('/users');
        }
    };

    return (
        <div className="wrapper ">
            <Sidebar location={location} />
            <div className="main-panel ps-container ps-theme-default ps-active-y">
                <Navbar />
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <form
                                className="col s12"
                                onSubmit={onsubmit}
                                noValidate="novalidate">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header card-header-icon card-header-rose row">
                                            <div className="col-md-9">
                                                <div className="card-icon">
                                                    <i className="material-icons">
                                                        account_box
                                                    </i>
                                                </div>
                                                <h4 className="card-title ">
                                                    Add User
                                                </h4>
                                            </div>
                                            <div className="col-md-3 right">
                                                <Link
                                                    className="btn btn-info btn-link"
                                                    to="users"
                                                    title="Add User">
                                                    <i className="material-icons">
                                                        list
                                                    </i>
                                                    User List
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="form-group bmd-form-group col-md-6">
                                                    <input
                                                        placeholder="First Name"
                                                        id="firstname"
                                                        type="text"
                                                        className={
                                                            error &&
                                                            firstname === ''
                                                                ? 'form-control has-danger'
                                                                : 'form-control'
                                                        }
                                                        name="firstname"
                                                        value={firstname}
                                                        onChange={onchange}
                                                    />
                                                </div>
                                                <div className="form-group bmd-form-group col-md-6">
                                                    <input
                                                        placeholder="Last Name"
                                                        id="lastname"
                                                        type="text"
                                                        className={
                                                            error &&
                                                            lastname === ''
                                                                ? 'form-control has-danger'
                                                                : 'form-control'
                                                        }
                                                        name="lastname"
                                                        value={lastname}
                                                        onChange={onchange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group bmd-form-group col-md-6">
                                                    <input
                                                        placeholder="Email"
                                                        id="email"
                                                        type="email"
                                                        className={
                                                            error &&
                                                            email === ''
                                                                ? 'form-control has-danger'
                                                                : 'form-control'
                                                        }
                                                        name="email"
                                                        value={email}
                                                        onChange={onchange}
                                                    />
                                                </div>
                                                <div className="form-group bmd-form-group col-md-6">
                                                    <input
                                                        placeholder="Username"
                                                        id="username"
                                                        type="text"
                                                        className={
                                                            error &&
                                                            username === ''
                                                                ? 'form-control has-danger'
                                                                : 'form-control'
                                                        }
                                                        name="username"
                                                        value={username}
                                                        onChange={onchange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div
                                                    className={
                                                        error && password === ''
                                                            ? 'form-group bmd-form-group col-md-4 has-danger'
                                                            : 'form-group bmd-form-group col-md-4'
                                                    }>
                                                    <input
                                                        placeholder="Password"
                                                        id="Password"
                                                        type="password"
                                                        minLength={6}
                                                        className={
                                                            error &&
                                                            password === ''
                                                                ? 'form-control has-danger'
                                                                : 'form-control'
                                                        }
                                                        name="password"
                                                        value={password}
                                                        onChange={onchange}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        error &&
                                                        confirmPassword === ''
                                                            ? 'form-group bmd-form-group col-md-4 has-danger'
                                                            : 'form-group bmd-form-group col-md-4'
                                                    }>
                                                    <input
                                                        placeholder="Confirm Password"
                                                        id="confirmPassword"
                                                        type="password"
                                                        minLength={6}
                                                        className={
                                                            error &&
                                                            confirmPassword ===
                                                                ''
                                                                ? 'form-control has-danger'
                                                                : 'form-control'
                                                        }
                                                        name="confirmPassword"
                                                        value={confirmPassword}
                                                        onChange={onchange}
                                                    />
                                                </div>
                                                <div className="form-group bmd-form-group col-md-4">
                                                    <select
                                                        name="roles"
                                                        className="form-control"
                                                        value={roles}
                                                        onChange={onchange}>
                                                        <option
                                                            value=""
                                                            disabled>
                                                            Choose roles
                                                        </option>
                                                        <option value="ROLE_SUPERADMIN">
                                                            SUPERADMIN
                                                        </option>
                                                        <option value="ROLE_ADMIN">
                                                            ADMIN
                                                        </option>
                                                        <option value="ROLE_MANAGER">
                                                            MANAGER
                                                        </option>
                                                        <option value="ROLE_SHOPOWNER">
                                                            SHOPOWNER
                                                        </option>
                                                        <option value="ROLE_USER">
                                                            USER
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer ">
                                            <button
                                                type="submit"
                                                className="btn btn-fill btn-rose">
                                                Submit
                                                <div className="ripple-container"></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    users: state.user.users,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (loading) => {
            dispatch(setLoading(loading));
        },
        addUser: (user) => {
            dispatch(addUser(user));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
