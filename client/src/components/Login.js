import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setLoading } from './../actions/miscActions';
import { authLogin } from './../actions/authActions';
import miscReducer from '../reducers/miscReducer';
const Login = ({ history, auth, setLoading, authLogin }) => {
    const [user, setUser] = useState({ email: '', password: '' });
    useEffect(() => {
        if (auth.isAuth) {
            history.push('/appointments');
        }
    }, [auth.isAuth]);
    const onchange = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onsubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        authLogin(user);
    };

    const { email, password } = user;
    return (
        <div className="off-canvas-sidebar">
            <div className="wrapper wrapper-full-page">
                <div className="page-header login-page header-filter">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
                                <form className="form" onSubmit={onsubmit}>
                                    <div className="card card-login">
                                        <div className="card-header card-header-rose text-center">
                                            <h4 className="card-title">
                                                Login
                                            </h4>
                                        </div>
                                        <div className="card-body ">
                                            <span className="bmd-form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="material-icons">
                                                                email
                                                            </i>
                                                        </span>
                                                    </div>
                                                    <input
                                                        id="username"
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email..."
                                                        name="email"
                                                        value={email}
                                                        onChange={onchange}
                                                    />
                                                </div>
                                            </span>
                                            <span className="bmd-form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="material-icons">
                                                                lock_outline
                                                            </i>
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="Password..."
                                                        value={password}
                                                        onChange={onchange}
                                                    />
                                                </div>
                                            </span>
                                        </div>
                                        <div className="card-footer justify-content-center">
                                            <input
                                                className="btn btn-rose btn-link btn-lg"
                                                type="submit"
                                                value="Log In"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (loading) => {
            dispatch(setLoading(loading));
        },
        authLogin: (user) => {
            dispatch(authLogin(user));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
