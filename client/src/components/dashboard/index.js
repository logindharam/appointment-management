import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Sidebar from './../layout/Sidebar';
import Navbar from './../layout/Navbar';
import { setLoading } from './../../actions/miscActions';
import { getAuthUser } from './../../actions/authActions';
import DashboardCard from './Dashboardcard';

const Dashboard = ({ getAuthUser, setLoading, auth, location }) => {
    useEffect(() => {
        setLoading(true);
        getAuthUser();
    }, []);
    return (
        <div className="wrapper ">
            <Sidebar location={location} />
            <div className="main-panel ps-container ps-theme-default ps-active-y">
                <Navbar />
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <DashboardCard
                                name="Users"
                                linkPath="/users"
                                itemCount="4"
                                icon="account_box"
                            />

                            <DashboardCard
                                name="Products"
                                linkPath="/products"
                                itemCount="4897"
                                icon="shopping_basket"
                            />
                            <DashboardCard
                                name="Shops"
                                linkPath="/shops"
                                itemCount="9230"
                                icon="shop"
                            />
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
        getAuthUser: () => {
            dispatch(getAuthUser());
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
