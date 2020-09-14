import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const PrivateRoute = ({ auth, misc, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                !auth.isAuth && misc.loading ? (
                    <Redirect to="/login" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    misc: state.misc,
});
export default connect(mapStateToProps)(PrivateRoute);
