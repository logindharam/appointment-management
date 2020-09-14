import React from 'react';
import { Link } from 'react-router-dom';

const AppointmentList = ({ data, appointmentDelete }) => {
    console.log(data)
    return (
        <table className="table">
            <thead className=" text-primary">
                <tr>
                    <th>S. No</th>
                    <th>Appointment Dates</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.appointmentDate}</td>
                        <td>
                            <Link
                                to={'/appointment-edit/' + item._id}
                                className="btn btn-info btn-link">
                                <i className="material-icons">edit</i>
                            </Link>
                            <a
                                className="btn btn-danger btn-link"
                                onClick={() => {
                                    window.confirm('Want to delete?') &&
                                        appointmentDelete(item._id);
                                }}>
                                <i className="material-icons">delete</i>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AppointmentList;
