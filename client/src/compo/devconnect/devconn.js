import React, { useEffect} from 'react'
import { connect } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';
import { getprofilebyid as gpi,messd } from '../../redux__appli/action/profile';
import PropTypes from 'prop-types';
import Spin from '../spinners/spinner';
import Profitem from './profileitem';
import Single from './single';

const Profil = ({ auth:{user},profall: { profile, cdev, load }, messd,gpi }) => {

    const nvi = useNavigate();
    const { ids } = useParams();

    useEffect(() => {
        gpi(ids);
    }, [gpi, ids]);

    function funcc() {
        messd();
        nvi('/profiles');
    }

    return (
        <section className='container'>
            {profile === null ? (
                <Spin />
            ) : (
                (user._id === profile.owner._id) ? 
                <React.Fragment>
                    <div className="profiles">
                        {/* heres */}
                        <Single prof={profile}/>
                        {/* ends here */}

                        {
                            cdev.length > 0 ? (<h1><u>Developers that are interested in your profile listed below :</u></h1>) :
                            (
                                <h1>No one yet Connected, One way to get developers connect you is to fill your profile to above 90% </h1>
                            )
                        }
                        
                        {cdev.length > 0 && (
                            cdev.map((pro) => (
                                <Profitem key={pro._id} prof={pro} />
                            ))
                        )}
                    </div>
                </React.Fragment>
                : (funcc())
            )}
        </section>
    )
};


Profil.propTypes = {
    gpi: PropTypes.func.isRequired,
    profall: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    messd:PropTypes.func.isRequired
};

const maps = (st) => ({
    profall: st.profileall,
    auth:st.auth
});

export default connect(maps, { gpi,messd })(Profil);
