import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toastErrorMessage } from './../../util';
import { getAppointment, updateAppointments } from './../../actions/appointmentsActions';
import { setLoading } from './../../actions/miscActions';
import Sidebar from './../layout/Sidebar';
import Navbar from './../layout/Navbar';

const EditAppointment = ({
    location,
    match,
    history,
    setLoading,
    getAppointment,
    updateAppointments,
    appointments,
    appointment,
}) => {
    useEffect(() => {
        setLoading(true);
        getAppointment(match.params.id);
    }, []);
    const [error, setError] = useState(false);

    const { _id, appointmentDate } = appointment;

    const onchange = (e) => {
        appointment[e.target.name] = e.target.value;
    };

    const onsubmit = (e) => {
        e.preventDefault();
        setError(false);
        if (
            appointmentDate === '' 
        ) {
            toastErrorMessage('All feild required');
            setError(true);
            return false;
        } else if (
            appointmentDate &&
            !error
        ) {
            setLoading(true);
            updateAppointments(appointment);
            history.push('/appointments');
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
                                                        placeholder="Appointment Date"
                                                        id="appointmentDate"
                                                        type="date"
                                                        className={
                                                            error &&
                                                            appointmentDate === ''
                                                                ? 'form-control has-danger'
                                                                : 'form-control'
                                                        }
                                                        name="appointmentDate"
                                                        defaultValue={appointmentDate}
                                                        onChange={onchange}
                                                    />
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
    appointments: state.appointment.appointments,
    appointment: state.appointment.appointment,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (loading) => {
            dispatch(setLoading(loading));
        },
        getAppointment: (id) => {
            dispatch(getAppointment(id));
        },
        updateAppointments: (appointment) => {
            dispatch(updateAppointments(appointment));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditAppointment);
