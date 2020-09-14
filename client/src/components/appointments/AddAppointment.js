import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toastErrorMessage } from './../../util';
import { addAppointments } from './../../actions/appointmentsActions';
import { setLoading } from './../../actions/miscActions';
import Sidebar from './../layout/Sidebar';
import Navbar from './../layout/Navbar';

const AddAppointment = ({ history, setLoading, addAppointments, users, location }) => {
    const [appointment, setAppointment] = useState({
        appointmentDate: ''
    });
    const [error, setError] = useState(false);

    const {
        appointmentDate
    } = appointment;

    const onchange = (e) =>
        setAppointment({ ...appointment, [e.target.name]: e.target.value });

    const onsubmit = (e) => {
        e.preventDefault();
        setError(false);
        if ( appointmentDate === '' ) {
            toastErrorMessage('All feild required');
            setError(true);
            return false;
        } else if ( appointmentDate && !error ) {
            setLoading(true);
            addAppointments(appointment);
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
                                                    Add Appointment
                                                </h4>
                                            </div>
                                            <div className="col-md-3 right">
                                                <Link
                                                    className="btn btn-info btn-link"
                                                    to="appointments"
                                                    title="Add Appointment">
                                                    <i className="material-icons">
                                                        list
                                                    </i>
                                                    Appointment List
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="form-group bmd-form-group col-md-6">
                                                    <input
                                                        placeholder="First Name"
                                                        id="appointmentDate"
                                                        type="date"
                                                        className={
                                                            error &&
                                                            appointmentDate === ''
                                                                ? 'form-control has-danger'
                                                                : 'form-control'
                                                        }
                                                        name="appointmentDate"
                                                        value={appointmentDate}
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
    users: state.user.users,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (loading) => {
            dispatch(setLoading(loading));
        },
        addAppointments: (user) => {
            dispatch(addAppointments(user));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAppointment);
