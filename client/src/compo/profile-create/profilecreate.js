import React, { useState, useEffect } from 'react'
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createprof, profileall, alertmsg,uploadpic } from '../../redux__appli/action/profile';

// import { stor } from '../firebase/firebases';
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import ProgressBar from './progressbar';
// import uuid from 'react-uuid';

const initialState = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    avtt: ''
};

const Profilecreate = ({ alert,auth:{user}, profileget: { profile, load }, createprof, profileall, alertmsg,uploadpic }) => {
    const navi = useNavigate();
    const [profiles, setProfiles] = useState(initialState);

    const creatingProfile = useMatch('/creprofile');

    const [snetwork, t] = useState(false);


        // hers
        // here

    
    useEffect(() => {
        if (!profile) {
            profileall();
        }

        // for editing profile only
        if (!load && profile) {
            const profiledata = { ...initialState };

            for (const key in profile) {
                if (key in profiledata) {
                    profiledata[key] = profile[key];
                }
            }

            for (const key in profile.social) {
                if (key in profiledata) {
                    profiledata[key] = profile.social[key];
                }
            }

            if (Array.isArray(profiledata.skills))
                profiledata.skills = profiledata.skills.join(', ');
            // set local state with the profileData
            setProfiles(profiledata);
        }

    }, [load, profileall, profile]);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,avtt
    } = profiles;

    function func(e) {
        setProfiles({ ...profiles, [e.target.name]: e.target.value });
    }

    function funcc(e) {
        e.preventDefault();
        createprof({ ...profiles}, navi, profile ? true : false);
    }

    return (
        <React.Fragment>
            <section className='container'>

                <h1 className="large text-primary">
                    {creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
                </h1>
                <p className="lead">
                    <i className="fas fa-user" />
                    {creatingProfile
                        ? ` Let's get some information to make your`
                        : ' Add some changes to your profile'}
                </p>

                <small>* = required field</small>{' '}

                <form className="form" onSubmit={(e) => { return funcc(e) }}>
                    <div className="form-group">
                        <select name="status" value={status} onChange={(e) => { return func(e) }}>
                            <option value="0">* Select Professional Status</option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Student or Learning">Student or Learning</option>
                            <option value="Instructor">Instructor or Teacher</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        <small className="form-text"
                        >Give us an idea of where you are at in your career</small
                        >
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Company" name="company" value={company} onChange={(e) => { return func(e) }} />
                        <small className="form-text"
                        >Could be your own company or one you work for</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Website" name="website" value={website} onChange={(e) => { return func(e) }} />
                        <small className="form-text"
                        >Could be your own or a company website </small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => { return func(e) }} />
                        <small className="form-text"
                        >City & state suggested (eg. Pune, Maharashtra)</small>

                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(e) => { return func(e) }} />
                        <small className="form-text"
                        >Please use comma separated values (eg.
                            HTML,CSS,JavaScript,PHP)</small>

                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Github Username or Link"
                            name="githubusername"
                            value={githubusername} onChange={(e) => { return func(e) }}
                        />
                        <small className="form-text"
                        >Include your
                            username or Link of your repository</small>

                    </div>
                    <div className="form-group">
                        <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e) => { return func(e) }}></textarea>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="my-2">
                        <button onClick={() => { return t(!snetwork) }} type="button" className="btn btn-light">
                            Add Social Network Links
                        </button>
                        <span>Optional</span>
                    </div>

                    {snetwork && <React.Fragment>


                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(e) => { return func(e) }} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e) => { return func(e) }} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e) => { return func(e) }} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(e) => { return func(e) }} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(e) => { return func(e) }} />
                        </div>
                    </React.Fragment>}

                    <input type="submit" className="btn btn-primary my-1 clickk" />
                    <Link className="btn btn-light my-1 clickk" to="/dashb">Go Back</Link>
                </form>
            </section>
        </React.Fragment>
    )
};

Profilecreate.propTypes = {
    createprof: PropTypes.func.isRequired,
    profileall: PropTypes.func.isRequired,
    profileget: PropTypes.object.isRequired,
    alertmsg: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const maps = (state) => ({
    profileget: state.profileall,
    auth: state.auth
});

export default connect(maps, { createprof, profileall, alertmsg})(Profilecreate);