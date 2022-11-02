import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alerts = ({ setalert }) => (
    <div className="alert-wrapper">
        {setalert.map((alert) => (
            <div key={alert.id} className={`alert alert-${alert.types}`}>
                {alert.msg}
            </div>
        ))}
    </div>
);

Alerts.propTypes = {
    setalert: PropTypes.array.isRequired
};


const mapStateToProps = state => ({
    setalert: state.alert
});

export default connect(mapStateToProps)(Alerts);