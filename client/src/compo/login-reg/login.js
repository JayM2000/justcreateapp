import React, {useState} from 'react';
import { Link ,Navigate} from "react-router-dom";
import '../../App.scss';
import { connect } from 'react-redux';
import setalert from '../../redux__appli/action/alert';
import {logins as au} from '../../redux__appli/action/auth';
import PropTypes from 'prop-types';

const Log = ({au,isauth}) => {
    const [forms,setForms] = useState({
        email:'',
        password:''
    });

    const {email,password} = forms;

    function formfunc(e) {
        setForms({...forms,[e.target.name]:e.target.value});
    };

    function formsubmit(e) {
        e.preventDefault();
        
        // console.log(forms);
        au({ email, password } );
    };

    if(isauth){
        return <Navigate to="/dashb" />
    };

    return (
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user" id='signin'></i> Sign into Your Account</p>
                <form className="form" onSubmit={(e) => formsubmit(e)}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => formfunc(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => formfunc(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary clickk" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to='/reg'>Sign Up</Link>
                </p>
            </section>
    )
};

Log.propTypes = {
    setalert: PropTypes.func.isRequired,
    au: PropTypes.func.isRequired,
    isauth: PropTypes.bool
};

const mapStateToProps = state => ({
    isauth : state.auth.isAuthenticated
 });

// export default Log;
export default connect(mapStateToProps, { setalert,au})(Log);