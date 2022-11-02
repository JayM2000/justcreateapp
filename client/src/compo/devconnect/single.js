import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const single = ({prof:{
    owner: { _id, name},
    status,
    company,
    location,
    skills,
    avtt
}}) => {
    
    const dd = 'https://firebasestorage.googleapis.com/v0/b/devopss-61796.appspot.com/o/defaults%2Favtr.png?alt=media&token=9913e6ef-c10c-4e1d-a505-572f04867343';
   
    return (
        <React.Fragment>
            <Link to="/profiles" className="btn btn-light clickk ck">
                        Back To Profiles
            </Link>{' '}
            <div className='profile bg-light'>

                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple">
                    <a href={avtt ? avtt : dd} target="_blank">
                        <img width="50" height="270" sizes='100' src={avtt ? avtt : dd} alt='image' className='round-img' />
                    </a>
                </div>

                <div>
                    <h2>{name}</h2>
                    <p>
                        {status} {company && <span> at {company}</span>}
                    </p>
                    <p className='my-1'>{location && <span>{location}</span>}</p>
                    <Link to={`/devprof/${_id}`} className='btn btn-primary clickk'>
                        View Profile
                    </Link>
                </div>
                <ul>
                    {skills.slice(0, 4).map((skill, index) => (
                        <li key={index} className='text-primary'>
                            <i className='fas fa-check' /> {skill}
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    )
}

single.propTypes = {

};

export default single;