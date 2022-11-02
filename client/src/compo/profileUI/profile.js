import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
// import { } from 'react-router-dom';
import { getallprofile } from '../../redux__appli/action/profile';
import PropTypes from 'prop-types';
import Spin from '../spinners/spinner';
import Profitem from './profileitem';
import Pagi from './pagi';

const Profile = ({ auth:{_id},profall: { profiles, load }, getallprofile }) => {

    const [opt, setopt] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);


    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = profiles.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(profiles.length / recordsPerPage);

    useEffect(() => {
        getallprofile(opt);

    }, [getallprofile, opt]);


    return (
        <section className='container'>
            {load ? (
                <Spin />
            ) : (
                <React.Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop" /> Browse and connect with
                        developers{'  '}

                    {/* {pageNumbers.length < 2 && */}
                        <div class="input-group rounded">
                            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" val="" onChange={(e) => setopt(e.target.value)} />
                            <span class="input-group-text border-0" id="search-addon">
                                <i class="fas fa-search"></i>
                            </span>
                        </div>
                    {/* } */}

                    </p>
                    <div className="profiles">
                        {currentRecords.length > 0 ? (
                            currentRecords.map((profile) => (
                                <Profitem key={profile._id} prof={profile} />
                            ))
                        ) : (
                            <h1>No profiles found</h1>
                        )}
                    </div>

                    <Pagi
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage} />

                </React.Fragment>
            )}
        </section>
    )
};


Profile.propTypes = {
    getallprofile: PropTypes.func.isRequired,
    profall: PropTypes.object.isRequired
};

const maps = (st) => ({
    profall: st.profileall,
    auth:st.auth
});

export default connect(maps, { getallprofile })(Profile);