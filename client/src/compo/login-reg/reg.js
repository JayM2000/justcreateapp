import React, { Fragment as Frg, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../../App.scss';
import { connect } from 'react-redux';
import setalert from '../../redux__appli/action/alert';
import { authh } from '../../redux__appli/action/auth';
import PropTypes from 'prop-types';
// import Avatar from '@mui/material/Avatar';
// import { uuid } from 'uuidv4';

const Land = (props) => {
    const navi = useNavigate();

    const [forms, setForms] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = forms;

    function formfunc(e) {
        setForms({ ...forms, [e.target.name]: e.target.value });
    };

    // function photos() {

    // }

    function submitform(e) {
        e.preventDefault();

        if (password !== password2) {
            props.setalert('Not matching password !!!', 'danger');
        }
        else {
            props.authh({ name, email, password });
            navi("/log");
        }
    }

    return (
        <Frg>
            <section className='container'>
                <h1 className="large ttt text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                {/* action="create-profile.html" */}
                <form className="form" onSubmit={(e) => submitform(e)} >
                    <div className="form-group">
                        <input type="text" placeholder="Name" name="name" value={name}
                            onChange={(e) => formfunc(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" value={email}
                            onChange={(e) => { return formfunc(e) }} />
                        <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email
                        </small>
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => formfunc(e)}
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={(e) => formfunc(e)}
                            minLength="6"
                        />
                    </div>
                    <input type="submit" className="btn btn-primary clickk" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to='/log'>Sign In</Link>
                </p>
            </section>
        </Frg>
    )
};

Land.propTypes = {
    setalert: PropTypes.func.isRequired,
    authh: PropTypes.func.isRequired,
    isauth: PropTypes.bool
};

const mapStateToProps = state => ({
    isauth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setalert, authh })(Land);