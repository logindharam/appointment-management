import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ data, userDelete }) => {
    return (
        <table className="table">
            <thead className=" text-primary">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.firstname}</td>
                        <td>{item.email}</td>
                        <td>{item.roles.replace('ROLE_', '')}</td>
                        <td>
                            <Link
                                to={'/user-edit/' + item._id}
                                className="btn btn-info btn-link">
                                <i className="material-icons">edit</i>
                            </Link>
                            <a
                                className="btn btn-danger btn-link"
                                onClick={() => {
                                    window.confirm('Want to delete?') &&
                                        userDelete(item._id);
                                }}>
                                <i className="material-icons">delete</i>
                            </a>
                            {/* <button
                                type="button"
                                rel="tooltip"
                                data-placement="top"
                                class="btn btn-info btn-link"
                                data-original-title="Remove item"
                                title="add">
                                <i class="material-icons">person</i>
                            </button> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;
