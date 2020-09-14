import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toastErrorMessage } from './../../util';
import { getUser, updateUser } from './../../actions/usersActions';
import { setLoading } from './../../actions/miscActions';
import Sidebar from './../layout/Sidebar';
import Navbar from './../layout/Navbar';

const EditUser = ({
    location,
    match,
    history,
    setLoading,
    getUser,
    updateUser,
    users,
    user,
}) => {
    useEffect(() => {
        setLoading(true);
        getUser(match.params.id);
    }, []);
    const [error, setError] = useState(false);

    const { _id, firstname, lastname, email, username, roles } = user;

    const onchange = (e) => {
        user[e.target.name] = e.target.value;
    };

    const onsubmit = (e) => {
        e.preventDefault();
        setError(false);
        if (
            firstname === '' &&
            lastname === '' &&
            email === '' &&
            username === '' &&
            roles === ''
        ) {
            toastErrorMessage('All feild required');
            setError(true);
            return false;
        } else if (
            firstname &&
            lastname &&
            email &&
            username &&
            roles &&
            !error
        ) {
            setLoading(true);
            updateUser(user);
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
                                                    Edit User
                                                </h4>
                                            </div>
                                            <div className="col-md-3 right">
                                                <Link
                                                    className="btn btn-info btn-link"
                                                    to="/users"
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
                                                        defaultValue={firstname}
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
                                                        defaultValue={lastname}
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
                                                        defaultValue={email}
                                                        onChange={onchange}
                                                        disabled
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
                                                        defaultValue={username}
                                                        onChange={onchange}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group bmd-form-group col-md-4">
                                                    <select
                                                        name="roles"
                                                        className="form-control"
                                                        defaultValue={roles}
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
    user: state.user.user,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (loading) => {
            dispatch(setLoading(loading));
        },
        getUser: (id) => {
            dispatch(getUser(id));
        },
        updateUser: (user) => {
            dispatch(updateUser(user));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
