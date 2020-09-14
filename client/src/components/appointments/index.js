import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './../layout/Sidebar';
import Navbar from './../layout/Navbar';
import { getAppointments, deleteAppointment } from './../../actions/appointmentsActions';
import { setLoading } from './../../actions/miscActions';

import SearchFilter from '../common/SearchFilter';
import UserList from './AppointmentList';
const Appointments = ({
    getAppointments,
    setLoading,
    loading,
    appointment,
    location,
    deleteAppointment,
}) => {
    useEffect(() => {
        setLoading(true);
        getAppointments();
    }, [appointment.appointments.length]);

    const appointmentDelete = (id) => {
        setLoading(true);
        deleteAppointment(id);
    };

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
                                            <h4 className="card-title "> Appointments </h4>
                                        </div>
                                        <div className="col-md-3 right">
                                            <Link
                                                className="btn btn-info btn-link"
                                                to="appointment-add"
                                                title="Add Appointment">
                                                <i className="material-icons">
                                                    add
                                                </i>
                                                Add Appointment
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <UserList
                                                data={appointment.appointments}
                                                appointmentDelete={appointmentDelete}
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
    appointment: state.appointment,
    loading: state.misc,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (loading) => {
            dispatch(setLoading(loading));
        },
        getAppointments: () => {
            dispatch(getAppointments());
        },
        deleteAppointment: (id) => {
            dispatch(deleteAppointment(id));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
