import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getprofilebyid as gpi } from '../../redux__appli/action/profile';
import Spin from '../spinners/spinner';
import Profiletop from './profiletop';
import Profileabout from './profileabout';
import Profileexp from './profileexp';
import Profileedu from './profileedu';

const Profile = ({ proff: { profile, load }, auth, gpi }) => {
    const { ids } = useParams();
    useEffect(() => {
        gpi(ids);
    }, [gpi, ids]);

    return (
        <section className="container">
            {profile === null ? (
                <Spin />
            ) : (
                <Fragment>
                    <Link to="/profiles" className="btn btn-light clickk ck">
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated &&
                        auth.load === false &&
                        auth.user._id === profile.owner._id && (
                            <Link to="/editprofile" className="btn btn-dark clickk">
                                Edit Profile
                            </Link>
                        )}
                    <div className="profile-grid my-1">
                        <Profiletop proff={profile} />
                        <Profileabout proff={profile} />

                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map((experience) => (
                                        <Profileexp
                                            key={experience._id}
                                            proff={experience}
                                        />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>

                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map((education) => (
                                        <Profileedu
                                            key={education._id}
                                            proff={education}
                                        />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No education credentials</h4>
                            )}
                        </div>
                    </div>
                </Fragment>
            )
            }
        </section>
    )
}

Profile.propTypes = {
    gpi: PropTypes.func.isRequired,
    proff: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const maps = (st) => ({
    proff: st.profileall,
    auth: st.auth
});

export default connect(maps, { gpi })(Profile);