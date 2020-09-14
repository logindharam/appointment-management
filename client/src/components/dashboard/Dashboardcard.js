import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboardcard = ({ name, icon, linkPath, itemCount }) => {
    return (
        <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
                <div className="card-header card-header-info card-header-icon">
                    <div className="card-icon">
                        <i className="material-icons">{icon}</i>
                    </div>
                    <p className="card-category">{name}</p>
                    <h3 className="card-title">
                        {itemCount}
                    </h3>
                </div>
                <div className="card-footer">
                    <div className="stats">
                        <i className="material-icons text-info">info</i>
                        <Link to={linkPath}>Get More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboardcard;
