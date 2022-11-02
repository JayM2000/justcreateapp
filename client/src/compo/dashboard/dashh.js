import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { profileall, deleteacc } from '../../redux__appli/action/profile';
import PropTypes from 'prop-types';
import Spin from '../spinners/spinner';
import { Link } from 'react-router-dom';
import Dashedit from './dashboardedit';
import Expe from './expedisplay';
import Edu from './educationdisplay';
import { stor } from '../firebase/firebases';
import { ref, deleteObject, getDownloadURL } from "firebase/storage";

const Dashh = ({ auth: { user }, prof: { profile, load }, profileall, deleteacc }) => {

  useEffect(() => {
    profileall();
  }, [profileall]);

  function delt() {
    // Create a reference to the file to delete
    const desertRef = ref(stor, `imagesss/img-${user._id}`);

    getDownloadURL(desertRef)
      .then((down) => {
        // Delete the file
        deleteObject(desertRef).then(() => {
          // File deleted successfully
          deleteacc();

        }).catch((error) => {
          alert(error);
        });
      })
      .catch((err) => {
        deleteacc();
      })

  }

  return load && profile === null ? <Spin /> : (
    <React.Fragment>
      <section className="container">
        <h1 className='large text-primary'>Dashboard </h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome {user && user.name}{" :)"}
        </p>
        {
          (profile == null) ? (<React.Fragment>
            <p>
              You don't have set your Profile yet, Click on below button to set it
            </p>
            <Link to='/creprofile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </React.Fragment>) : (<React.Fragment>
            <Dashedit />
            <Expe experience={profile.experience} />{' '}
            <Edu edu={profile.education} />


            <div className="my-2">
              <button className="btn btn-danger clickk" onClick={(e) => delt()}>
                <i className="fas fa-user-minus" /> Delete My Account
              </button>
            </div>
          </React.Fragment>)
        }
      </section>
    </React.Fragment>

  )
};

Dashh.propTypes = {
  profileall: PropTypes.func.isRequired,
  deleteacc: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  prof: PropTypes.object.isRequired
};

const maps = (st) => ({
  auth: st.auth,
  prof: st.profileall
});

export default connect(maps, { profileall, deleteacc })(Dashh);


