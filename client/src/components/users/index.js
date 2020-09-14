import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './../layout/Sidebar';
import Navbar from './../layout/Navbar';
import { getUsers, deleteUser } from './../../actions/usersActions';
import { setLoading } from './../../actions/miscActions';

import SearchFilter from '../common/SearchFilter';
import UserList from './UserList';
const Users = ({
    getUsers,
    setLoading,
    loading,
    user,
    location,
    deleteUser,
}) => {
    const [temp, setTemp] = useState(user.users);

    useEffect(() => {
        setLoading(true);
        getUsers();
        if (user.users.length > 0) setTemp(user.users);
    }, [user.users.length]);

    const userDelete = (id) => {
        setLoading(true);
        deleteUser(id);
    };

    const searchUser = (e) => {
        const searchValue = e.target.value;
        let filteredValues = temp.filter((tmp) => {
            return (
                tmp.firstname.toLowerCase().includes(searchValue) ||
                tmp.roles.toLowerCase().includes(searchValue) ||
                tmp.email.toLowerCase().includes(searchValue)
            );
        });
        setTemp(filteredValues);
        if (searchValue === '') {
            setTemp(user.users);
        }
    };

    const sortUser = (e) => {
        const sortValue = e.target.value;
        if (sortValue === 'desc') {
            setTemp(
                [...temp].sort((a, b) => {
                    if (a.firstname > b.firstname) {
                        return -1;
                    }
                    if (b.firstname > a.firstname) {
                        return 1;
                    }
                    return 0;
                })
            );
        } else {
            setTemp(
                [...temp].sort((a, b) => {
                    if (a.firstname > b.firstname) {
                        return 1;
                    }
                    if (b.firstname > a.firstname) {
                        return -1;
                    }
                    return 0;
                })
            );
        }
    };
    console.log(temp);
    return (
        <div className="wrapper ">
            <Sidebar location={location} />
            <div className="main-panel ps-container ps-theme-default ps-active-y">
                <Navbar />
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
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
                                                Users
                                            </h4>
                                        </div>
                                        <div className="col-md-3 right">
                                            <Link
                                                className="btn btn-info btn-link"
                                                to="user-add"
                                                title="Add User">
                                                <i className="material-icons">
                                                    add
                                                </i>
                                                Add User
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <SearchFilter
                                            searchUser={searchUser}
                                            sortUser={sortUser}
                                        />
                                        <div className="table-responsive">
                                            <UserList
                                                data={temp}
                                                userDelete={userDelete}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    loading: state.misc,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (loading) => {
            dispatch(setLoading(loading));
        },
        getUsers: () => {
            dispatch(getUsers());
        },
        deleteUser: (id) => {
            dispatch(deleteUser(id));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
