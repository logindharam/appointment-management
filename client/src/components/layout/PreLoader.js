import React from 'react';
import { connect } from 'react-redux';
const PreLoader = ({ misc: { loading } }) => {
    return (
        <React.Fragment>
            {loading && (
                <div id="loader-wrapper">
                    <div id="loader"></div>
                    <div className="loader-section section-left"></div>
                    <div className="loader-section section-right"></div>
                </div>
            )}
        </React.Fragment>
    );
};
const mapStateToProps = (state) => ({
    misc: state.misc,
});
export default connect(mapStateToProps)(PreLoader);
