import React from 'react'
import PropTypes from 'prop-types'

const Profileabout = ({
    proff: {
        bio,
        skills,
        owner: { name }
    }
}) => {

    return (
        
        <div className='profile-about bg-light p-2'>
            {bio && (
                <React.Fragment>
                    <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
                    <p>{bio}</p>
                    <div className='line' />
                </React.Fragment>
            )}
            <h2 className='text-primary'>Skill Set</h2>
            <div className='skills'>
                {skills.map((skill, index) => (
                    <div key={index} className='p-1'>
                        <i className='fas fa-check' /> {skill}
                    </div>
                ))}
            </div>
        </div>
    )
}

Profileabout.propTypes = { proff: PropTypes.object.isRequired };

export default Profileabout;