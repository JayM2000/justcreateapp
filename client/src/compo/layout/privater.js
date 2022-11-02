import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinners/spinner';

const Privater = ({ component: Component,
    auth: { isAuthenticated, load } }) => {
        
    if (load) return <Spinner />;
    if (isAuthenticated) return <Component />;

    return <Navigate to="/log" />;
};

Privater.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapp = (state) => ({
    auth: state.auth
});

export default connect(mapp)(Privater);